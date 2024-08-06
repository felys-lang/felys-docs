# 常量注入

注入常量的意义在于：注入的内容是绝对全局且不可变的，只能在当前作用域中被覆盖。而且在函数调用时，即使它们拥有独立的环境，也可以直接使用这些常量。这有点类似于 Racket 中 `define` 的行为，但是由于 Felys 引入了变量机制，因此不允许在运行时这样做，必须在 Rust 层面进行声明。

## 初始化

使用 Rust 内置类型`HashMap<String, Object>`来存储所有需要注入的内容，其中`String`代表常量名，而`Object`是 Felys 的常量类型，推荐对列表直接使用`HashMap::from()`来生成这个哈希表。

```rust
let mixin = HashMap::from([
    ("一".to_string(), Object::Number(1.0))，
    ("二".to_string(), Object::Number(2.0)),
]);
```

## 注入

然后在创建`Worker`的时候把这个哈希表传入即可：

```rust
Worker::new(mixin, 0.0, 100, Language::ZH);
```

当你使用这个`Worker`运行代码的时候，那个代码里就可以来调用这两个常量了，详见下页。
