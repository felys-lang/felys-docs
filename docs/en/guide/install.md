# Install

Felys offers various installation methods, and it can also be used on websites that support running code online.

## Playground

Directly running on a website built with Next and Axum: [exec.felys.dev](https://exec.felys.dev)

::: tip
To protect the server, each execution is limited to 50 ms, and there is also rate limiting.
:::

## Command-line Interface

Similar to tools like python3, it can be used to run a file or enter an interactive interpreter.

### First method: download releases on GitHub

Go to [GitHub](https://github.com/felys-lang/felys-cli) and pick the verison for your OS.

### Second method: compile it on your own

A Rust compilation environment and the Cargo package manager are required. You can refer to the [book](https://doc.rust-lang.org/book/ch01-01-installation.html) for installation instructions. Personally, I recommend using a package manager like `brew` to install `rustup`, and then use the latter to install the Rust toolchain.

Pull the source code, or you can directly download the [zip](https://github.com/felys-lang/felys-cli/archive/refs/heads/main.zip).

```shell
git clone https://github.com/felys-lang/felys-cli.git
```

Compile:

```shell
cargo build --release
```

The target file is located at:

```shell
./target/release/felys
```

### Usage

Running `felys` directly will enter a English interactive environment; to run a specific file, simply include the filename:

```shell
felys filename.ely
```

More Parameters:

- `-v`: Whether to print relevant runtime information after execution (not effective in the interactive environment)
- `-t <TIME>`: Timeout setting, can be a decimal with seconds as the unit, default is 0.0, meaning no timeout setting
- `-m <MAXC>`: Maximum recursion depth setting, default is 100 calls
- `-l <LANG>`: Choose `en` or `zh` as the interactive language, default is en for the English environment

## Build it yourself

Customize your own version of Felys through interfaces at the Rust level. For more details, refer to [API](../api/overview).

## Hello, World!

Once everything is set up, you can run this code to verify:

```
print("Hello, World!");
```
