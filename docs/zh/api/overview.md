# 概览

使用程序接口可以构建属于你自己的 Felys 版本，可以通过 Rust 的生态将其制作成命令行工具或者在线运行网站，并且允许你注入定制的变量和函数，这一部分需要一定的 Rust 基础，这里不会做任何入门的教程。

## 项目配置

在项目目录下，终端运行：

```shell
cargo add felys
```

导入以下内容，注意不要覆盖或被覆盖。

```rust
use std::collections::HashMap;
use felys::*;
```
