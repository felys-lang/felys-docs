# 构建运行

Felys 是可以进行一些基础的配置的，比如常量注入、使用的语言（中/英）、运行超时、和最大递归层数。允许根据使用场景不同自定义。

## 构建一个入口

这里暂且不注入常量，直接初始化一个空的哈希表，注入具体方法可以参考[上一页](injection)。

```rust
let mixin = HashMap::new();
let mut main = Worker::new(mixin, 0.0, 100, Language::ZH);
```

- `mixin`是常量注入。
- `0.0`代表超时配置，设置为零表示不设置超时。请注意，如果启用了超时设置，将会多开启一个线程作为计时器，这会在启动阶段增加百微秒的延迟。随后，每条语句在运行时都会检查是否超时。如果超时，程序将报错。然而，如果某条语句运行时间过长，超时设置只会在运行到下一条语句时进行检测。
- `100`是最大允许的递归调用层数，超过这个限制时程序将直接报错，只要调用任意函数就会叠加一层，待函数运行完成之后会减少一层。
- `Language::ZH`决定了使用哪个语言的分析器，这里是中文。

## 运行代码

```rust
let code = "返回 “——爱莉希雅——”；".to_string();
let _ = main.exec(code);
```

`main.exec(code)`的返回值是一个`Result<Summary, Error>`，这样允许程序员自行定义如何处理输出结果和错误，注意这个`Error`是 Felys 定义的，实现了`Display`的 trait，即可以使用`.to_string()`方法。

::: tip
`Worker`允许多次运行，并且每次运行都会共享内置常量和全局变量。
:::

### 正确运行的输出结果

运行正常便可以获取类型为`Summary`的结果，其结构体如下：

```rust
pub struct Summary {
    pub time: (Duration, Duration, Duration),
    pub stdout: String,
    pub exit: Object,
}
```

- `time`：初始化的时间，分词器的时间，代码运行的时间。
- `stdout`：先前通过`cx.write()`的字符串被换行符拼接后的结果。
- `exit`：在非函数中调用`return`关键字，那个变量就会被直接返回到此，如果没有出现这种情况，默认是`Object::None`。
