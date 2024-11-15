---
title: 买卖股票的最佳时机
icon: fas fa-layer-group
author: 周子力
order: 20
category:
  - 教学文档
tag:
  - 动态规划
---

# 买卖股票的最佳时机
## 1. 题目描述
给定一个数组 prices ，它的第 i 个元素 prices [i]表示一支给定股票第 i 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润,
返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回0。

示例 1:
输入:[7,1,5,3,6,4]
输出:5
解释:在第 2 天(股票价格 = 1)的时候买入，在第5 天(股票价格 = 6)的时候卖出，最大利润 = 6-1 =5。
注意利润不能是 7-1 =6，因为卖出价格需要大于买入价格;同时，你不能在买入前卖出股票。

示例 2:
输入:prices =[7.6,4,3,1]
输出:0
解释:在这种情况下，没有交易完成，所以最大利润为0。
 
## 2. 分析
  用动态规划法

  （1）找问题的子问题
  该问题的子问题就是数组的长短，比如：原问题是：[7,1,5,3,6,4],子问题可以是：[7,1,5]，[7,1,5,3]等。

  假设dp[i]表示具有i个元素(也就是i天）的数组的最大利润，那么dp[i-1]表示 共i-1天的数组的最大利润。
  接下来就是要考虑 dp[i]和dp[i-1]之间的递推关系。

  （2）子问题间的递推关系

  对于i天 i-1天 不同的地方是，i天的数据多了第i天的数据，这个数据应该与前面最小值的差，需要与dp[i-1]比大小，把最大值保存下来。

  因此，可以写出递推式：
  dp[i]=max(dp[i-1],price[i]-minprice)

  注意：这里的第i个元素之间的元素的最小值是minprice。

  （3）自底向上求解问题

  这里的底就是从第1个元素开始遍历整个数组，因为递归关系是dp[i-1]推出dp[i], 可以从i=1时，即dp[0] 得到dp[1], dp[1]得到dp[2],...,一直得到dp[n]

  思路梳理：
  （1）该功能函数的输入是数组prices

  （2）创建一个全为0的dp数组，用以存储每天的最大利润,需要计算minPrice, 一开始可以赋值为prices[0]

  （3）遍历整个prices数组，逐个计算最大利润，

       dp[i]=max(dp[i-1],price[i]-minPrice)

   (4) 返回dp中的最后一个元素 dp[-1]



## 3. 代码
```python
#动态规划
def maxProfit(prices):
        n = len(prices)
        if n == 0: return 0 # 边界条件
        dp = [0] * n
        minprice = prices[0] 
        for i in range(1, n):
            minprice = min(minprice, prices[i])
            dp[i] = max(dp[i - 1], prices[i] - minprice)

        return dp[-1]
price=[7,1,5,3,6,4]
price1=[7,6,4,3,1]
print(maxProfit(price),maxProfit(price1))
```

```python
#一次遍历
def maxProfit( prices):
        minprice = float('inf')
        maxprofit = 0
        for price in prices:
            minprice = min(minprice, price)
            maxprofit = max(maxprofit, price - minprice)
        return maxprofit
price=[7,1,5,3,6,4]
price1=[7,6,4,3,1]
print(maxProfit(price),maxProfit(price1))
```
## 4. 视频
[买卖股票的最佳时机I题意理解](https://cyberdownload.anrunlu.net/1a414e30-26b7-4dca-a88f-6afe08bd9c90.mp4)

[买卖股票的最佳时机I题目分析](https://cyberdownload.anrunlu.net/5ebb7ba5-c024-410f-bb44-df0a68fa5d6f.mp4)

[买卖股票的最佳时机I思路梳理](https://cyberdownload.anrunlu.net/e7b5e684-fabd-4a9e-a553-bcea72509e68.mp4)
