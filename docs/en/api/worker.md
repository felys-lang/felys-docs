# Worker

Felys allows some basic configuration options, such as constant injection, language selection, and timeout settings.

## Build

This section focuses on demonstrating how to build a new worker without injecting anything. For more details, refer to the previous page.

```rust
let mixin = HashMap::new();
let mut main = Worker::new(mixin, 0.0, 100, Language::EN);
```

- `mixin` represents the constant injection.
- `0.0` is the timeout setting. If you set it to zero, it means there is no timeout. Be aware that when a timeout is set, Felys will spawn a new thread to act as a timer. In this case, the initialization will be a few hundred microseconds slower than usual. Whenever a statement is executed, it first checks if the time is up. If the time is up, it will throw an error. However, if a statement takes a long time to run, only the next statement will check the timeout, which means the timeout may not take effect immediately.
- `100` is the maximum number of recursive calls allowed. Exceeding this limit will result in an error. Each function call increments a counter by one, and the counter is decremented by one after the call is finished.
- `Language::EN` specifies the expected language, which is English in this case.

## Execution

```rust
let code = "return __elysia__;".to_string();
let _ = main.exec(code);
```

The return value of `main.exec(code)` is `Result<Summary, Error>`. This allows programmers to decide how to handle the correct output or error. The `Error` type is from Felys and implements the `Display` trait, meaning you can call the `.to_string()` method on it.

::: tip
`Worker` allows multiple execution, and they share the built-in objects and the global scope.
:::

### The output summary

If everything is right, the unwrapped result is a `Summary` structured like this:

```rust
pub struct Summary {
    pub time: (Duration, Duration, Duration),
    pub stdout: String,
    pub exit: Object,
}
```

- `time`: Initialization time, toknization time, and exeuction time.
- `stdout`: Everything written by `cx.write()` will be joined using `\n` and returned here.
- `exit`: If you `return` something in the main body of the program, that object will be returned here. If nothing is returned explicitly, the default value is `Object::None`.
