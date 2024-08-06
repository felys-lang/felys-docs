# 数据类型

Felys 的数据类型是动态的，不论是字符串、数字还是函数，均作为`Object`的一部分。这大大简化了 Felys 的编写难度，也减轻了用户的学习难度。在语言发展到一定程度之前，这样的设计是利大于弊的。

## 基础类型

Felys 支持的数据类型及其构建方法如下：

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

原生函数是在运行时定义的函数。由于已经支持了 Rust 函数的注入，手动构建一个 Felys 函数的抽象语法树没有意义，因此不提供相关接口。

## Rust 函数

构建一个 Felys 的 Rust 函数类型:

```rust
Object::Rust(function);
```

此类函数由于需要注入到 Felys 中，必须遵循以下签名：

```rust
fn function(cx: &mut Context) -> Output {
    // 做一些事情
}
```

### 输入 `cx: &mut Context`

- `cx.args`：类型为`Vec<Object>`，即所有传入的参数。可以在函数中校验参数的数量和类型。所有类型的 `Object` 都会提供 `.f64()` 和 `.bool()` 两个方法，前者返回 `Result<f64, RuntimeError>`，后者返回一个 `bool`。
- `cx.write()`：传入值为`String`，类似于 Rust 中的 `write!()`，将字符串写入输出缓冲区。运行结束后，可以一次性将其取出。这个接口意在替代在某些情况下不能正常工作的 `println!()`，例如在线运行代码等场景。

### 输出 `Output`

- `Output::error()`：传入值为`String`即报错提示，将其返回将会带给后端一个错误，后端会立刻回传这个错误，然后停止运行。
- `Output::from()`：传入一个`Object`，可以将其返回给后端，但通常不直接使用这种写法。更推荐的写法是直接使用 `Into` 这个 trait，比如 `Object::None.into()` 会直接将 `Object` 转换为函数签名中的 `Output`。

### 示例

以下函数会将所有输入的参数用空格拼接，然后将结果放入输出缓冲区，功能类似于 Python 中的同名函数，最后返回一个`Object::None`：

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
