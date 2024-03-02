---
title: Python函数三
icon: fas fa-list
author: 周子力
order: 18
category:
  - 教学文档
tag:
  - Python
---

# Python函数三

## 1.什么是lambda表达式（函数）

如果一个函数有一个返回值，并且只有一句代码，可以使用 lambda简化。

### 3.1 lambda语法

```python
lambda 参数列表 ： 表达式
```

> 注意

- lambda表达式的参数可有可无，函数的参数在lambda表达式中完全适用。
- lambda表达式能接收任何数量的参数但只能返回一个表达式的值。

### 快速入门

```python
# 函数
def fn1():
    return 200


print(fn1)
print(fn1())


# lambda表达式
fn2 = lambda: 100
print(fn2)
print(fn2())
```

> 注意：直接打印lambda表达式，输出的是此lambda的内存地址

### 3.2 示例：计算a + b

#### 3.3.1 函数实现

```python
def add(a, b):
    return a + b


result = add(1, 2)
print(result)
```

> 思考：需求简单，是否代码多？

#### 3.3.2 lambda实现

```python
fn1 = lambda a, b: a + b
print(fn1(1, 2))
```

### 3.3 lambda的参数形式

#### 3.3.1.无参数

```python
fn1 = lambda: 100
print(fn1())
```

#### 3.3.2.一个参数

```python
fn1 = lambda a: a
print(fn1('hello world'))
```

#### 3.3.3.默认参数

```python
fn1 = lambda a, b, c=100: a + b + c
print(fn1(10, 20))
```

#### 3.3.4.可变参数：*args

```python
fn1 = lambda *args: args
print(fn1(10, 20, 30))
```

> 注意：这里的可变参数传入到lambda之后，返回值为元组。

#### 3.3.5.可变参数：**kwargs

```python
fn1 = lambda **kwargs: kwargs
print(fn1(name='python', age=20))
```

### 3.4 lambda的应用

#### 3.4.1. 带判断的lambda

```python
fn1 = lambda a, b: a if a > b else b
print(fn1(1000, 500))
```

#### 3.4.2. 列表数据按字典key的值排序

```python
students = [
    {'name': 'TOM', 'age': 20},
    {'name': 'ROSE', 'age': 19},
    {'name': 'Jack', 'age': 22}
]

# 按name值升序排列
students.sort(key=lambda x: x['name'])
print(students)

# 按name值降序排列
students.sort(key=lambda x: x['name'], reverse=True)
print(students)

# 按age值升序排列
students.sort(key=lambda x: x['age'])
print(students)
```

## 4. 高阶函数

==把函数作为参数传入==，这样的函数称为高阶函数，高阶函数是函数式编程的体现。函数式编程就是指这种高度抽象的编程范式。

### 4.1 体验高阶函数

在Python中，`abs()`函数可以完成对数字求绝对值计算。

``` python
abs(-10)  # 10
```

`round()`函数可以完成对数字的四舍五入计算。

``` python
round(1.2)  # 1
round(1.9)  # 2
```

需求：任意两个数字，按照指定要求整理数字后再进行求和计算。

- 方法1

``` python
def add_num(a, b):
    return abs(a) + abs(b)


result = add_num(-1, 2)
print(result)  # 3
```

- 方法2

``` python
def sum_num(a, b, f):
    return f(a) + f(b)


result = sum_num(-1, 2, abs)
print(result)  # 3
```

> 注意：两种方法对比之后，发现，方法2的代码会更加简洁，函数灵活性更高。

函数式编程大量使用函数，减少了代码的重复，因此程序比较短，开发速度较快。

### 4.2 内置高阶函数

#### 4.2.1 map()

map(func, lst)，将传入的函数变量func作用到lst变量的每个元素中，并将结果组成新的列表(Python2)/迭代器(Python3)返回。

需求：计算`list1`序列中各个数字的2次方。

``` python
list1 = [1, 2, 3, 4, 5]


def func(x):
    return x ** 2


result = map(func, list1)

print(result)  # <map object at 0x0000013769653198>
print(list(result))  # [1, 4, 9, 16, 25]
```



#### 4.2.2 reduce()

reduce(func，lst)，其中func必须有两个参数。每次func计算的结果继续和序列的下一个元素做累积计算。

> 注意：reduce()传入的参数func必须接收2个参数。

需求：计算`list1`序列中各个数字的累加和。

``` python
import functools

list1 = [1, 2, 3, 4, 5]


def func(a, b):
    return a + b


result = functools.reduce(func, list1)

print(result)  # 15
```



#### 4.2.3 filter()

filter(func, lst)函数用于过滤序列, 过滤掉不符合条件的元素, 返回一个 filter 对象。如果要转换为列表, 可以使用 list() 来转换。

``` python
list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


def func(x):
    return x % 2 == 0


result = filter(func, list1)

print(result)  # <filter object at 0x0000017AF9DC3198>
print(list(result))  # [2, 4, 6, 8, 10]
```



# 总结

- lambda

  - 语法

  ``` python
  lambda 参数列表: 表达式
  ```

  - lambda的参数形式

    - 无参数

    ``` python
    lambda: 表达式
    ```

    - 一个参数

    ``` python
    lambda 参数: 表达式
    ```

    - 默认参数

    ``` python
    lambda key=value: 表达式
    ```

    - 不定长位置参数

    ``` python
    lambda *args: 表达式
    ```

    - 不定长关键字参数

    ``` python
    lambda **kwargs: 表达式
    ```

- 高阶函数

  - 作用：把函数作为参数传入，化简代码
  - 内置高阶函数
    - map()
    - reduce()
    - filter()

