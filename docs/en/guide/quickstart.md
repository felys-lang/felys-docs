# Quickstart

Not installed? Check out [install](install) steps or use the [playground](https://exec.felys.dev)。

## First program

Assign a value to the variable, and print it out.

```
video = "Because of You";
print(video);
```

## Upgrade this program

Use a function to do these;

```
ilove = |episode| {
    print("Favourite episode is:", episode);
};

video = "Because of You";
ilove(video);
```

::: tip
`print()` does not have restrictions on numbers of parameters. All of them will be concatenated by space and printed out.
:::

## Upgrade again

Say important thrice.

```
ilove = |episode| {
    counter = 0;
    while counter < 3 {
        print("Favourite episode is:", episode);
        counter += 1;
    }
};


episode = "Because of You";
ilove(episode);
```

## Ultimate Version

Short circuit this function if favourite episode is `none`.

```
print("Language for", __elysia__);

ilove = |episode| {
    if episode == none {
        print("I'm not a weeb");
        return none;
    }

    counter = 0;
    while counter < 3 {
        print("Favourite episode is:", episode);
        counter += 1;
    }
};


episode = "Because of You";
ilove(episode);
```

::: tip
Function closure is not supported, so a function only have access parameters, constants, and it self. (syntactic sugar)
:::

### Cool Tricks

Try `print(ilove);`, it will print out a condensed abstract syntax tree of the function.
