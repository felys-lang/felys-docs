# 解析器的实现

语法解析在制作编程语言过程中处于关键的起始步骤，不过相较于其他部分，其入门难度确实偏高。

## 简介

在多数情形下，解析器可划分为两个主要部分，也就是分词器与语法解析部分。分词器的作用相当于对输入的代码预先进行处理，以便后续能更便利地解析代码。像 Python 这种将缩进作为语法组成部分的语言，分词器需要承担更多额外的工作任务。对于分词器的实现，既可以借助现成的工具来生成，也可以通过手写一个状态机的方式来达成。而语法分析环节就要复杂得多了。在学术领域，虽然普遍认为语法分析问题已得到解决，并且确实存在众多优秀的解析器生成器，但要想很好地运用这些工具，仍需对它们的底层原理有比较深入的理解才行。

## 快速入门

编程语言的语法能够通过一个非终结符的集合来描述。例如，最基础的加法运算可以相对不那么严谨地描述为规则 `E -> E + T | T` 以及 `T -> NUMBER`。更为学术性的解释可自行去参考上下文无关文法（CFG）和巴科斯范式（BNF），它们都是业界常用的用于语法描述的方式，从本质上来说，这些描述方式都是基于一系列递归函数构建的，此处就不过多深入阐述了。在具体的算法实现方面，存在多种选择，例如基于分析表的、自上而下的 LL 算法以及自下而上的 LR 算法，还有它们的各类变体。LL 算法实现起来相对简单，但有着较大的局限性；LR 算法则与之相反，功能更为强大但实现难度更高。在实际应用落地层面，有像 YACC/Bison 以及较为现代的 ANTLR4 这类工具，ANTLR4 支持的编程语言种类较多，有兴趣的话可以自行深入学习，它们都属于非常成熟的技术了。

即便不采用这些成熟的技术，出于对高度定制化以及性能优化方面的考量，也可以选择手写一个自上而下递归下降（Top-Down Recursive Descent，简称 TDRD）解析器。正如前文所述，语法从本质上看就是一堆递归函数，所以完全能够通过手写的方式来实现，例如 Rust 的解析器就是纯手写完成的，Felys 在早期也是如此。只不过手写这种解析器对于项目的结构设计要求颇高，很容易出现结构设计不合理的情况。

另外，还有一种相对较新的解析器思路，即解析表达式语法（PEG）及其变体 Packrat 解析器。这种解析器更像是一种功能强大的正则解析器，与传统解析器有所不同的是，Packrat 解析器支持无限回溯，并且它通过缓存机制，采用以空间换时间的策略来避免重复解析，最终能够达到线性时间复杂度。其实际落地的代码与手写的 TDRD 解析器比较相似，但代码结构会更加清晰美观。不过需要注意的是，PEG 的语法注解方式和 CFG、BNF 是不一样的，主要差异在于 PEG 中规则是有顺序要求的，而在 CFG 和 BNF 里规则顺序通常是无关紧要的。比如在 PEG 语法中，`E -> E + T \ T` 和 `E -> T \ E + T`，是不等价的，但在 CFG 里这两个表达式则是等价的。不过这种解析器在实际应用中不算广泛，可能是由于其性能表现欠佳，尤其是在内存占用方面，据了解，目前只有 Python 和 Rust 的宏定义中有使用到它。更多的细节内容可以参考[原论文](https://pdos.csail.mit.edu/~baford/packrat/thesis/thesis.pdf)。

::: info
PEG 语法中使用 `\` 而不是 `|` 来强调顺序的重要性，以此与传统语法描述方式形成区别。
:::

## 技术选型

最终决定选用 Packrat 解析器，主要原因如下：Python 在早几年已经将原本的 LL 解析器替换成了 PEG 解析器，而且从实际情况来看，性能方面并没有出现明显的差异，同时可维护性却得到了极大的提升。再者，考虑到 Packrat 解析器实现起来较为直观、简单，并且有 Python 那边现成的案例可供参考，还有 Guido 的相关教学博客能够辅助学习。而对于其他传统的解析器生成器，我或多或少有所了解，它们的学习曲线同样比较陡峭，并且各自都存在一定程度的局限性。综合多方面因素考虑，最终决定自己手写一个 Packrat 解析器。

## 语法设计

这个语法文件单纯是用来表达语法的，并不能丢给哪个解析器生成器来生成。有些非终结符我这里没写出来，因为代码实现的时候直接调用 Rust 的内置函数。此外，有些细节和实际的实现略有不同或者简化，有需求直接参考源代码。

### 入口语法

```
program -> stmt* eof
```

### 语句语法

```
stmt -> \
    \ ctrl ";"
    \ ctrl
    \ expr ";"
    \ expr
    \ ";"

block -> "{" stmt* "}"
```

### 模版语法

```
pat -> \
    \ "_"
    \ ident
    \ "(" pat ("," pat)+ ")"
    \ lit

ident -> (alphabetic \ "_") (alphanumeric \ "_")*
```

### 表达式语法

```
expr -> tuple

tuple -> \
    \ "(" expr ("," expr)+ ")"
    \ disjunction

disjunction -> \
    \ disjunction "or" conjunction
    \ conjunction

conjunction -> \
    \ conjunction "and" inversion
    \ inversion

inversion -> \
    \ "not" inversion
    \ equality

equality -> \
    \ equality "==" comparison
    \ equality "!=" comparison
    \ comparison

comparison -> \
    \ comparison ">" term
    \ comparison ">=" term
    \ comparison "<" term
    \ comparison "<=" term
    \ term

term -> \
    \ term "+" factor
    \ term "-" factor
    \ factor

factor -> \
    \ factor "*" unary
    \ factor "/" unary
    \ factor "%" unary
    \ unary

unary -> \
    \ "+" unary
    \ "-" unary
    \ primary

primary -> \
    \ lit
    \ ident
    \ "(" expr ")"
    \ "|" (ident ("," ident)*)? "|" expr
    \ ctrl
```

### 控制流语法

```
ctrl -> \
    \ assign
    \ block
    \ "break" expr?
    \ "continue"
    \ "for" pat "in" expr block
    \ "match" expr "{" pat "=>" expr ("," pat "=>" expr)* "}"
    \ "if" block ("else" expr)?
    \ "loop" block
    \ "return" expr?
    \ "while" expr block

assign -> \
    \ pat "=" expr
    \ pat "+=" expr
    \ pat "-=" expr
    \ pat "*=" expr
    \ pat "/=" expr
    \ pat "%=" expr
```

### 字面量语法

```
lit -> \
    \ float
    \ int
    \ str
    \ bool

float -> \
    \ "0" ~ "." digit+
    \ digit+ "." digit+

int -> \
    \ "0x" ~ hex+
    \ "0o" ~ oct+
    \ "0b" ~ bin+
    \ "0" ~ !digit
    \ digit+

bool -> \
    \ "true"
    \ "false"

str -> "\"" (!"\"" char)* "\""
```
