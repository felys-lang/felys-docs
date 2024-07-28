# 构建运行

Felys 是可以进行一些基础的配置的，比如常量注入、使用的语言（中/英）、超时设置等。

## 构建一个入口

这里我们就不注入常量，具体方法可以参考上一页。

```rust
let mixin = HashMap::new();
let mut main = Worker::new(mixin, 0.0, Language::ZH);
```

- `mixin`是常量注入。
- `0.0`代表了超时设置，设置为零代表不设置超时，注意如果设置超时的话会多开一条线程作为计时器，在启动阶段会慢上百微秒，然后在每条 statement 运行的时候都会检查是否超时，如果超时就会报错，但如果单条 statement 运行了很久，这个超时设置只会在运行到下一条的时候进行检测。
- `Language::ZH`决定了使用哪个语言的分析器，这里是中文。

## 运行代码

```rust
let code = "返回 “——爱莉希雅——”；".to_string();
let _ = main.exec(code);
```

`main.exec(code)`的返回值是一个`Result<Summary, Error>`，这样允许程序员自行定义如何处理输出结果和错误，注意这个`Error`是 Felys 定义的，实现了`Display`的 trait，即可以使用`.to_string()`方法。

### 正确运行的输出结果

运行正常便可以获取类型为`Summary`的结果，其结构体如下：

```rust
pub struct Summary {
    pub time: (Duration, Duration, Duration),
    pub stdout: String,
    pub exit: Object,
}
```

- `time`：初始化的时间，分词器的时间，代码运行的时间。
- `stdout`：先前通过`cx.write()`的字符串被换行符拼接后的结果。
- `exit`：在非函数中调用`return`关键字，那个变量就会被直接返回到此，如果没有出现这种情况，默认是`Object::None`。
