# Injection

Injection exists because the injected objects are globally immutable. They can only be temporarily overridden within the current scope. When calling a function, even if it has its own environment, it still has access to the injected objects. This is somewhat similar to the `define` feature in Racket. However, since Felys introduces variables, it is not allowed to inject objects during runtime; instead, this should be done at the Rust level.

## Initialization

We use Rust's built-in `HashMap<String, Object>` type to store all the objects. The String represents the identifier, and `Object` is the corresponding Felys object. It is recommended to use `HashMap::from()` to generate this hash map.

```rust
let mixin = HashMap::from([
    ("one".to_string(), Object::Number(1.0))，
    ("two".to_string(), Object::Number(2.0)),
]);
```

## Inject

Inject it when building the `Worker`:

```rust
Worker::new(mixin, 0.0, 100, Language::EN);
```

Then, when you use the `Worker` to execute code, this code will have access to these two constants. See more details on the next page.
