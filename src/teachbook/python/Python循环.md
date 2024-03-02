---
title: Python循环
icon: fas fa-list
author: 周子力
order: 15
category:
  - 教学文档
tag:
  - Python
---
# Python循环

## 1.什么是循环？

循环是指在满足一定条件的情况下，重复做一类事情。在Python语言中有while  和 for 两类循环。

## 2. while语法【重点】

``` python
while 条件:
    条件成立重复执行的代码1
    条件成立重复执行的代码2
    ......
```

### 2.1 快速体验

需求：复现重复执行10次`print('我要学习！！！')`。

分析：初始值是0次，终点是10次，重复做的事情 ： print("我要学习！！！")

``` python
# 循环的计数器
i = 0
while i < 5:
    print('我要学习！！！')
    i += 1

print('任务结束')
```

## 3. while实例

#### 3.1 应用一：计算1-100累加和

分析：1-100的累加和，即1 + 2 + 3 + 4 +….，即前两个数字的相加结果 + 下一个数字( 前一个数字 + 1)。

``` python
i = 1
result = 0
while i <= 100:
    result += i
    i += 1

# 输出5050
print(result)
```

> 注意：为了验证程序的准确性，可以先改小数值，验证结果正确后，再改成1-100做累加。

#### 3.2 应用二：计算1-100偶数累加和

分析：1-100的偶数和，即 2 + 4 + 6 + 8....，得到偶数的方法如下：

- 偶数即是和2取余结果为0的数字，可以加入条件语句判断是否为偶数，为偶数则累加
- 初始值为0 / 2 , 计数器每次累加2

##### 3.2.1 方法一：条件判断和2取余数则累加

``` python
# 方法一：条件判断和2取余数为0则累加计算
i = 1
result = 0
while i <= 100:
    if i % 2 == 0:
        result += i
    i += 1

# 输出2550
print(result)
```

##### 3.2.2 方法二：计数器控制

``` python
# 方法二：计数器控制增量为2
i = 0
result = 0
while i <= 100:
    result += i
    i += 2

# 输出2550
print(result)
```

## 4.break和continue

break和continue是循环中满足一定条件退出循环的两种不同方式。continue是退出本次循环，也就是说这一次循环不做了，开始进行下一次循环。break是退出整个循环，也就是说后续的循环都不做了。

#### 4.1.1 情况一：break

``` python
i = 1
while i <= 5:
    if i == 4:
        print(f'吃饱了不吃了')
        break
    print(f'吃了第{i}个苹果')
    i += 1
```

#### 4.1.2 情况二：continue

``` python
i = 1
while i <= 5:
    if i == 3:
        print(f'大虫子，第{i}个不吃了')
        # 在continue之前一定要修改计数器，否则会陷入死循环
        i += 1
        continue
    print(f'吃了第{i}个苹果')
    i += 1
```

## 5.while循环嵌套【重点】

### 5.1 语法

``` python
while 条件1:
    条件1成立执行的代码
    ......
    while 条件2:
        条件2成立执行的代码
        ......
```

> 总结：所谓while循环嵌套，就是一个while里面嵌套一个while的写法，每个while和之前的基础语法是相同的。

### 5.3 快速体验：复现场景

#### 5.3.1 代码

``` python
#老师每次进教室，学生就念3篇单词
j = 0
while j < 3:
    print('进教室一次')
    i = 0
    while i < 3:
        print('读单词')
        i += 1
    j += 1
```

## 6.while循环嵌套应用【难点】

### 6.1 应用一：打印星号(正方形)

#### 6.1.1 需求

``` html
*****
*****
*****
*****
*****
```

#### 6.1.2 代码

分析：一行输出5个星号，重复打印5行

``` python
# 重复打印5行星星
j = 0
while j <= 4:
    # 一行星星的打印
    i = 0
    while i <= 4:
        # 一行内的星星不能换行，取消print默认结束符\n
        print('*', end='')
        i += 1
    # 每行结束要换行，这里借助一个空的print，利用print默认结束符换行
    print()
    j += 1
```

### 6.2 应用二：打印星号(三角形)

#### 6.2.1 需求

``` html
*
**
***
****
*****
```

#### 6.2.2 代码

