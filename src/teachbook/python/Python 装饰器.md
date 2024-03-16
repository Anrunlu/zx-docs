---
title: Python 装饰器
icon: fas fa-list
author: 周子力
order: 32
category:
  - 教学文档
tag:
  - Python
---
# Python 装饰器

## 1.什么是装饰器？

装饰，顾名思义是指在一个物品上，增加一些新东西，并不改变该物品，只是增加一些新的内容。从专业的角度说，装饰器就是在不修改被装饰对象源代码以及调用方式的前提下为被装饰对象添加新功能。

在Python中，装饰器实际是一种特殊的函数，装饰器函数接收一个函数作为参数，并返回一个修改后的函数，新函数具有与原始函数相同的名称和参数。在调用原始函数之前或之后，可执行一些额外的操作，如计时、日志记录或修改参数等。下面是一个简单的装饰器示例，它用于在函数调用前后显示信息。

例子：

```py
# 添加一个登录验证的功能
def check(fn):
    def inner():
        print("请先登录....")
        fn()
    return inner


def comment():
    print("发表评论")

# 使用装饰器来装饰函数
comment = check(comment)
comment()
```

这段代码定义了一个装饰器函数check，它接受一个函数作为参数，并返回一个新的函数inner。新的函数inner在执行原函数fn之前，会先打印一条“请先登录”的提示信息。

接下来，定义了一个函数comment，它用于发表评论。最后，使用装饰器来装饰函数comment，即将函数comment传入check函数中，将返回的新函数inner赋值给comment。

最后一行代码调用了被装饰后的函数comment，会先执行inner函数中的提示信息，再执行原函数comment中的发表评论的功能。这样就实现了一个简单的登录验证功能。

## 2.装饰器的语法糖

```py
# 使用语法糖方式来装饰函数
@check
def comment():
    print("发表评论")

comment()
```

## 3.装饰器应用

- 统计程序的执行时间：可以通过编写一个装饰器来记录函数的开始时间和结束时间，然后计算函数执行的时间。这个装饰器可以被用于优化程序性能或者进行调试。

-  辅助系统功能输出日志信息：可以编写一个装饰器来记录函数的执行过程以及输出日志信息，这个装饰器可以被用于调试、监控和错误处理等方面。

```py
import time
def get_time(func):
    def inner():
        # 开始计时
        begin = time.time()
        func()
        # 结束计时
        end = time.time()
        print("函数执行花费%f" % (end - begin))

    return inner
```

这段代码定义了一个装饰器函数`get_time`，接受一个函数作为参数。装饰器函数内部定义了一个嵌套函数`inner`，它用于包装传入的函数`func`。`inner`函数在调用`func`之前和之后记录了时间，并计算出函数执行的时间，最后输出函数执行花费的时间。装饰器函数`get_time`返回了`inner`函数，即返回了一个新的函数，这个新函数的功能是在原函数执行前后记录时间并输出执行时间。使用装饰器`@get_time`可以将这个装饰器应用于需要计时的函数上，从而方便地获得函数执行的时间。

用语法糖表示为：

```py
@get_time
def demo():
    for i in range(100000):
        print(i)

demo()
```

### 3.1带参数的函数

```python
def logging(fn):
    def inner(num1, num2):
        print('--正在努力计算--')
        fn(num1, num2)
    return inner

@logging
def sum_num(num1, num2):
    result = num1 + num2
    print(result)

sum_num(10, 20)
```

这段代码定义了一个装饰器函数logging，它接受一个函数fn作为参数。logging返回一个内部函数inner，inner接受两个参数num1和num2，并在调用fn之前打印一条信息。最后，logging将inner函数返回。

@logging是一个装饰器语法，它可以将装饰器函数logging应用到下面的函数sum_num上。这意味着sum_num将被重新定义为inner函数，即调用sum_num实际上是调用inner函数。

在sum_num函数内部，它计算num1和num2的和，并将结果打印出来。由于sum_num被logging装饰器修饰，所以在调用sum_num之前会先打印一条信息。最后，调用sum_num(10, 20)将会输出以下内容：

--正在努力计算--

30

### 3.2带返回值的函数

```py
def logging(fn):
    def inner(num1, num2):
        print('--正在努力计算--')
        result = fn(num1, num2)
        return result
    return inner

@logging
def sum_num(num1, num2):
    result = num1 + num2
    return result

print(sum_num(10, 20))
```

这段代码定义了一个装饰器函数logging，它接受一个函数作为参数，并返回一个新的函数inner。inner函数在执行原函数之前会打印一条信息“--正在努力计算--”，然后执行原函数，最后返回原函数的返回值。

接下来使用@logging装饰器来修饰函数sum_num，相当于将sum_num函数传递给logging函数，并将返回的新函数重新赋值给sum_num。这样，当调用sum_num函数时，实际上执行的是inner函数。

最后，调用sum_num函数并传入参数10和20，输出结果为30。同时，也会打印出"--正在努力计算--"这条信息。

### 3.3带不定长参数的函数

