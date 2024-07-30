# 安装

Felys 提供很多种安装方式，即开即用的话可以用代码在线运行网站。

## 在线运行

在一个由 React 和 Axum 构建的网站直接运行：[exec.felys.dev](https://google.com)

::: tip
为保护服务器，每次在线运行时长被控制在 50 毫秒内，且有限流。
:::

## 命令行工具

类似于`python3`这种命令行工具，可以用来运行一个文件，或者进入一个交互式的解释器。

### 方法一：下载安装

### 方法二：自行编译

需要有 Rust 编译环境，以及 Cargo 包管理器才行，安装方式可以参考官方的[书](https://doc.rust-lang.org/book/ch01-01-installation.html)，推荐用包管理器安装`rustup`然后用后者安装相关工具链。

用 Git 下载源代码，或者也可以直接下载[压缩包](https://github.com/felys-lang/felys-cli/archive/refs/heads/main.zip)。

```shell
git clone https://github.com/felys-lang/felys-cli.git
```

然后运行：

```shell
cargo build --release
```

目标文件在（直接运行默认是英文版）：

```shell
./target/release/felys
```

### 使用

在命令行运行`felys -l zh`可以直接进入一个中文交互环境，或者也可以：

```shell
felys -l zh filename.ely
```

运行指定文件，更多细节参考[命令行工具](../api/cli)。

## 自行构建

从 Rust 层面通过接口定制属于你自己的 Felys 版本，详情参考[接口](../api/overview)

## 你好，世界！

一切设置好后，可以运行这段代码来检验：

```felys
打印（“你好，世界！”）；
```
