---
title: Python 类与对象一
icon: fas fa-list
author: 周子力
order: 20
category:
  - 教学文档
tag:
  - Python
---

# Python类与对象一

## 1.什么是面向对象？

面向对象是抽象化的编程思想。一个对象就是一个事物，其内容有自己的属性和方法，在用的时候可以直接使用。比如，在游戏设计中，对于子弹，就可以看成一个对象，这个对象有颜色，有位置，有移动速度等。也就是说把子弹的一些共性的东西拿出来，写成一种数据结构，就是常说的类。而一个个具体的东西，就是对象。再比如：子弹是一个类，那么红色的，位于（10，10）处的，移动速度为2的子弹就是一个对象。

从专业化的角度：

类是对一系列具有相同“特征”和“行为”的事物的统称，是一个“抽象的概念“，不是真实存在的事物。

- 特征即是属性
- 行为即是方法

类比如是制造洗衣机时要用到的图纸，

对象是类创建出来的真实存在的事物，例如：洗衣机。

## 2.面向对象的实现方法

### 2.1类的定义

- 语法

```python
class 类名():
    代码
    ......
```

> 注意：类名要满足标识符命名规则，同时遵循==大驼峰命名习惯==。

- 体验

``` python
class Washer():
    def wash(self):
        print('我会洗衣服')
```

- 拓展：经典类

不由任意内置类型派生出的类，称之为经典类

``` python
class 类名:
    代码
    ......
```

### 2.2 对象的创建

对象又名实例。

- 语法

``` python
对象名 = 类名()
```

- 体验

``` python
# 创建对象
haier1 = Washer()

# <__main__.Washer object at 0x0000018B7B224240>
print(haier1)

# haier对象调用实例方法
haier1.wash()
```

> 注意：创建对象的过程也叫实例化对象。

### 2.3 self

self指的是调用该函数的对象。

``` python
# 1. 定义类
class Washer():
    def wash(self):
        print('我会洗衣服')
        # <__main__.Washer object at 0x0000024BA2B34240>
        print(self)


# 2. 创建对象
haier1 = Washer()
# <__main__.Washer object at 0x0000018B7B224240>
print(haier1)
# haier1对象调用实例方法
haier1.wash()


haier2 = Washer()
# <__main__.Washer object at 0x0000022005857EF0>
print(haier2)
```

> 注意：打印对象和self得到的结果是一致的，都是当前对象的内存中存储地址。

## 3.添加和获取对象属性

属性是什么？就是对象的一个维度的特征，比如人有姓名，那么姓名就是一个属性。

### 3.1类外面添加对象属性

- 语法

对象名.属性名=值

- 例子

```
cat.color='yellow'
```

### 3.2 类外面获取对象属性

- 语法

``` python
对象名.属性名
```

- 例子

``` python
print(f'haier1洗衣机的宽度是{haier1.width}')
print(f'haier1洗衣机的高度是{haier1.height}')
```



### 3.3 类里面获取对象属性

- 语法

``` python
self.属性名
```

- 例子

``` python
# 定义类
class Washer():
    def print_info(self):
        # 类里面获取实例属性
        print(f'haier1洗衣机的宽度是{self.width}')
        print(f'haier1洗衣机的高度是{self.height}')

# 创建对象
haier1 = Washer()

# 添加实例属性
haier1.width = 500
haier1.height = 800

haier1.print_info()
```

## 4.魔法方法

在Python中，`__xx__()`的函数叫做魔法方法，指的是具有特殊功能的函数。

#### 4.1 `__init__()`

#### 4.1.1 体验`__init__()`

==`__init__()`方法的作用：初始化对象。==

``` python
class Washer():
    
    # 定义初始化功能的函数
    def __init__(self):
        # 添加实例属性
        self.width = 500
        self.height = 800


    def print_info(self):
        # 类里面调用实例属性
        print(f'洗衣机的宽度是{self.width}, 高度是{self.height}')


haier1 = Washer()
haier1.print_info()
```

> 注意：
>
> - `__init__()`方法，在创建一个对象时默认被调用，不需要手动调用
> - `__init__(self)`中的self参数，不需要开发者传递，python解释器会自动把当前的对象引用传递过去。



#### 4.1.2 带参数的`__init__()`

思考：一个类可以创建多个对象，如何对不同的对象设置不同的初始化属性呢？

答：传参数。

``` python
class Washer():
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def print_info(self):
        print(f'洗衣机的宽度是{self.width}')
        print(f'洗衣机的高度是{self.height}')


haier1 = Washer(10, 20)
haier1.print_info()


haier2 = Washer(30, 40)
haier2.print_info()
```



### 4.2  `__str__()`

当使用print输出对象的时候，默认打印对象的内存地址。如果类定义了`__str__`方法，那么就会打印从在这个方法中 return 的数据。

``` python
class Washer():
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __str__(self):
        return '这是海尔洗衣机的说明书'


haier1 = Washer(10, 20)
# 这是海尔洗衣机的说明书
print(haier1)
```



### 4.3  `__del__()`

当删除对象时，python解释器也会默认调用`__del__()`方法。

``` python
class Washer():
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __del__(self):
        print(f'{self}对象已经被删除')


haier1 = Washer(10, 20)

# <__main__.Washer object at 0x0000026118223278>对象已经被删除
del haier1
```

# 总结

- 面向对象重要组成部分

  - 类
    - 创建类

  ``` python
  class 类名():
    代码
  ```

  - 对象

  ``` python
  对象名 = 类名()
  ```

- 添加对象属性

  - 类外面

  ``` python
  对象名.属性名 = 值
  ```

  - 类里面

  ``` python
  self.属性名 = 值
  ```

- 获取对象属性

  - 类外面

  ``` python
  对象名.属性名
  ```

  - 类里面

  ``` python
  self.属性名
  ```

- 魔法方法

  - `__init__()`: 初始化
  - `__str__()`:输出对象信息
  - `__del__()`:删除对象时调用