```python
def logging(fn):
    def inner(*args, **kwargs):
        print('--正在努力计算--')
        fn(*args, **kwargs)
    return inner
```

这段代码定义了一个装饰器函数 logging，它接受一个函数 fn 作为参数，并返回一个函数 inner。

函数 inner 接受任意数量的位置参数和关键字参数，并在执行 fn 函数之前打印一条信息 "--正在努力计算--"。然后，函数 inner 调用 fn 函数并传入相同的参数。

这个装饰器函数可以用来给其他函数添加日志信息，以便在函数执行时打印一些有用的信息，比如函数开始执行、执行结束等。

```py
@logging
def sum_num(*args, **kwargs):
    result = 0
    for i in args:
        result += i

    for i in kwargs.values():
        result += i
    print(result)

sum_num(10, 20, a=30)
```

这段代码定义了一个函数sum_num()，它将任意数量的位置参数和关键字参数作为输入，并将它们加起来。函数内部首先将所有位置参数相加，接着将所有关键字参数的值相加，最后将两者之和打印出来。

代码中的装饰器@logging表示在函数执行时会调用一个名为logging的函数（这个函数并没有给出），它可能会记录函数的执行情况（比如开始时间、结束时间、参数值等等）。这样，我们就可以在调用函数时进行记录和日志的输出，从而方便我们进行错误调试和问题排查。

最后，我们对函数进行了一次调用sum_num(10, 20, a=30)，输出结果为60。这是由于10与20是位置参数，相加为30，而a=30是一个关键字参数，值为30，所以总和为60。

### 3.4带有参数的装饰器

在装饰器外面再包裹上一个函数，让最外面的函数接收参数，返回的是装饰器，因为@符号后面必须是装饰器实例。

```py
# 添加输出日志的功能
def logging(flag):

    def decorator(fn):
        def inner(num1, num2):
            if flag == "+":
                print("--正在努力加法计算--")
            elif flag == "-":
                print("--正在努力减法计算--")
            result = fn(num1, num2)
            return result
        return inner

    # 返回装饰器
    return decorator
```

这段代码定义了一个装饰器函数 `logging`，它接受一个字符串参数 `flag`，并返回一个装饰器函数 `decorator`。

`decorator` 函数接受一个函数 `fn` 作为参数，它定义了一个内部函数 `inner`，该函数接受两个参数 `num1` 和 `num2`。在 `inner` 函数中，根据传入的 `flag` 值输出相应的日志信息，然后调用原始函数 `fn` 并返回其结果。

最后，`decorator` 函数返回 `inner` 函数作为装饰器，并将其应用于被装饰的函数。这样，当被装饰的函数被调用时，会先输出相应的日志信息，然后再执行原始函数。

```py
# 使用装饰器装饰函数
@logging("+")
def add(a, b):
    result = a + b
    return result

@logging("-")
def sub(a, b):
    result = a - b
    return result

result = add(1, 2)
print(result)
result = sub(1, 2)
print(result)
```

这段代码定义了两个函数add和sub，分别实现加法和减法运算。同时，使用装饰器@logging对这两个函数进行装饰，装饰器函数logging会在函数执行前和执行后打印日志信息，其中使用"+"和"-"作为日志信息的前缀。最后，分别调用add和sub函数，输出它们的返回结果。

## 4.类装饰器

装饰器还有一种特殊的用法就是类装饰器，就是通过定义一个类来装饰函数。

```py
class Check(object):
    def __init__(self, fn):
        # 初始化操作在此完成
        self.__fn = fn

    # 实现__call__方法，表示把类像调用函数一样进行调用。
    def __call__(self, *args, **kwargs):
        # 添加装饰功能
        print("请先登陆...")
        self.__fn()
```

这段代码定义了一个装饰器类 Check，用于在被装饰的函数执行前进行一些操作，例如检查用户是否已经登录。 在类的初始化方法 **init** 中，将被装饰的函数 fn 保存在实例属性 **fn 中。**

**在类中定义了一个特殊方法** call**，该方法会在类实例像函数一样被调用时执行。在** call **方法中，先输出一条提示信息，然后调用保存在** fn 属性中的函数。

当我们使用该装饰器来装饰一个函数时，实际上是创建了一个 Check 类的实例，并将被装饰的函数作为参数传入该实例的初始化方法 **init** 中，然后将该实例作为函数的新定义。因此，当我们调用被装饰的函数时，实际上是调用了 Check 类的实例，进而调用了 **call** 方法，从而实现了装饰器的功能。

```py
@Check
def comment():
    print("发表评论")

comment()
```

@Check 等价于 comment = Check(comment), 所以需要提供一个init方法，并多增加一个fn参数。

要想类的实例对象能够像函数一样调用，需要在类里面使用call方法，把类的实例变成可调用对象(callable)，也就是说可以像调用函数一样进行调用。

在call方法里进行对fn函数的装饰，可以添加额外的功能。







# 参考

1. https://zhuanlan.zhihu.com/p/637223096
