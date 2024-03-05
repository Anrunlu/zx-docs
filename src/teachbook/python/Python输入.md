---
title: Python输入
icon: fas fa-wrench
author: 周子力
order: 4
category:
  - 教学文档
tag:
  - Python
---

# Python输入

## 1.什么是输入

在Python中，程序接收用户输入的数据的功能即是输入。通常是通过键盘输入的数据

## 2.输入的语法

```python
input("提示信息")
```

## 3.输入的特点

- 当程序执行到`input`，等待用户输入，输入完成之后才继续向下执行。
- 在Python中，`input`接收用户输入后，一般存储到变量，方便使用。
- 在Python中，`input`会把接收到的**任意用户输入的数据都当做字符串处理**。

```python
password = input('请输入您的密码：')

print(f'您输入的密码是{password}')
# <class 'str'>
print(type(password))
```

## 4.输入单个数据实例

```python
price=input("请输入价格：")
price=float(price) #将输入的字符串形式的数据转换成浮点型，如：输入1.2  接到后是字符串，但是通过float类型转换即可以转换成浮点点数据
num = int(input("请输入数量："))#也可以这样来做，即把输入函数做为int类型转换的参数

```

### 5.输入多个数据实例

- 方法1

```python
#通过循环输入
a=[]
for i in range(3):
    a.append(int(input('请输入数据: '))) #将每次输入的数据转换成整型存放到列表中。
print(a)
```

- 方法2

```python
values = input("请输入多个值（以空格分隔）：")
result = list(map(int, values.split()))  #注意这里用了map函数，起到一个映射的作用，即把列表中的每一个元素都映射成整型。
print(result)
```



# 总结

- 输入功能
  - input('提示文字')
- 输入的特点
  - 一般将input接收的数据存储到变量
  - input接收的任何数据默认都是字符串数据类型

