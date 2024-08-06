# 概览

使用程序接口可以构建属于你自己的 Felys 版本。你可以利用 Rust 的生态将其制作成命令行工具或在线运行网站，并且可以注入自定义的变量和函数。这部分内容需要一定的 Rust 基础，因此这里不会提供任何入门教程。

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
