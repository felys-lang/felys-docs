# Quickstart

The [playground](https://exec.felys.dev) also has some sample programs.

## Literal

Felys has built-in support for float, integer, string, tuple, and list. Their underlying implementation uses `f64`, `isize`, `String`, `Vec`, and `Vec` in Rust standard library.

```
int = 42;
float = 3.14;
string = "elysia";
tuple = ("elysia", 11.11);
list = [1, 2, 3, 4, 5];
```

## Assignment

Beyond standard assignment, you also unpack a tuple and the assign it. Felys also had syntactic sugar like `+=`, `-=`, etc.

```
(name, birthday) = ("elysia", 11.0);
birthday += 0.11;
```

## Operator

Just like any other languages, Felys has arithmatic, comparsion, and logical operator. Be aware that Felys is strong typed, which means that things like `1` and `1.0`, are not same and `1 + 1.0` does not evaluate.

```
sum = 1 + 1;
conjunction = true and true or false;
equality = 1 == 1;
```

## Flow control

Felys flow control is similar to Rust, where most of them have a return value.

### Condition

Unlike condition in other languages, `else` in Felys allows any type of expression to follow by.

```
one = if true {
    1
} else 0;

one = if true {
    1
} else loop {
    break 1;
}
```

### Loops

There are three types of loops using keywords `loop`, `while`, and `for`, along with `break` and `continue`. The `break` keyword appeared in `loop` can carry a return value. `for` loop will go through an iterable, i.e. list.

```
one = loop {
    break 1;
};

while true {
    if one {
        break;
    }
}

for x in [1, 2, 3] {
    if x == 2 {
        break;
    }
}
```

### Block

The last statement of a block is also the return value of the block. All statements before it must not have a return value. You can to use `;` to make them `void`, and the best practice is to always add the `;` except for expression ends with `}` and returns `void`.

```
one = { 1 };
```

## Statement

If semicolon shows up after an expression, this expression will have `void` return value, i.e. no return value. Most expressions have a return value except for assignment, `for` loop, `while` loop, `break`, `continue`, and `return`.

```
void = { 1; }
one = 1;
```

## Main

All statements in a Felys program must not have return values. IThe program has a default return value `void`, but you can return anything using the `return` keyword. This would also early terminates the program, and is also the only interface to output something.

```
return __author__;
```

The program usually spawn another thread to timeout the runtime, becuase it is designed such that it can run safely on the website. The callstack is also limited to protect the server. Felys is slow because the backend just walks through the syntax tree and copy-pastes everything, which leads to lots of overhead.
