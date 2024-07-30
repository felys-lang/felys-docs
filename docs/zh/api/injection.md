# 常量注入

注入常量的意义在于：注入的内容绝对全局的且不可变的，只能被当前作用域被覆盖，而且在函数调用的时候，即使其享有独立的环境也是可以直接使用这些常量。有点类似 Racket 中的`define`的行为，但是 Felys 由于引入了变量，所以不允许运行时这么做，需要在 Rust 层面声明。

## 初始化

使用 Rust 内置类型`HashMap<String, Object>`来存储所有需要注入的内容，其中`String`代表的是常量名，`Object`是 Felys 的常量类型，推荐对列表直接使用`HashMap::from()`来生成这个哈希表。

```rust
let mixin = HashMap::from([
    ("一".to_string(), Object::Number(1.0))，
    ("二".to_string(), Object::Number(2.0)),
]);
```

## 注入

然后在创建`Worker`的时候把这个哈希表传入即可：

```rust
Worker::new(mixin, 0.0, Language::ZH);
```

当你使用这个`Worker`运行代码的时候，那个代码里就可以来调用这两个常量了，详见下页。
