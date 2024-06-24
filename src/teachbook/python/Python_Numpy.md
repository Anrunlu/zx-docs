---
title: Python Numpy
icon: fas fa-list
author: 周子力
order: 27
category:
  - 教学文档
tag:
  - Python
---
# Python-Numpy

## 1.Numpy简介

Numpy(Numerical Python) 是科学计算基础库，提供大量科学计算相关功能，比如数据统计，随机数生成等。其提供最核心类型为多维数组类型（ndarray），支持大量的维度数组与矩阵运算，Numpy支持向量处理ndarray对象，提高程序运算速度。
[官方文档](https://www.numpy.org.cn/reference/)

## 2.安装

安装 NumPy 最简单的方法就是使用 pip 工具，语法格式如下：

```python
pip install numpy #
pip3 install numpy -i https://pypi.tuna.tsinghua.edu.cn/simple #通过清华镜像源
```

简单应用实例

```python
import numpy as np
a=np.arange(10)
print(a)
```

涉及numpy模块中的一个arange函数，该函数可以传入一个整数类型的参数n，函数返回值看着像一个列表，其实返回值类型是numpy.ndarray。这是Numpy中特有的数组类型。如果传入arange函数的参数值是n，那么arange函数会返回0到n-1的ndarray类型的数组。

## 3.array创建数组

numpy模块的array函数可以生成多维数组。例如，如果要生成一个二维数组，需要向array函数传递一个列表类型的参数。每一个列表元素是一维的ndarray类型数组，作为二维数组的行。另外，通过ndarray类的shape属性可以获得数组每一维的元素个数（元组形式），也可以通过shape[n]形式获得每一维的元素个数，其中n是维度，从0开始。

![picture 4](https://oss.docs.z-xin.net/90e3540f1913273de8ff1ddf0363fd178252ef393049703b00a286b643a15c8e.png)  


```python
numpy.array(object, dtype = None, copy =
True, order = None, subok = False, ndmin = 0)
```

![picture 2](https://oss.docs.z-xin.net/3bdcee7e3935b505a3eb677fffeed9d56e79868c112920f4d27f815e57817afb.png)  


```python
#创建一维数组
b=np.array([1,2,3,4,5,6])
print(b)
```

```python
#创建二维数组
a=np.array([[1,2,3],[4,5,6],[7,8,9]])
print(a)

#使用ndmin参数
a=np.array([1,2,3],ndmin=3)
print(a)

#使用dtype参数
a=np.array([1,2,3],dtype=np.float_)
print(a)

#arange使用
x=np.arange(0,6,dtype=int)
print(x)

x=np.arange(10,20,2,dtype=float)
print(x)

b=np.array([np.arange(1,4),np.arange(4,7),np.arange(7,10)])
print(b)

#随机数创建
x=np.random.random(size=4)
y=np.random.random(size=(3,4))
print(x)
print(y)

#正态分布
x=np.random.randn()
print(x)
x=np.random.randn(2,4)
print(x)
x=np.random.randn(2,3,4)
print(x)

#指定期望和方差的正态分布
print(np.random.normal(loc=3,scale=4,size=(2,2,3))) #loc表示期望，scale表示方差



```

## 4.zeros创建

创建指定大小的数组，数组元素以 0 来填充

```python
numpy.zeros(shape, dtype = float, order ='C')
```

```python
x=np.zeros(5)
print(x)
x=np.zeros((5),dtype=int)
print(x)
x=np.zeros((2,5))
print(x)
```

## 5.ones创建

创建指定形状的数组，数组元素以 1 来填充。

```python
numpy.ones(shape, dtype = None, order = 'C')
```

```python
x=np.ones(5)
print(x)
y=np.ones((3,4),dtype=int)
print(y)
z = np.ones_like(y)
```

## 6.数组的属性

```python
a = np.array([[1,2,3],[4,5,6]])
print(a.dtype)
print(a.shape)
print(a.size)
print(a.T)
print(a.flat)
for item in a.flat:
    print(item)

```

## 7.改变数组维度

```python
a = np.array([[1,2,3],[4,5,6]])
print(a.reshape(3,2))
print(a.ravel())#返回一维数组
print(a.resize(3,2))#功能与reshape相同，但是会改变a形状
```

## 8.一维数组索引与切片

ndarray 数组可以基于 0 - n 的下标进行索引，并设置 start, stop及 step 参数进行，从原数组中切割出一个新数组。

```python
x=np.arange(10)
print(x)
print(x[2])
print(x[2:])
print(x[2:7:2]) 
print(x[:-2])
print(x[-2:])
```

## 9.二维数组索引与切片

![picture 5](https://oss.docs.z-xin.net/b121e8efb5795417eb5fb0c2401bbf7752887a7b00b3e4ff32f5619b1ff11750.png)  


```python
x=np.arange(12)
a=x.reshape(3,4)
print(a)
print(a[1])
print(a[1][2])
print(a[:,1])
print(a[:-1,1])
print(a[:2,:2])
```



## 10.数组的合并

```python
a=np.arange(9).reshape(3,3)
b=np.arange(9,18).reshape(3,3)
np.hstack((a,b))
np.vstack((a,b))
np.dstack((a,b))
```



## 11.数组的拆分

- 水平拆分

```python
a = np.arange(36).reshape(6,6)
print(a)
np.hsplit(a,3)
```

- 垂直拆分

```python
a = np.arange(36).reshape(6,6)
print(a)
np.vsplit(a,3)
```

- 深度拆分

```
a = np.arange(27).reshape(3,3,3)
np.dsplit(a,3) 
```

## 12.数组运算

```python
a=np.arange(4,dtype=np.float_).reshape(2,2)
b=np.arange(4,8,dtype=np.float_).reshape(2,2)
print(a)
print(b)
print(a+2)
print(a/b)
print((a==b).all())
print(a<2)
```

## 

## 13.统计函数

```python
a=np.arange(4,dtype=np.float_).reshape(2,2)
print(a.sum())
print(a.prod())
print(a.mean())
print(a.max())
print(a.min())
print(a.clip(1,2))#小于等于1的元素替换为1，大于2的元素替换为2
print(a.var())
print(a.std())
print(a.ptp())
print(a.argmin())
print(a.argmax())
print(np.where(a==2))
print(np.diff(a))
print(np.log(a))
```

