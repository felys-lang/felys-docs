# 快速入门

可以用[在线运行网站](https://exec.felys.dev)来测试代码。

## 第一个程序

给一个变量赋值，并且打印出来：

```
video = "Because of You";
return video;
```

## 升级这个程序

构建一个函数来封装一些操作：

```
ilove = |episode| {
    return "Favourite episode is: " + episode;
};

video = "Because of You";
return ilove(video);
```

## 再次升级

重要的事情说三遍：

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

## 终极版

如果没有最喜欢的一集直接短路这个函数：

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

### 小知识

尝试`return (ilove);`可以直接返回这个函数的极简抽象语法树。
