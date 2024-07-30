# Overview

By using the API, you can build your own distribution of Felys. It can be turned into a CLI or an online code execution website through Rust ecosystem. It allows you to inject customized constants and functions. This requires a certain level of Rust proficiency, and no introductory tutorials will be provided here.

## Setup

In the project directory, run this in the terminal:

```shell
cargo add felys
```

Import the followings, make sure it does not conflict with others.

```rust
use std::collections::HashMap;
use felys::*;
```
