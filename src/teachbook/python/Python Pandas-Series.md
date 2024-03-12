---
title: Python Pandas-Series
icon: fas fa-list
author: 周子力
order: 29
category:
  - 教学文档
tag:
  - Python
---
# Python Pandas-Series

## 1.pandas 简介

Pandas是一个强大的分析结构化数据的工具集；它的使用基础是Numpy（提供高性能的矩阵运算）；用于数据挖掘和数据分析，同时也提供数据清洗功能

利器之一：Series 它是一种类似于一维数组的对象，是由一组数据(各种NumPy数据类型)以及一组与之相关的数据标签(即索引)组成。仅由一组数据也可产生简单的Series对象。

利器之二：DataFrame DataFrame是Pandas中的一个表格型的数据结构，包含有一组有序的列，每列可以是不同的值类型(数值、字符串、布尔型等)，DataFrame即有行索引也有列索引，可以被看做是由Series组成的字典。

## 2.安装与引用

```python
#安装
pip install pandas
pip3 install pandas -i https://pypi.tuna.tsinghua.edu.cn/simple #通过清华镜像源

#引用 
import pandas as pd
```

## 3.主要数据结构-Series

要使用 pandas，你首先得熟悉它的两个主要数据结构：Series（一维数据）与DataFrame（二维数据），这两种数据结构足以处理金融、统计、社会科学、工程等领域里的大多数典型用例。首先，我们来看看什么是 Series。

### 3.1 Series

Series 是一种类似于 Numpy 中一维数组的对象，它由一组任意类型的数据以及一组与之相关的数据标签（即索引）组成。

实例：

```python
a1 = pd.Series([1, 2, 3, 4])
print(a1)  #左边的是数据的标签，默认从 0 开始依次递增。右边是对应的数据，最后一行表明了数据类型。
a2 = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])
print('a2: \n', a2)
a3 = pd.Series({
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4
})  #还可以直接使用字典同时创建带有自定义数据标签的数据，pandas 会自动把字典的键作为数据标签，字典的值作为相对应的数据
print('a3: \n', a3)
```

#### 3.1.1 Series创建

```python
import pandas as pd
# Series组成部分：pd.Series(data=None, index=None, dtype=None, name=None, copy=False, fastpath=False)
lst = [1,3,5,6,10,23]
s = pd.Series(lst) # 可以通过index指定索引，如果不指定索引，则会自动从0开始生成索引，我们叫做隐式索引


```

```python
lst = [1,3,5,6,10,23]
s = pd.Series(lst,index=["A","B","C","D","E","F"]) # 通过index设置显式索引
```

#### 3.1.2 numpy创建

```python
s = pd.Series(np.random.randint(1,10,size=(3,)),index=['a','b','c'])
s
```

#### 3.1.3 字典创建

```python
dic = {"A":1,"B":2,"C":3,"D":2}
s2 = pd.Series(dic)
s2
```

### 3.2 Series的索引和切片

因为Series只有一列，因此一般只对行进行操作，索引分为隐式索引和显示索引，因此不同的方式操作起来也不一样。

#### 3.2.1 Series隐式索引操作

```python
import pandas as pd
lst = [1,3,5,6,10,23]
s = pd.Series(lst)
print(s)
print(s[0])#取某一行，也可以说取某个元素
print(s[[0,2]])#取多行时，里面则是列表，可存储多个
print(s[0:2])#切片操作，取0-2行，但是只能取到0和1行，顾头不顾尾
print(s.iloc[0:2])#使用iloc来专门对隐式索引进行相关操作，也是只能取到0和1行，顾头不顾尾
print(s.iloc[[0,1]] )#使用iloc来专门对隐式索引进行相关操作，跟s[[0,1]]一样
```

#### 3.2.2 Series显示索引操作

```python
lst = [1,3,5,6,10,23]
s1 = pd.Series(lst,index=["A","B","C","D","E","F"])
print(s1["A"])# 取某行或单个元素
print(s1[["A","B"]])# 取多行，可以是连续的，也可以是不连续的
print(s1["A":"B"])# 切片，取A行和B行，这里的B行是可以取到的，头和尾都可以取到
print(s1.loc["A":"B"])# 使用loc来专门对显式索引进行相关操作，这里的B行也可以取到
print(s1.loc[["A","B"]])# 使用loc来专门对显式索引进行相关操作
```

**Series的索引和切片只针对行而言，因为它只有一列**

**loc是对于显式索引的相关操作(对于标签的处理)，iloc是针对隐式索引的相关操作(对于整数的处理)。**

### 3.3 Series的基本操作

- **s.head(n)** 该函数代表的意思是显示前多少行，可以指定显示的行数，不写n默认是前5行
- **s.tail(n)** 该函数代表的意思是显示后多少行，可以指定显示的行数，不写n默认是前5行

```python
lst = [1,3,5,6,10,23]
s1 = pd.Series(lst,index=["A","B","C","D","E","F"])
s1.head() #显示前5行
s1.tail() #显示后5行
```

- **s.unique()** 去重操作

```python
dic = {"A":1,"B":2,"C":3,"D":2}
s2 = pd.Series(dic)
s2.unique()#原s2并未修改，该结果返回的是一维数组
```

### 3.4 Series相加运算

**Series相加，会根据索引进行操作，索引相同则数值相加，索引不同则返回NaN**

NaN在pandas解释中为 not a number ,它是float类型，表示缺失数据，可以参与运算。

```python
# s1
lst = [1,3,5,6,10,23]
s1 = pd.Series(lst,index=["A","B","C","D","E","F"])
# s2
dic = {"A":1,"B":2,"C":3,"D":2}
s2 = pd.Series(dic)

s3 = s2+s1
print(s3)
```

### 3.5 Series缺失值操作

**查看Series中哪些是NaN**

二者都是判断是否为空，返回的结果为True或False

- **s.notnull()** 不为空返回True，为空返回False
- **s.isnull()** 不为空返回False，为空返回True

```python
# s1
lst = [1,3,5,6,10,23]
s1 = pd.Series(lst,index=["A","B","C","D","E","F"])
# s2
dic = {"A":1,"B":2,"C":3,"D":2}
s2 = pd.Series(dic)

s3 = s2+s1
s3.isnull()
s3.notnull()
```

