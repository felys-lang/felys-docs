# Quickstart

Use the [playground](https://exec.felys.dev) to test your code.

## First program

Assign a value to the variable, and return it.

```
video = "Because of You";
return video;
```

## Upgrade this program

Use a function to do these.

```
ilove = |episode| {
    return "Favourite episode is: " + episode;
};

video = "Because of You";
return ilove(video);
```

## Upgrade again

Say important thrice.

```
ilove = |episode| {
    counter = 0;
    message = "Favourite episode is: ";
    while counter < 2 {
        message += episode + ", ";
        counter += 1;
    }
    message + episode + "!"
};

episode = "Because of You";
return ilove(episode);
```

## Ultimate Version

Short circuit this function if favourite episode is `none`.

```
ilove = |episode| {
    if episode == "" {
        return "I love nothing...";
    }

    counter = 0;
    message = "Favourite episode is: ";
    while counter < 2 {
        message += episode + ", ";
        counter += 1;
    }
    message + episode + "!"
};

episode = "Because of You";
return ilove(episode);
```

### Tricks

Try `return ilove;`, it will return an abstract syntax tree of the function.
