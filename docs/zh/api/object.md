# 变量函数

Felys 的变量是动态类型的，并且不论字符串、数字、函数都是变量的一种，均作为`Object`的一部分，这大大简化了 Felys 的编写难度，也减轻了用户学习难度，在语言成长到一定程度之前都是利大于弊的。

## 基础变量

Felys 支持变量类型以及构建方法如下：

```rust
Object::String("爱莉希雅".to_string());
Object::Number(11.11);
Object::Boolean(true);
Object::None;
```

::: tip
`Object::None`是无返回值函数的默认返回值。
:::

## 原生函数

这个函数是在运行时定义的函数，由于已经有已经支持了 Rust 函数的注入，手动构建一个 Felys 函数的抽象语法树是没有意义的，所以不提供相关接口。

## Rust 函数

此类函数由于需要被注入到 Felys 中，必须遵循以下签名：

```rust
fn function(cx: &mut Context) -> Output {
    // 做一些事情
}
```

### 输入 `cx: &mut Context`

- `cx.args`：类型为`Vec<Object>`也就是所有传入的参数，在函数中可以去校验参数数量以及类型的正确性。所有类型的`Object`都会提供`.f64()`和`.bool()`两个方法，前者会返回`Result<f64, RuntimeError>`，而后者则会返回一个`bool`。
- `cx.write()`：传入值为`String`，可以理解为 Rust 中`write!()`，会写入输出的缓冲区，在运行结束后可以一次性将其取出。

### 输出 `Output`

- `Output::error()`：传入值为`String`即报错提示，将其返回将会带给后端一个错误，后端会立刻回传这个错误，然后停止运行。
- `Output::from()`：传入一个`Object`可以用于返回给后端，但通常不会这么写，更推荐的写法是直接使用`Into`这个 trait，比如`Object::None.into()`会直接把`Object`转换成函数签名中的`Output`。

### 示例

以下函数会将所有输入的参数用空格拼接，然后都放进输出缓冲中，功能类似于 Python 中的同名函数，最后返回一个`Object::None`：

```rust
pub fn print(cx: &mut Context) -> Output {
    let out = cx.args.iter()
        .map(|o| o.to_string())
        .collect::<Vec<String>>()
        .join(" ");
    cx.write(out);
    Object::None.into()
}
```
