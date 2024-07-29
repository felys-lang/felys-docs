# Object

Felys is dynamic typing which includes string, number, function. This makes Felys easy to code, and more beginner friendly. I believe before a language matures to a certain extent, its advantages generally outweigh its disadvantages.

## Basic

Felys variables can be structed like this:

```rust
Object::String("elysia".to_string());
Object::Number(11.11);
Object::Boolean(true);
Object::None;
```

::: tip
`Object::None` is the default return value of a function when there is no explicit one.
:::

## Function

This function is declared during runtime. Since Felys supports Rust function injection, builing a Felys function abstract syntax tree is meaningless. Thus, no interface is provided.

## Rust Function

Struct a Felys Rust function type:

```rust
Object::Rust(function);
```

This type of function will be injected into Felys, so it must follow this signiture:

```rust
fn function(cx: &mut Context) -> Output {
    // do something
}
```

### Input `cx: &mut Context`

- `cx.args`: It contains `Vec<Object>`, which is a vector of all inputs. You can verfiy the numbers of arguments and their typing inside the function. All `Object` have two methods: `.f64()` and `.bool()`. The former returns a `Result<f64, RuntimeError>`, and latter returns a `bool`.
- `cx.write()`: It requires an arugment with type `String`. It works similar to the Rust `write!()`, which write things into the output buffer. You can access to it after the execution is done. Having this interface to replace `println!()` when it does not work properly. For example: online code execution.

### Output `Output`

- `Output::error()`: It takes a `String` as error message. This will send an error to the backend, and the backend will spread it to stop the execution.
- `Output::from()`：It turns `Object` to an acceptable return value. However, we usually do not do this. A more recommanded way is to use `Into` trait directly. For example: `Object::None.into()` will turns `Object` into the `Output` in the function signiture。

### Example

The following function will join all arguments with a space, and send them to the output buffer. It is similar the built-in function `print` in Python. It returns a `Object::None`:

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
