# 安装

Felys 提供多种安装方式，也可以用支持在线运行代码的网站。

## 在线运行

在一个由 React 和 Axum 构建的网站直接运行：[exec.felys.dev](https://google.com)

::: tip
为保护服务器，每次在线运行时长被控制在 50 毫秒内，且有限流。
:::

## 命令行工具

类似于`python3`这种命令行工具，可以用来运行一个文件，或者进入一个交互式的解释器。

### 方法一：下载预编译文件

前往 [GitHub](https://github.com/felys-lang/felys-cli) 选择适合的版本下载。

### 方法二：自行编译

需要有 Rust 编译环境，以及 Cargo 包管理器，其安装方式可以参考官方的[文档](https://doc.rust-lang.org/book/ch01-01-installation.html)，个人推荐用包管理器如`brew`来安装`rustup`然后用后者安装 Rust 相关工具链。

拉取源代码，或者也可以直接下载[压缩包](https://github.com/felys-lang/felys-cli/archive/refs/heads/main.zip)。

```shell
git clone https://github.com/felys-lang/felys-cli.git
```

然后运行：

```shell
cargo build --release
```

目标文件在（直接运行这个二进制默认是英文环境）：

```shell
./target/release/felys
```

### 命令行使用

直接运行`felys -l zh`会进入一个中文交互环境，需要运行指定文件加上文件名即可：

```shell
felys -l zh filename.ely
```

更多参数：

- `-v`：运行结束后是否打印相关运行信息（交互环境不生效）
- `-t <TIME>`：超时设置，可以是小数单位是秒，默认为`0.0`即无超时设置
- `-l <LANG>`：选择`zh`或者`en`作为交互语言，默认为`en`英文环境

## 自行构建

从 Rust 层面通过接口定制属于你自己的 Felys 版本，详情参考[接口](../api/overview)。

## 你好，世界！

一切设置好后，可以运行这段代码来检验：

```felys
打印（“你好，世界！”）；
```
