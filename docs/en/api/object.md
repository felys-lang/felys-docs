# Object

Felys is a dynamically-typed language that includes strings, numbers, and functions. This makes Felys easy to code and more beginner-friendly. I believe that before a language matures to a certain extent, its advantages generally outweigh its disadvantages.

## Basics

Felys variables can be structured like this:

```rust
Object::String("elysia".to_string());
Object::Number(11.11);
Object::Boolean(true);
Object::None;
```

::: tip
`Object::None` is the default return value of a function when there is no explicit return value.
:::

## Function

Functions in Felys are declared during runtime. Since Felys supports Rust function injection, building a Felys function abstract syntax tree is unnecessary. Therefore, no interface is provided for this purpose.

## Rust Function

To define a Felys Rust function type:

```rust
Object::Rust(function);
```

This type of function will be injected into Felys, so it must follow this signature:

```rust
fn function(cx: &mut Context) -> Output {
    // do something
}
```

### Input `cx: &mut Context`

- `cx.args`: This contains a `Vec<Object>`, which is a vector of all input arguments. You can verify the number of arguments and their types inside the function. All Object types have two methods: `.f64()` and `.bool()`. The former returns a `Result<f64, RuntimeError>`, and the latter returns a `bool`.
- `cx.write()`: This method requires an argument of type `String`. It works similarly to Rust's `write!()`, writing data into the output buffer. You can access the buffer after execution is complete. This interface is provided as an alternative to `println!()`, particularly when `println!()` does not work properly, such as in online code execution environments.

### Output `Output`

- `Output::error()`: This method takes a `String` as an error message. It sends an error to the backend, causing the backend to propagate the error and stop execution.
- `Output::from()`: This converts an `Object` into an acceptable return value. However, we typically avoid using this method directly. A more recommended approach is to use the `Into` trait. For example, `Object::None.into()` converts `Object` into `Output` as required by the function signature.

### Example

The following function joins all arguments with a space and sends the result to the output buffer. It is similar to the built-in `print` function in Python. The function returns `Object::None`:

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
