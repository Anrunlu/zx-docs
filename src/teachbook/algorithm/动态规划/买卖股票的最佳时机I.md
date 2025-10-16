---
title: 买卖股票的最佳时机I
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
[买卖股票的最佳时机I题意理解](https://d.zxin.confnew.com/1a414e30-26b7-4dca-a88f-6afe08bd9c90.mp4)

[买卖股票的最佳时机I题目分析](https://d.zxin.confnew.com/5ebb7ba5-c024-410f-bb44-df0a68fa5d6f.mp4)

[买卖股票的最佳时机I思路梳理](https://d.zxin.confnew.com/e7b5e684-fabd-4a9e-a553-bcea72509e68.mp4)



# 股票买卖最大利润问题的注意事项与启发

## 编写代码时的关键注意事项

### 1. **边界条件处理**
```python
# 错误示例：未处理边界情况
def maxProfit_wrong(prices):
    min_price = prices[0]  # 如果 prices 为空会报错
    # ...

# 正确做法
def maxProfit_correct(prices):
    if not prices or len(prices) < 2:
        return 0
    # ...
```
- **空数组**：`prices = []`
- **单元素数组**：`prices = [5]`（无法买卖）
- **两个元素**：需要正确处理

### 2. **初始化值的选择**
```python
# 不好的初始化
min_price = 0  # 如果所有价格都 > 0，这会导致错误

# 正确的初始化
min_price = prices[0]  # 或者 float('inf')
max_profit = 0        # 因为题目要求不能获利时返回0
```

### 3. **更新顺序的重要性**
```python
# 错误的更新顺序
for price in prices:
    max_profit = max(max_profit, price - min_price)
    min_price = min(min_price, price)  # 这里会导致用当天的价格计算利润

# 正确的更新顺序
for price in prices:
    min_price = min(min_price, price)      # 先更新最低价
    max_profit = max(max_profit, price - min_price)  # 再计算利润
```

### 4. **理解"未来"的含义**
- 买入必须在卖出**之前**
- 不能用当天的最低价去计算当天的利润（除非允许同天买卖，但题目明确说"不同的日子"）

### 5. **数据类型考虑**
```python
# 题目中示例2写的是 [7.6,4,3,1]，但实际应该是整数
# 需要确认输入数据类型，但算法对浮点数同样适用
```

## 深层启发与思考

### 1. **动态规划的本质理解**
这个问题展示了动态规划的核心思想：
- **状态定义**：不是直接求答案，而是定义中间状态
- **状态转移**：当前状态只依赖于之前的状态
- **最优子结构**：全局最优解包含局部最优解

### 2. **从复杂到简单的思维过程**
- **暴力解法**：O(n²) - 对每个买入点找最佳卖出点
- **动态规划**：O(n)空间 - 记录每个位置的最优状态  
- **空间优化**：O(1)空间 - 发现只需要维护关键变量

这种**逐步优化**的思维方式在算法设计中非常重要。

### 3. **贪心与动态规划的关系**
```python
# 贪心思想：总是用历史最低价买入，当前价格卖出
# 动态规划：系统地维护状态转移

# 实际上，这里的贪心策略是动态规划的空间优化版本
```
很多看似贪心的问题，背后都有动态规划的影子。

### 4. **通用解题模板**
这类"找最大差值，且有顺序约束"的问题可以抽象为：
```python
min_val = initial_value
max_diff = 0
for current_val in sequence:
    min_val = min(min_val, current_val)
    max_diff = max(max_diff, current_val - min_val)
```

### 5. **扩展思考**
这个问题是股票买卖系列的基础：
- **只能交易一次**：本题
- **可以交易多次**：累加所有上升段
- **最多交易k次**：需要更复杂的DP状态
- **有冷却期/手续费**：状态定义更复杂

掌握基础版本有助于解决更复杂的变化。

### 6. **实际应用价值**
- **算法面试**：高频题目，考察基础DP思想
- **实际场景**：类似"找最大增长区间"的问题
- **思维训练**：培养状态定义和转移的直觉

### 7. **调试技巧**
当算法出错时，可以用小例子手动跟踪：
```python
prices = [7, 1, 5, 3, 6, 4]
# 手动记录每一步的 min_price 和 max_profit
# day0: min=7, profit=0
# day1: min=1, profit=0  
# day2: min=1, profit=4
# day3: min=1, profit=4
# day4: min=1, profit=5
# day5: min=1, profit=5
```

## 总结

这个问题看似简单，但包含了算法设计的多个重要原则：
1. **边界条件**永远是第一要考虑的
2. **状态定义**比直接求解更重要  
3. **空间优化**往往能带来代码简洁性
4. **理解本质**比记住代码更重要

在实际编码中，建议先写出清晰的动态规划版本，再考虑优化，这样既能保证正确性，又能体现完整的思考过程。



