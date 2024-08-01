# Example

```rust
use std::collections::HashMap;
use felys::*;

fn main() {
    let code = "print('Hello, World');".to_string();

    // constant injection
    let mixin = HashMap::from([
        ("print".into(), Object::Rust(print))
    ]);

    // init a worker: injection, no timeout, English environment
    let mut main = Worker::new(mixin, 0.0, Language::EN);

    // execute and print out error if there is
    if let Err(e) = main.exec(code) {
        println!("{}", e)
    }
}

// print out all parameters in Felys
fn print(cx: &mut Context) -> Output {
    let out = cx.args.iter()
        .map(|o| o.to_string())
        .collect::<Vec<String>>()
        .join(" ");
    println!("{}", out);
    Object::None.into()
}
```
