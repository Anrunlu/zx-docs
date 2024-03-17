---
title: Python 闭包
icon: fas fa-list
author: 周子力
order: 31
category:
  - 教学文档
tag:
  - Python
---

# Python 闭包

## 1.什么是闭包？

先看一个程序示例：

```python
def f1():
    n=666;

print(n)  #会出现 n 没有定义的错误  在外部无法访问函数内容的变量
```

但是可以这样做

```python
def f1():
    n=666
    def f2():
        print(n) #这个是可以的，但是怎么样才可以在函数外部，实现这个功能呢？
```

如果再修改一下

```python
def f1():
    n=666
    def f2():
        print(n)
    
    return f2  #返回是一个是函数

result = f1() 
result() #执行这个函数，那么就可以得到 print(n)的效果。
```

那么这里的f2函数，就是一个闭包。

闭包的维基百科的定义：在一些语言中，在函数中可以（嵌套）定义另一个函数时，如果内部的函数引用了外部的函数的变量，则可能产生闭包。闭包可以用来在一个函数与一组“私有”变量之间创建关联关系。在给定函数被多次调用的过程中，这些私有变量能够保持其持久性。

## 2.闭包的理解

- 在函数嵌套（函数里面在定义函数）的前提下

- 内部函数使用了外部函数的变量（还包括外部函数的参数）

- 外部函数返回了内部函数

说白了，**闭包就是能够读取其他函数内部变量的函数。**

再来一个例子：

```py
# 定义一个外部函数 
def func_out(num1):
    # 定义一个内部函数 
    def func_inner(num2):
        # 内部函数使用了外部函数的变量(num1) 
        result = num1 + num2 
        print("结果是:", result)
# 外部函数返回了内部函数，这里返回的内部函数就是闭包
return func_inner
# 创建闭包实例 
f = func_out(1)
# 执行闭包
f(2) 
f(3)
```

闭包可以保存外部函数内的变量，不会随着外部函数调用完而销毁。 注意点: 由于闭包引用了外部函数的变量，则外部函数的变量没有及时释放，消耗内存。

## 3.修改闭包内使用的外部变量

- 错误方式：

```py
def outer():
    # outer函数中的局部变量
    num = 10 
    def inner():
        num = 20
    print(f'原始变量：{num}')  # 10 
    inner()
    print(f'修改后的变量：{num}')  # 10
    return inner

f = outer()
```

这段代码定义了一个函数outer，它包含了另一个函数inner。在outer函数中，定义了一个局部变量num并赋值为10。在inner函数中，又定义了一个同名的局部变量num并赋值为20。但是由于Python的作用域规则，inner函数中的num只是outer函数中的num的一个新的局部变量，两者并不相互影响。因此，调用inner函数后，outer函数中的num仍然是10。最后，outer函数返回inner函数的引用，并将其赋值给变量f。这样，变量f就可以调用inner函数了。

- 正确方法：

```python
def outer():
# outer函数中的局部变量 
    num = 10 
    def inner():
        nonlocal num
        # inner函数中的局部变量
        num = 20
    print(f'原始变量：{num}')  # 10 inner()
    inner()
    print(f'修改后的变量：{num}')  # 20
    return inner
f = outer()
```

这段代码定义了一个函数outer，其中包含一个局部变量num，初始值为10。另外，函数outer还定义了一个内部函数inner。在inner函数中，使用nonlocal关键字声明了num变量是outer函数中的局部变量，而不是inner函数的局部变量。然后，将num的值修改为20，并输出修改前后的值。最后，outer函数返回inner函数的引用，并将其赋值给变量f。这样，变量f就成为了一个指向inner函数的函数对象。
