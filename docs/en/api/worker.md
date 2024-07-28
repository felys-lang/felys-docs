# Worker

Felys allows some basic congifuration, for example constant injection, language, and timeout.

## Build

This part focuses on demostrating how to build a new worker, so we do not inject anything. You can refer to the previous page for more details.

```rust
let mixin = HashMap::new();
let mut main = Worker::new(mixin, 0.0, Language::EN);
```

- `mixin` is the constant injection。
- `0.0` is the timeout. If you set it to zero, it means that no timeout. Be aware that when there is a timeout, Felys will spawn a new thead as a timer. In the case, the initialzation will be a few hundred micro seconds slower than usual. Whenever a statement get executed, it will first check if time is up. If yes, then it will throw an error. However, if a statement takes a long time, only the next statement will check the timeout. The timeout might not to actuate in this case.
- `Language::EN` decides which language it will expect. English in this case.

## Execution

```rust
let code = "return __elysia__;".to_string();
let _ = main.exec(code);
```

The return value of `main.exec(code)` is `Result<Summary, Error>`. This allows programmers to decide how to handle the correct ouput or the error. The `Error` is from Felys and implemented `Display` trait, i.e. you can call `.to_string()` method on it.

### The output summary

If everything is right, the unwrapped result is a `Summary` like this:

```rust
pub struct Summary {
    pub time: (Duration, Duration, Duration),
    pub stdout: String,
    pub exit: Object,
}
```

- `time`: initialization time, toknization time, and exeuction time.
- `stdout`：everything written by `cx.write()` will be joined using `\n` and returned here.
- `exit`：if you `return` something in the main body of the program, that object will be returned to here. If nothing get returned explicitly, the default value is `Object::None`.
