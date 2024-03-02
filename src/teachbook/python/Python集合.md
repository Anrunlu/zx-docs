---
title: Python集合
icon: fas fa-list
author: 周子力
order: 11
category:
  - 教学文档
tag:
  - Python
---
# Python集合

## 1.什么是集合？

列表是其实也是一系列的数，但是是可以重复的。为了更方便地对数据进行处理，所以又增加集合这样一个数据结构。集合是一种无序且不重复的元素组合，它用于存储独一无二的元素。

## 2. 集合语法

用{}括起来的数据就是集合。

```python
{1,2,3} #列表是用[]括起来的。元组是用()括起来的数据。
```

## 3.集合的操作

### 3.1 创建

创建集合使用`{}`或`set()`， 但是如果要创建空集合只能使用`set()`，因为`{}`用来创建空字典。

``` python
s1 = {10, 20, 30, 40, 50}
print(s1)

s2 = {10, 30, 20, 10, 30, 40, 30, 50}
print(s2)

s3 = set('abcdefg')
print(s3)

s4 = set()
print(type(s4))  # set

s5 = {}
print(type(s5))  # dict
```

> 特点：
>
> 1. 集合可以去掉重复数据；
> 2. 集合数据是无序的，故不支持下标

### 3.2 增加元素

- add()

``` python
s1 = {10, 20}
s1.add(100)
s1.add(10)
print(s1)  # {100, 10, 20}
```

> 因为集合有去重功能，所以，当向集合内追加的数据是当前集合已有数据的话，则不进行任何操作。

- update(), 追加的数据是序列。

``` python
s1 = {10, 20}
# s1.update(100)  # 报错
s1.update([100, 200])
s1.update('abc')
print(s1)
```

### 3.3 删除元素

- remove()，删除集合中的指定数据，如果数据不存在则报错。

``` python
s1 = {10, 20}

s1.remove(10)
print(s1)

s1.remove(10)  # 报错
print(s1)
```



- discard()，删除集合中的指定数据，如果数据不存在也不会报错。

``` python
s1 = {10, 20}

s1.discard(10)
print(s1)

s1.discard(10)
print(s1)
```



- pop()，随机删除集合中的某个数据，并返回这个数据。

``` python
s1 = {10, 20, 30, 40, 50}

del_num = s1.pop()
print(del_num)
print(s1)
```

### 3.3 查找数据

- in：判断数据在集合序列
- not in：判断数据不在集合序列

``` python
s1 = {10, 20, 30, 40, 50}

print(10 in s1)
print(10 not in s1)
```

## 总结

- 创建集合

  - 有数据集合

  ``` python
  s1 = {数据1, 数据2, ...}
  ```

  - 无数据集合

  ``` python
  s1 = set()
  ```

- 常见操作

  - 增加数据
    - add()
    - update()
  - 删除数据
    - remove()
    - discard()