分析：==一行输出星星的个数和行号是相等的==，每行：重复打印行号数字个星号，将打印行星号的命令重复执行5次实现打印5行。

``` python
# 重复打印5行星星
# j表示行号
j = 0
while j <= 4:
    # 一行星星的打印
    i = 0
    # i表示每行里面星星的个数，这个数字要和行号相等所以i要和j联动
    while i <= j:
        print('*', end='')
        i += 1
    print()
    j += 1
```

### 6.3 九九乘法表

#### 6.3.1 执行结果
![picture 0](https://oss.docs.z-xin.net/f2d96715ab5275d0480a1f9adc17ecbc8a4c5e408b87e2f130270bf0ecabd452.png)  

#### 6.3.2 代码

``` python
# 重复打印9行表达式
j = 1
while j <= 9:
    # 打印一行里面的表达式 a * b = a*b
    i = 1
    while i <= j:
        print(f'{i}*{j}={j*i}', end='\t')
        i += 1
    print()
    j += 1
```

## 7.for循环

### 7.1 语法

``` python
for 临时变量 in 序列:
    重复执行的代码1
    重复执行的代码2
    ......
```

### 7.2 快速体验

``` python
str1 = 'itheima'
for i in str1:
    print(i)
```

### 7.3 break

``` python
str1 = 'itheima'
for i in str1:
    if i == 'e':
        print('遇到e不打印')
        break
    print(i)
```

### 7.4 continue

```python
str1 = 'itheima'
for i in str1:
    if i == 'e':
        print('遇到e不打印')
        continue
    print(i)
```

## 8. else

循环可以和else配合使用，else下方缩进的代码指的是"当循环正常结束之后要执行的代码"。

## 8.1 while...else

### 8.1.1 语法

``` python
while 条件:
    条件成立重复执行的代码
else:
    循环正常结束之后要执行的代码
```

### 8.1.2 示例

``` python
i = 1
while i <= 5:
    print('读单词')
    i += 1
else:
    print('读单词完成')
```

### 8.1.3 退出循环的方式

1. break

``` python
i = 1
while i <= 5:
    if i == 3:
        print('没有读单词')
        break
    print('读单词')
    i += 1
else:
    print('读单词完成')
```

2. continue

``` python
i = 1
while i <= 5:
    if i == 3:
        print('没有读单词')
        i += 1
        continue
    print('读单词')
    i += 1
else:
    print('读单词完成')
```

### 8.2 for...else

#### 8.2.1 语法

``` python
for 临时变量 in 序列:
    重复执行的代码
    ...
else:
    循环正常结束之后要执行的代码
```

> 所谓else指的是循环正常结束之后要执行的代码，即如果是break终止循环的情况，else下方缩进的代码将不执行。

#### 8.2.2 示例

``` python
str1 = 'itheima'
for i in str1:
    print(i)
else:
    print('循环正常结束之后执行的代码')
```

#### 8.2.3 退出循环的方式

1. break终止循环

``` python
str1 = 'itheima'
for i in str1:
    if i == 'e':
        print('遇到e不打印')
        break
    print(i)
else:
    print('循环正常结束之后执行的代码')
```

> 没有执行else缩进的代码。

2. continue控制循环

``` python
str1 = 'itheima'
for i in str1:
    if i == 'e':
        print('遇到e不打印')
        continue
    print(i)
else:
    print('循环正常结束之后执行的代码')
```

> 因为continue是退出当前一次循环，继续下一次循环，所以该循环在continue控制下是可以正常结束的，当循环结束后，则执行了else缩进的代码。



# 总结

- 循环的作用：控制代码重复执行
- while语法

``` python
while 条件:
    条件成立重复执行的代码1
    条件成立重复执行的代码2
    ......
```

- while循环嵌套语法

```python
while 条件1:
    条件1成立执行的代码
    ......
    while 条件2:
        条件2成立执行的代码
        ......
```

- for循环语法

``` python
for 临时变量 in 序列:
    重复执行的代码1
    重复执行的代码2
    ......
```

- break退出整个循环
- continue退出本次循环，继续执行下一次重复执行的代码
- else
  - while和for都可以配合else使用
  - else下方缩进的代码含义：当循环正常结束后执行的代码
  - break终止循环不会执行else下方缩进的代码
  - continue退出循环的方式执行else下方缩进的代码