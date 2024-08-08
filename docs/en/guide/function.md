# Function

In Felys, functions are also inherited from `Object`, so you can even pass functions as arguments into other functions.

## Define

The following two methods are completely equivalent, with the latter being just syntactic sugar.

```
|n| {
    return n+1;
}
```

```
|n| n+1;
```

## Scope

Whenever a function is executed, the interpreter creates an independent environment for that function, completely isolated from the parent environment. In this environment, the following can be accessed:

- All passed-in parameters
- The function itself, which will forcibly override any parameters with the same name
- Constants, which are built-in data injected from the Rust layer

Apart from constants, all other content is directly copied in memory. If a function is passed as a variable, the entire function's syntax tree will be copied, which incurs significant performance overhead. Therefore, avoid abusing recursion, especially very complex recursion.

Additionally, when creating this environment, it will also check if the maximum function call limit has been exceeded, which helps mitigate the consequences of infinite recursion."
