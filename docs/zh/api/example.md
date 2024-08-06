# 完整示例

```rust
use std::collections::HashMap;
use felys::*;

fn main() {
    let code = "打印（‘你好，世界’）；".to_string();

    // 常量注入
    let mixin = HashMap::from([
        ("打印".into(), Object::Rust(print))
    ]);

    // 创建解释器入口：注入，无超时，至多100层递归，中文环境
    let mut main = Worker::new(mixin, 0.0, 100, Language::ZH);

    // 运行，如果有报错就打印
    if let Err(e) = main.exec(code) {
        println!("{}", e)
    }
}

// 在 Felys 中打印所收到的所有变量
fn print(cx: &mut Context) -> Output {
    let out = cx.args.iter()
        .map(|o| o.to_string())
        .collect::<Vec<String>>()
        .join(" ");
    println!("{}", out);
    Object::None.into()
}
```
