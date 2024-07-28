# 完整示例

```rust
use std::collections::HashMap;
use felys::*;

fn main() {
    let code = "打印（‘你好，世界’）；".to_string();
    let mixin = HashMap::from([
        ("打印".into(), Object::Rust(print))
    ]);

    let mut main = Worker::new(mixin, 0.0, Language::ZH);
    if let Err(e) = main.exec(code) {
        println!("{}", e)
    }
}

fn print(cx: &mut Context) -> Output {
    let out = cx.args.iter()
        .map(|o| o.to_string())
        .collect::<Vec<String>>()
        .join(" ");
    println!("{}", out);
    Object::None.into()
}
```
