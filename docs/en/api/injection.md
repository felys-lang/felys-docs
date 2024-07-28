# Injection

The reason why injection exists is that the injected objects are globally immutable. The only currecty scope to override it. When calling a function, even if it has its own environment, it still has the access to the injected objects. It is a bit similar to `define` in Racket. However, since Felys intoduced variables, it is not allowed during runtime. Instead, do it in Rust level.

## Initialization

We use Rust built-in type `HashMap<String, Object>` to store all the injected objects. The `String` is the identifier and `Object` is the corresponded Felys type. It is recommaned to use `HashMap::from()` to generate this hash map.

```rust
let mixin = HashMap::from([
    ("one".to_string(), Object::Number(1.0))，
    ("two".to_string(), Object::Number(2.0)),
]);
```

## Inject

Inject it when building the `Worker`:

```rust
Worker::new(mixin, 0.0, Language::EN);
```

Then, when you use the `Worker` to execute code, this code will have access to these two constants. See more details in next page.
