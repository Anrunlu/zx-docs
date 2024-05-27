```python
import numpy as np
a=np.arange(10)
print(a)
```

    [0 1 2 3 4 5 6 7 8 9]



```python
#创建一维数组
b=np.array([1,2,3,4,5,6])
print(b)
```

    [1 2 3 4 5 6]



```python
#创建二维数组
a=np.array([[1,2,3],[4,5,6],[7,8,9]])
print(a)
```

    [[1 2 3]
     [4 5 6]
     [7 8 9]]



```python
#使用ndmin参数
a=np.array([1,2,3],ndmin=3)
print(a)
```

    [[[1 2 3]]]



```python
#使用dtype参数
a=np.array([1,2,3],dtype=np.float_)
print(a)
```

    [1. 2. 3.]



```python
#arange使用
x=np.arange(0,6,dtype=int)
print(x)
```

    [0 1 2 3 4 5]



```python
x=np.arange(10,20,2,dtype=float)
print(x)
```

    [10. 12. 14. 16. 18.]



```python
b=np.array([np.arange(1,4),np.arange(4,7),np.arange(7,10)])
print(b)
```

    [[1 2 3]
     [4 5 6]
     [7 8 9]]



```python
#随机数创建
x=np.random.random(size=4)
y=np.random.random(size=(3,4))
print(x)
print(y)
```

    [0.42575093 0.11247134 0.41307214 0.3480736 ]
    [[0.0322261  0.5847225  0.02359262 0.13097264]
     [0.49357049 0.85223376 0.69135899 0.30925978]
     [0.69135317 0.91255658 0.25044663 0.57732341]]



```python
#正态分布
x=np.random.randn()
print(x)
x=np.random.randn(2,4)
print(x)
x=np.random.randn(2,3,4)
print(x)
```

    0.15824600802379526
    [[ 0.4768509   0.24555094  0.7497621  -0.50347583]
     [-0.33740554 -0.73463468 -0.35245924  0.01175711]]
    [[[ 2.00230198  0.58590954  0.50424234  1.4680439 ]
      [-0.8460381  -1.56813899  0.07987284  0.72444417]
      [-0.59357343  0.29859105 -1.29339262 -1.4218689 ]]
    
     [[-0.73485158  0.22024444 -1.16606213  0.59380885]
      [-2.28993068  0.36090519 -0.54448719  1.86579072]
      [ 1.7452549   0.5924936  -0.21758878  0.02779147]]]



```python
#指定期望和方差的正态分布
print(np.random.normal(loc=3,scale=4,size=(2,2,3))) #loc表示期望，scale表示方差
```

    [[[ 4.25683694  7.64163979  5.15254376]
      [ 2.82962654  3.98698176  8.14676925]]
    
     [[-1.77015166  3.92924767 -2.70721887]
      [ 2.77026444  8.16203482  5.89282347]]]



```python
x=np.zeros(5)
print(x)
x=np.zeros((5),dtype=int)
print(x)
x=np.zeros((2,5))
print(x)
```

    [0. 0. 0. 0. 0.]
    [0 0 0 0 0]
    [[0. 0. 0. 0. 0.]
     [0. 0. 0. 0. 0.]]



```python
x=np.ones(5)
print(x)
y=np.ones((3,4),dtype=int)
print(y)
z = np.ones_like(y)
print(z)
```

    [1. 1. 1. 1. 1.]
    [[1 1 1 1]
     [1 1 1 1]
     [1 1 1 1]]
    [[1 1 1 1]
     [1 1 1 1]
     [1 1 1 1]]



```python
x=np.arange(10)
print(x)
print(x[:-2])
print(x[-2:])
print(x[2:7:2])
```

    [0 1 2 3 4 5 6 7 8 9]
    [0 1 2 3 4 5 6 7]
    [8 9]
    [2 4 6]



```python
x=np.arange(12)
a=x.reshape(3,4)
print(a)
# print(a[1])
# print(a[1][2])
# print(a[:,1])
# print(a[:-1,1])

print(a[:2,:2])
```

    [[ 0  1  2  3]
     [ 4  5  6  7]
     [ 8  9 10 11]]
    [[0 1]
     [4 5]]



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

    int64
    (2, 3)
    6
    [[1 4]
     [2 5]
     [3 6]]
    <numpy.flatiter object at 0x3407340>
    1
    2
    3
    4
    5
    6



```python
a = np.array([[1,2,3],[4,5,6]])
print(a.reshape(3,2))
print(a.ravel())#返回一维数组
print(a.resize(3,2))#功能与reshape相同，但是会改变a形状

```

    [[1 2]
     [3 4]
     [5 6]]
    [1 2 3 4 5 6]



```python
a = np.arange(36).reshape(6,6)
print(a)
np.hsplit(a,3)
```

    [[ 0  1  2  3  4  5]
     [ 6  7  8  9 10 11]
     [12 13 14 15 16 17]
     [18 19 20 21 22 23]
     [24 25 26 27 28 29]
     [30 31 32 33 34 35]]





    [array([[ 0,  1],
            [ 6,  7],
            [12, 13],
            [18, 19],
            [24, 25],
            [30, 31]]),
     array([[ 2,  3],
            [ 8,  9],
            [14, 15],
            [20, 21],
            [26, 27],
            [32, 33]]),
     array([[ 4,  5],
            [10, 11],
            [16, 17],
            [22, 23],
            [28, 29],
            [34, 35]])]




```python
a = np.arange(27).reshape(3,3,3)
print(a)
np.dsplit(a,3) 
```

    [[[ 0  1  2]
      [ 3  4  5]
      [ 6  7  8]]
    
     [[ 9 10 11]
      [12 13 14]
      [15 16 17]]
    
     [[18 19 20]
      [21 22 23]
      [24 25 26]]]





    [array([[[ 0],
             [ 3],
             [ 6]],
     
            [[ 9],
             [12],
             [15]],
     
            [[18],
             [21],
             [24]]]),
     array([[[ 1],
             [ 4],
             [ 7]],
     
            [[10],
             [13],
             [16]],
     
            [[19],
             [22],
             [25]]]),
     array([[[ 2],
             [ 5],
             [ 8]],
     
            [[11],
             [14],
             [17]],
     
            [[20],
             [23],
             [26]]])]




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

    [[0. 1.]
     [2. 3.]]
    [[4. 5.]
     [6. 7.]]
    [[2. 3.]
     [4. 5.]]
    [[0.         0.2       ]
     [0.33333333 0.42857143]]
    False
    [[ True  True]
     [False False]]



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

    6.0
    0.0
    1.5
    3.0
    0.0
    [[1. 1.]
     [2. 2.]]
    1.25
    1.118033988749895
    3.0
    0
    3
    (array([1]), array([0]))
    [[1.]
     [1.]]
    [[      -inf 0.        ]
     [0.69314718 1.09861229]]


    /tmp/ipykernel_1747369/1422306437.py:15: RuntimeWarning: divide by zero encountered in log
      print(np.log(a))



```python
a=np.arange(9).reshape(3,3)
b=np.arange(9,18).reshape(3,3)
np.hstack((a,b))
np.vstack((a,b))
np.dstack((a,b))
```




    array([[[ 0,  9],
            [ 1, 10],
            [ 2, 11]],
    
           [[ 3, 12],
            [ 4, 13],
            [ 5, 14]],
    
           [[ 6, 15],
            [ 7, 16],
            [ 8, 17]]])


