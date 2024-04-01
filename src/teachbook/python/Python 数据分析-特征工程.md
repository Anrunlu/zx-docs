---
title: Python 数据分析-特征工程
icon: fas fa-list
author: 周子力
order: 40
category:
  - 教学文档
tag:
  - Python
---
# Python 数据分析-特征工程

## 1.什么是特征工程

特征又叫属性，还叫维度等。是描述事物的一个角度。是计算机确定某个事物属于某一类的基础。而对特征进行处理是机器学习的重要一环。

## 2.为什么要进行特征工程

特征工程是将原始数据转换为更能代表预测模型的潜在问题的特征的过程，可以通过挑选最相关的特
征，提取特征以及创造特征来实现。其中创造特征又经常以降维算法的方式实现。
可能面对的问题有：特征之间有相关性，特征和标签无关，特征太多或太小，或者干脆就无法表现出应
有的数据现象或无法展示数据的真实面貌。
特征工程的目的：1) 降低计算成本，2) 提升模型上限

## 3.sklearn中的数据预处理与特征工程

[sklearn官网](https://scikit-learn.org/stable/)

![picture 0](https://oss.docs.z-xin.net/290ec7e684d193896ac7d27da7811ed65299564429f102f272d4a38b71f00568.png)  


里面有分类，回归，聚类，维归约，模型选择，预处理等功能。

## 4.数据无量纲化

着将不同规格的数据转换到同一规格，或不同分布的数据转换到某个特定分布 的需求，这种需求统称为将数据“无量纲化”。

譬如梯度和矩阵为核心的算法中，譬如逻辑回归，支持向量机，神经 网络，无量纲化可以加快求解速度；而在距离类模型，譬如K近邻，K-Means聚类中，无量纲化可以帮我们提升模型精度，避免某一个取值范围特别大的特征对距离计算造成影响。

数据的无量纲化可以是线性的，也可以是非线性的。线性的无量纲化包括**中心化**（Zero-centered或者Mean- subtraction）处理和**缩放处理**（Scale）。中心化的本质是让所有记录减去一个固定值，即让数据样本数据平移到某个位置。缩放的本质是通过除以一个固定值，将数据固定在某个范围之中，取对数也算是一种缩放处理。

当数据(x)按照最小值中心化后，再按极差（最大值 - 最小值）缩放，数据移动了最小值个单位，并且会被收敛到[0,1]之间，而这个过程，就叫做数据**归一化(Normalization，又称Min-Max Scaling)**。注意，Normalization是归一化，不是正则化，真正的正则化是regularization，不是数据预处理的一种手段。归一化之后的数据服从正态分布，公式:
$$
x^*=(x-min(x))/(max(x)-min(x))
$$


```py
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0,1)) # 指定缩放的特征范围是0,2 
data = [  # 每个样本三个特征  身高体重年龄  
    [180,75,25],
    [175,80,19],
    [159,50,40],
    [160, 60, 32]
]
result = scaler.fit_transform(data) # 根据数据计算缩放参数  返回缩放后的数据矩阵 
print(result)  # 更加适合算法模型 
```

当数据(x)按均值(μ)中心化后，再按标准差(σ)缩放，数据就会服从为均值为0，方差为1的正态分布（即标准正态分布），而这个过程，就叫做**数据标准化****(Standardization****，又称****Z-score normalization)**，公式如

下


$$
x^*={(x-u)}/\delta
$$

```py
from sklearn.preprocessing import StandardScaler as ss
# miyou  sigma 
scaler = ss()
result = scaler.fit_transform(data) # 根据数据计算均值和标准差 并将数据标准化均值为0 标准差为1 
print(result)
print(scaler.mean_)
print(scaler.var_)
```



大多数机器学习算法中，会选择StandardScaler来进行特征缩放，因为MinMaxScaler对异常值非常感。在PCA，聚类，逻辑回归，支持向量机，神经网络这些算法中，StandardScaler往往是最好的选择。

![picture 1](https://oss.docs.z-xin.net/7b3e9bcf2a951f461cf85f37927cfb565fcc5ba8af5cc213e9fbbf853df61cd8.png)  


## 5.缺失值

因此数据挖掘之中，常常会有重要的字段缺失值很多，但又不能舍弃字段的情况。因 此，数据预处理中非常重要的一项就是处理缺失值。

![picture 3](https://oss.docs.z-xin.net/540e029bcdba8f88a2863783185755e3838bf866f6b62bd6f00bee7afe389a1c.png)  


```py
from sklearn.impute import SimpleImputer
import numpy as np
data = [
    [1,2],
    [np.NAN,4],
    [9,1]
]
si = SimpleImputer(strategy='constant',fill_value=-1) # 默认均值 如果指定填充别的strategy=mean 
# strategy=median 中位数 
# strategy=most_frequent 众数 
# strategy=constant  fill_value = -11 常数
si.fit_transform(data) # 对数据进缺失值填充  根据指定的策略 填充数据的缺失值 
# 这里填充的是均值   
```

```
import pandas as pd
data = pd.read_csv(r"Narrativedata.csv",index_col=0)
data.head()
data.info()
#填补年龄
Age = data.loc[:,"Age"].values.reshape(-1,1) #sklearn当中特征矩阵必须是二维
Age[:20]
from sklearn.impute import SimpleImputer
imp_mean = SimpleImputer() #实例化，默认均值填补
imp_median = SimpleImputer(strategy="median") #用中位数填补
imp_0 = SimpleImputer(strategy="constant",fill_value=0) #用0填补
imp_mean = imp_mean.fit_transform(Age) #fit_transform一步完成调取结果
imp_median = imp_median.fit_transform(Age)
imp_0 = imp_0.fit_transform(Age)
imp_mean[:20]
imp_median[:20]
imp_0[:20] #在这里我们使用中位数填补Age
data.loc[:,"Age"] = imp_median
#使用众数填补Embarked
Embarked = data.loc[:,"Embarked"].values.reshape(-1,1)
imp_mode = SimpleImputer(strategy = "most_frequent")
data.loc[:,"Embarked"] = imp_mode.fit_transform(Embarked)
```



## 6.编码与哑变量

在机器学习中，大多数算法，譬如逻辑回归，支持向量机SVM，k近邻算法等都只能够处理数值型数据，不能处理文字，在sklearn当中，除了专用来处理文字的算法，其他算法在fit的时候全部要求输入数组或矩阵，也不能够导入文字型数据（其实手写决策树和普斯贝叶斯可以处理文字，但是sklearn中规定必须导入数值型）。然而在现实中，许多标签和特征在数据收集完毕的时候，都不是以数字来表现的。比如说，学历的取值可以是["小 学"，“初中”，“高中”，"大学"]，付费方式可能包含["支付宝"，“现金”，“微信”]等等。在这种情况下，为了让数据适 应算法和库，我们必须将数据进行编码，即是说，**将文字型数据转换为数值型**。

### 6.1 LableEncoder

标签专用，能够将分类转换为分类数值

```python
from sklearn.preprocessing import LabelEncoder
y = data.iloc[:,-1] #要输入的是标签，不是特征矩阵，所以允许一维

le = LabelEncoder() #实例化
le = le.fit(y) #导入数据
label = le.transform(y) #transform接口调取结果
le.classes_ #属性.classes_查看标签中究竟有多少类别
le.fit_transform(y) #也可以直接fit_transform一步到位
le.inverse_transform(label) #使用inverse_transform可以逆转
data.iloc[:,-1] = label #让标签等于我们运行出来的结果
#日常直接写：
from sklearn.preprocessing import LabelEncoder
data.iloc[:,-1] = LabelEncoder().fit_transform(data.iloc[:,-1])
data
```

### 6.2 OrdinalEncoder

特征专用，能够将分类特征转换为分类数值

```py
from sklearn.preprocessing import OrdinalEncoder
#接口categories_对应LabelEncoder的接口classes_，一模一样的功能
data_ = data.copy()
OrdinalEncoder().fit(data_.iloc[:,1:-1]).categories_
data_.iloc[:,1:-1] = OrdinalEncoder().fit_transform(data_.iloc[:,1:-1])
data_
```

### 6.3 OntHotEncoder

```py
data.head()
from sklearn.preprocessing import OneHotEncoder
X = data.iloc[:,1:-1]
enc = OneHotEncoder(categories='auto').fit(X)
result = enc.transform(X).toarray()
result
#依然可以直接一步到位，但为了给大家展示模型属性，所以还是写成了三步
OneHotEncoder(categories='auto').fit_transform(X).toarray()
#依然可以还原
pd.DataFrame(enc.inverse_transform(result))
enc.get_feature_names()
result
result.shape
#axis=1,表示跨行进行合并，也就是将量表左右相连，如果是axis=0，就是将量表上下相连
newdata = pd.concat([data,pd.DataFrame(result)],axis=1)
newdata.head()
newdata.drop(["Sex","Embarked"],axis=1,inplace=True)
newdata.columns =["Age","Survived","Female","Male","Embarked_C","Embarked_Q","Embarked_S"]
```

## 7.二值化与分段

根据阈值将数据二值化（将特征值设置为0或1），用于处理连续型变量。大于阈值的值映射为1，而小于或等于阈 值的值映射为0。默认阈值为0时，特征中所有的正值都映射到1。二值化是对文本计数数据的常见操作，分析人员 可以决定仅考虑某种现象的存在与否。它还可以用作考虑布尔随机变量的估计器的预处理步骤（例如，使用贝叶斯 设置中的伯努利分布建模）



```py
#Binarizer
data_2 = data.copy()
from sklearn.preprocessing import Binarizer
X = data_2.iloc[:,0].values.reshape(-1,1) #类为特征专用，所以不能使用一维数组
transformer = Binarizer(threshold=30).fit_transform(X)
transformer
```

```py
#KBinsDiscretizer
from sklearn.preprocessing import KBinsDiscretizer
X = data.iloc[:,0].values.reshape(-1,1)
est = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='uniform')
est.fit_transform(X)
#查看转换后分的箱：变成了一列中的三箱
set(est.fit_transform(X).ravel())
est = KBinsDiscretizer(n_bins=3, encode='onehot', strategy='uniform')
#查看转换后分的箱：变成了哑变量
est.fit_transform(X).toarray()

```

## 8.特征选择

| 特征提取                                                     | 特征创造                                                     | 特征选择                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 从文字，图像，声音等其他非结构化数据中提取新信息作为特征。比如说，从淘宝宝贝的名称中提取出产品类别，产品颜色，是否是网红产品等等。 | 把现有特征进行组合，或互相计算，得到新的特征。比如说，我们有一列特征是速度，一列特征是距离，我们就可以通过让两列相处，创造新的特征：通过距离所花的时间。 | 从所有的特征中，选择出有意义，对模型有帮助的特征，以避免必须将所有特征都导入模型去训练的情况。 |

在做特征选择之前，有三件非常重要的事：**跟数据提供者开会！跟数据提供者开会！跟数据提供者开会！**