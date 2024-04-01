---
title: Python ROC曲线
icon: fas fa-list
author: 周子力
order: 39
category:
  - 教学文档
tag:
  - Python
---

# Python 数据分析-ROC曲线

# 1.什么是ROC曲线

ROC的全称是“**受试者工作特征**”（Receiver Operating Characteristic）曲线， 首先是由二战中的电子工程师和雷达工程师发明的，用来侦测战场上的敌军载具（飞机、船舰），也就是**信号检测理论**。之后很快就被引入了**心理学**来进行信号的知觉检测。此后被引入**机器学习领域**，用来评判分类、检测结果的好坏。因此，ROC曲线是非常重要和常见的统计分析方法。

根据学习器的预测结果对样例进行排序，按此顺序逐个把样本作为正例进行预测，每次计算出两个重要量的值（TPR、FPR），分别以它们为横、纵坐标作图。

## 2.混淆矩阵

![picture 0](https://oss.docs.z-xin.net/eb3f491ecb6e355569e0c60586a96a3433d4beaf122bb8ef45c42eae0a89911e.png)  


- 真正率：

$$
 TPR=\frac{TP}{(TP+FN)}
$$

- 假正率：

$$
FPR=\frac{FP}{FP+TN}
$$

## 3.ROC曲线绘制

根据每个测试样本属于正样本的概率值**从大到小排序**。

下图是一个示例，图中共有20个测试样本，“Class”一栏表示每个测试样本真正的标签（p表示正样本，n表示负样本），“Score”表示每个测试样本属于正样本的概率

![picture 1](https://oss.docs.z-xin.net/07f707211b92a85b253e9eebe28385dca490b7fbf0bb79950577667b6281fee3.png)  


**举例来说**，对于图中的第4个样本，其“Score”值为0.6，那么样本1，2，3，4都被认为是正样本，因为它们的“Score”值都大于等于0.6，而其他样本则都认为是负样本。 每次选取一个不同的threshold，我们就可以得到一组FPR和TPR，即ROC曲线上的一点。这样一来，我们一共得到了20组FPR和TPR的值，将它们画在ROC曲线的结果如下图：

![picture 2](https://oss.docs.z-xin.net/048ac1e752a98cc954562a2b8614347d82efe0a87a5d8887e13b11f6ee93655c.png)  








## 参考

https://zhuanlan.zhihu.com/p/671929916