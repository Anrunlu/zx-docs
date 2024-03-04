---
title: Python 推导式
icon: fas fa-list
author: 周子力
order: 12
category:
  - 教学文档
tag:
  - Python
---

# Python 推导式

## 1. 什么是推导式

是指用一个表达式创建一个有规律的数据结构或控制一个有规律的数据结构的方式。

## 2. 列表推导式

### 2.1 通过循环

列表推导式又叫列表生成式。

需求：创建一个 0-10 的列表。

- while 循环实现

```python
# 1. 准备一个空列表
list1 = []

# 2. 书写循环，依次追加数字到空列表list1中
i = 0
while i < 10:
    list1.append(i)
    i += 1

print(list1)
```

- for 循环实现

```python
list1 = []
for i in range(10):
    list1.append(i)

print(list1)
```

- 列表推导式实现

```python
list1 = [i for i in range(10)]
print(list1)
```

### 2.2 带 if 的列表推导式

需求：创建 0-10 的偶数列表

- 方法一：range()步长实现

```python
list1 = [i for i in range(0, 10, 2)]
print(list1)
```

- 方法二：if 实现

```python
list1 = [i for i in range(10) if i % 2 == 0]
print(list1)
```

### 2.3 多个 for 循环实现列表推导式

需求：创建列表如下：

```html
[(1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

- 代码如下：

```python
list1 = [(i, j) for i in range(1, 3) for j in range(3)]
print(list1)
```

## 3. 字典推导式

思考：如果有如下两个列表：

```python
list1 = ['name', 'age', 'gender']
list2 = ['Tom', 20, 'man']
```

如何快速合并为一个字典？

答：字典推导式

字典推导式作用：快速合并列表为字典或提取字典中目标数据。

### 3.1 快速体验

1. 创建一个字典：字典 key 是 1-5 数字，value 是这个数字的 2 次方。

```python
dict1 = {i: i**2 for i in range(1, 5)}
print(dict1)  # {1: 1, 2: 4, 3: 9, 4: 16}
```

2. 将两个列表合并为一个字典

```python
list1 = ['name', 'age', 'gender']
list2 = ['Tom', 20, 'man']

dict1 = {list1[i]: list2[i] for i in range(len(list1))}
print(dict1)
```

3. 提取字典中目标数据

```python
counts = {'MBP': 268, 'HP': 125, 'DELL': 201, 'Lenovo': 199, 'acer': 99}

# 需求：提取上述电脑数量大于等于200的字典数据
count1 = {key: value for key, value in counts.items() if value >= 200}
print(count1)  # {'MBP': 268, 'DELL': 201}
```

## 4. 集合推导式

需求：创建一个集合，数据为下方列表的 2 次方。

```python
list1 = [1, 1, 2]
```

代码如下：

```python
list1 = [1, 1, 2]
set1 = {i ** 2 for i in list1}
print(set1)  # {1, 4}
```

> 注意：集合有数据去重功能。

## 总结

- 推导式的作用：简化代码
- 推导式写法

```python
# 列表推导式
[xx for xx in range()]

# 字典推导式
{xx1: xx2 for ... in ...}

# 集合推导式
{xx for xx in ...}
```
