# Overview

By using the Felys API, you can build your own distribution of Felys. This distribution can be transformed into a CLI tool or an online code execution platform using the Rust ecosystem. The API allows you to inject customized constants and functions. However, this requires a certain level of Rust proficiency, and no introductory tutorials are provided here.

## Setup

In your project directory, run the following command in the terminal:

```shell
cargo add felys
```

Import the following modules, make sure they do not conflict with other imports:

```rust
use std::collections::HashMap;
use felys::*;
```
