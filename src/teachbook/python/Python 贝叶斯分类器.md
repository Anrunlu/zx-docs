---
title: Python 贝叶斯分类器
icon: fas fa-list
author: 周子力
order: 42
category:
  - 教学文档
tag:
  - Python
---

# Python 贝叶斯分类器

## 1.什么是贝叶斯分类器？

贝叶斯分类器是一个统计分类器。它们能够预测类别所属的概率，如：一个数据对象属于某个类别的概率。贝叶斯分类器是基于贝叶斯定理而构造出来的。对分类方法进行比较的有关研究结果表明：简单贝叶斯分类器（称为基本贝叶斯分类器）在分类性能上与决策树和神经网络都是可比的。在处理大规模数据库时，贝叶斯分类器已表现出较高的分类准确性和运算性能。基本贝叶斯分类器假设一个指定类别中各属性的取值是相互独立的。这一假设也被称为：类别条件独立，它可以帮助有效减少在构造贝叶斯分类器时所需要进行的计算。

朴素贝叶斯（`Naive Bayes`）算法是一种基于概率论和贝叶斯定理的分类算法。它的核心思想是，对于给定的数据集，通过先验概率和条件概率计算出每个类别的后验概率，然后将样本分配给具有最大后验概率的类别。

朴素贝叶斯算法有多种变体，其中最常见的包括 `高斯朴素贝叶斯`、`多项式朴素贝叶斯` 和 `伯努利朴素贝叶斯` 等。它们之间的区别主要在于 `特征的类型` 和 `概率密度函数` 的不同。

朴素贝叶斯算法的优点是模型简单、易于实现、计算效率高，适用于高维度、大规模数据集的分类问题。缺点是其假设特征之间相互独立并不总是成立，在一些实际应用中效果可能不佳。

## 2.基本概念

- 先验概率（`Prior Probability`）：在考虑新数据之前，我们对已有数据的某些性质的预先概率估计，也就是我们在考虑数据集中每个类别的情况之前已经知道这些类别的概率。
- 条件概率（`Conditional Probability`）：在已知某个事件发生的前提下，另一个事件发生的概率。在分类问题中，条件概率表示某个样本在给定类别下的概率。
- 后验概率（`Posterior Probability`）：在观察到新数据之后，更新先验概率的概率分布，也就是我们在看到新数据后，重新计算类别的概率。
- 全概率公式（`Law of Total Probability`）：用来计算在所有可能的情况下某个事件的概率，也就是在所有情况下某个事件发生的概率之和。
- 贝叶斯公式（`Bayes' Theorem`）：用来计算在已知先验概率和条件概率的情况下，计算后验概率的公式。也就是在给定某个条件下，计算另一个条件的概率。
- 极大似然估计（`Maximum Likelihood Estimation`）：用来估计模型参数的方法，即在给定观测数据的情况下，寻找使得该数据出现概率最大的参数。在分类问题中，极大似然估计可以用来估计条件概率分布。



## 3.贝叶斯定理

p(A|B) 条件概率 表示在B发生的前提下，A发生的概率；
$$
P(A/C)=\frac {P(C/A)P(A)}{P(C)}
$$
基本贝叶斯分类器通常都假设各类别是相互独立的，即各属性的取值是相互独立的。对于特定的类别且其各属性相互独立，就会有：

 P(AB|C) = P(A|C)*P(B|C)

对于一个新的样本 `x` ，我们需要计算其属于每个类别的后验概率，并将其分类到具有最大后验概率的类别中：
$$
\widehat{y}=argmaxP(y/X)
$$
其中，带帽子的y  是样本 `x` 的预测类别，`Y` 是所有可能的类别集合，`X` 是样本的特征向量。根据朴素贝叶斯的假设，特征之间是相互独立的，因此可以将条件概率 `P(X|y)` 表示为每个特征的条件概率的乘积：
$$
P(X/y)=P(x_1/y)P(x_2/y)...P(x_n/y)
$$
根据贝叶斯定理，可以将后验概率 `P(y|X)` 表示为先验概率 `P(y)` 和条件概率 `P(X|y)` 的乘积除以边缘概率 `P(X)`：
$$
P(y/X)=\frac{P(X/y)P(y)}{P(X)}
$$
因为我们只需要比较后验概率的大小而不需要具体的数值，所以可以省略分母P(X)。因此，可以将朴素贝叶斯分类器的预测公式表示为：
$$
\widehat{y}=argmaxP(y)\prod_{i=1}^{n}P(x_i/y)
$$
其中，P(y)是类别 `y` 在数据集中的先验概率，P(xi/y)是在给定类别 `y` 的条件下样本 `x` 的第 `i` 个特征的条件概率。这些概率可以通过数据集的统计信息进行估计。

## 4.算法实现

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.naive_bayes import GaussianNB
import matplotlib

# 生成所有测试样本点
def make_meshgrid(x, y, h=.02):
    x_min, x_max = x.min() - 1, x.max() + 1
    y_min, y_max = y.min() - 1, y.max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),np.arange(y_min, y_max, h))
    return xx, yy

# 对测试样本进行预测，并显示
def plot_test_results(ax, clf, xx, yy, **params):
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    #画等高线
    ax.contourf(xx, yy, Z, **params)

# 载入iris数据集
iris = datasets.load_iris()
# 只使用前面两个个特征
X = iris.data[:, :2]
# 样本标签值
y = iris.target

# 创建并训练正态朴素贝叶斯分类器
clf = GaussianNB()
clf.fit(X,y)

title = ('GaussianBayesClassifier')

fig, ax = plt.subplots(figsize = (5, 5))
plt.subplots_adjust(wspace=0.4, hspace=0.4)

#分别取出两个特征
X0, X1 = X[:, 0], X[:, 1]
# 生成所有测试样本点
xx, yy = make_meshgrid(X0, X1)

# 显示测试样本的分类结果
plot_test_results(ax, clf, xx, yy, cmap=plt.cm.coolwarm, alpha=0.8)
# 显示训练样本
ax.scatter(X0, X1, c=y, cmap=plt.cm.coolwarm, s=20, edgecolors='k')
ax.set_xlim(xx.min(), xx.max())
ax.set_ylim(yy.min(), yy.max())
ax.set_xlabel('x1')
ax.set_ylabel('x2')
ax.set_xticks(())
ax.set_yticks(())
ax.set_title(title)
plt.show()


```

