---
title: 买卖股票的最佳时机II
icon: fas fa-layer-group
author: 周子力
order: 20
category:
  - 教学文档
tag:
  - 动态规划
---

## 题目描述

![picture 1](https://oss.docs.z-xin.net/5183eb4ba406e6e8845798ffba9bc1bb5d0204a306695e9382735779cc3541c6.png)  



## 动态规划思路

我们定义两个状态：

- `dp[i][0]` 表示第 `i` 天结束时，**不持有股票**的最大利润
- `dp[i][1]` 表示第 `i` 天结束时，**持有股票**的最大利润

状态转移方程：

1. **第 i 天不持有股票**：
   - 可能是前一天就不持有：`dp[i-1][0]`
   - 可能是前一天持有，今天卖出：`dp[i-1][1] + prices[i]`
   - `dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])`

2. **第 i 天持有股票**：
   - 可能是前一天就持有：`dp[i-1][1]`
   - 可能是前一天不持有，今天买入：`dp[i-1][0] - prices[i]`
   - `dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])`

---

## 初始状态

- `dp[0][0] = 0`（第0天不持有股票，利润为0）
- `dp[0][1] = -prices[0]`（第0天持有股票，说明买入了，利润为 `-prices[0]`）

---

## 最终结果

最后一天不持有股票肯定比持有股票利润高，所以返回 `dp[n-1][0]`

---

## Python 代码（动态规划）

```python
def maxProfit(prices):
    if not prices:
        return 0
    
    n = len(prices)
    dp = [[0] * 2 for _ in range(n)]
    
    # 初始状态
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    
    for i in range(1, n):
        # 今天不持有股票 = max(昨天不持有, 昨天持有今天卖出)
        dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
        # 今天持有股票 = max(昨天持有, 昨天不持有今天买入)
        dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
    
    return dp[n-1][0]
```

---

## 空间优化版

由于第 i 天的状态只依赖于第 i-1 天的状态，我们可以用两个变量代替整个 dp 数组：

```python
def maxProfit(prices):
    if not prices:
        return 0
    
    n = len(prices)
    # 初始化
    hold = -prices[0]    # 持有股票的最大利润
    cash = 0             # 不持有股票的最大利润
    
    for i in range(1, n):
        # 先保存旧状态
        prev_hold = hold
        prev_cash = cash
        
        # 更新状态
        cash = max(prev_cash, prev_hold + prices[i])
        hold = max(prev_hold, prev_cash - prices[i])
    
    return cash
```

---

## 测试

```python
print(maxProfit([7,1,5,3,6,4]))  # 输出 7
print(maxProfit([1,2,3,4,5]))    # 输出 4
print(maxProfit([7,6,4,3,1]))    # 输出 0
```

---

## 总结

- **贪心法**更简单直观，直接累加所有上涨的差价
- **动态规划**更通用，可以扩展到更复杂的股票买卖问题（如含手续费、冷冻期等）
- 对于本题，两种方法结果一致，但贪心法效率更高（O(n) 时间，O(1) 空间）