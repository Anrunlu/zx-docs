---
title: Python 函数一
icon: fas fa-list
author: 周子力
order: 16
category:
  - 教学文档
tag:
  - Python
---

# Python 函数一

## 1.什么是函数？

函数本质上就是一些操作的集合，用于完成特定的任务。其重要作用是可以使代码复用，相同任务的代码不需要重新编写。

## 2.函数的创建与应用

### 2.1 函数定义

- 语法

```python
def 函数名(参数):
    代码1
    代码2
    ......
```

```python
# 封装ATM机功能选项 -- 定义函数
def select_func():
    print('-----请选择功能-----')
    print('查询余额')
    print('存款')
    print('取款')
    print('-----请选择功能-----')
```

### 2.2 调用函数

- 语法

```python
print('密码正确登录成功')
# 显示"选择功能"界面 -- 调用函数
select_func()

print('查询余额完毕')
# 显示"选择功能"界面 -- 调用函数
select_func()

print('取了2000元钱')
# 显示"选择功能"界面 -- 调用函数
select_func()
```

## 3.函数的参数（简单）

如果把函数看作是一个车间（进原料，出产品），那么函数参数就相当于原料。

```python
# 定义函数时同时定义了接收用户数据的参数a和b，a和b是形参
def add_num2(a, b):
    result = a + b
    print(result)


# 调用函数时传入了真实的数据10 和 20，真实数据为实参
add_num2(10, 20)
```

## 4. 函数的返回值

- 语法

```python
def buy():
    return '烟'

# 使用变量保存函数返回值
goods = buy()
print(goods)
```

- 实例

需求：制作一个计算器，计算任意两数字之和，并保存结果。

```python
def sum_num(a, b):
    return a + b


# 用result变量保存函数返回值
result = sum_num(1, 2)
print(result)
```

## 4. 函数的说明文档

思考：定义一个函数后，程序员如何书写程序能够快速提示这个函数的作用？

答：注释

思考：如果代码多，我们是不是需要在很多代码中找到这个函数定义的位置才能看到注释？如果想更方便的查看函数的作用怎么办？

答：函数的说明文档

> 函数的说明文档也叫函数的文档说明。

### 4.1 语法

- 定义函数的说明文档

```python
def 函数名(参数):
    """ 说明文档的位置 """
    代码
    ......
```

- 查看函数的说明文档

```python
help(函数名)
```

### 4.2 快速体验

```python
def sum_num(a, b):
    """ 求和函数 """
    return a + b


help(sum_num)
```

## 5. 函数嵌套调用

所谓函数嵌套调用指的是==一个函数里面又调用了另外一个函数==。

- 示例

```python
def testB():
    print('---- testB start----')
    print('这里是testB函数执行的代码...(省略)...')
    print('---- testB end----')

def testA():
    print('---- testA start----')
    testB()
    print('---- testA end----')

testA()
```

- 执行流程

![picture 0](https://oss.docs.z-xin.net/f11c677cebc4bff3b590dd5028c11a0d5d9dc71aced22a6976d7e3a41be242a6.png)

> - 如果函数 A 中，调用了另外一个函数 B，那么先把函数 B 中的任务都执行完毕之后才会回到上次 函数 A 执行的位置。

## 6. 函数应用

### 6.1 打印图形

1. 打印一条横线

```python
def print_line():
    print('-' * 20)


print_line()
```

2. 打印多条横线

```python
def print_line():
    print('-' * 20)


def print_lines(num):
    i = 0
    while i < num:
        print_line()
        i += 1


print_lines(5)
```

### 6.2 函数计算

1. 求三个数之和

```python
def sum_num(a, b, c):
    return a + b + c


result = sum_num(1, 2, 3)
print(result)  # 6
```

2. 求三个数平均值

```python
def average_num(a, b, c):
    sumResult = sum_num(a, b, c)
    return sumResult / 3

result = average_num(1, 2, 3)
print(result)  # 2.0
```

## 2. 总结

- 函数的作用：封装代码，高效的代码重用

- 函数使用步骤

  - 定义函数

  ```python
  def 函数名():
      代码1
      代码2
      ...
  ```

  - 调用函数

  ```python
  函数名()
  ```

- 函数的参数：函数调用的时候可以传入真实数据，增大函数的使用的灵活性

  - 形参：函数定义时书写的参数(非真实数据)
  - 实参：函数调用时书写的参数(真实数据)

- 函数的返回值

  - 作用：函数调用后，返回需要的计算结果
  - 写法

  ```python
  return 表达式
  ```

- 函数的说明文档

  - 作用：保存函数解释说明的信息
  - 写法

  ```python
  def 函数名():
      """ 函数说明文档 """
  ```

- 函数嵌套调用：一个函数内部嵌套调用另外一个函数
