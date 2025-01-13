---
title: 旅行商问题（TSP）
icon: fas fa-beer
author: 侯小月，杜玉玉
order: 1
category:
  - 教学文档
tag:
  - 回溯与分支限界-dfs

---

# 旅行商问题（TSP）
## 1. 题目描述

旅行商需要访问n个城市并返回出发点，要求访问每个城市恰好一次，且总行程最短。

输入：

城市之间的距离矩阵

输出：

最短路径和对应的总距离。

样例输入：
distances = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]
样例输出：

80

## 2. 分析

分支限界法通过建立一个候选解的树，然后按照某种顺序搜索树中的所有节点，并使用上界来剪枝。

## 3. 代码

```python
import heapq

def tsp(distances):
    def bound(node, n, visited, curr_weight):
        size = len(visited)
        if size == n:
            return curr_weight + distances[visited[-1]][0]
        max_dist = 0
        for i in range(n):
            if i not in visited:
                max_dist = max(max_dist, distances[node][i])
        return curr_weight + max_dist

    def tsp_helper(node, n, visited, curr_weight):
        if len(visited) == n:
            return curr_weight + distances[visited[-1]][0]
        max_q = []
        for i in range(n):
            if i not in visited:
                curr_bound = bound(i, n, visited + [i], curr_weight + distances[node][i])
                heapq.heappush(max_q, (-curr_bound, i, visited + [i], curr_weight + distances[node][i]))
        best_result = float('inf')
        while max_q:
            _, node, visited, curr_weight = heapq.heappop(max_q)
            result = tsp_helper(node, n, visited, curr_weight)
            if result < best_result:
                best_result = result
        return best_result

    best_cost = float('inf')
    n = len(distances)
    visited = [0]
    result = tsp_helper(0, n, visited, 0)
    return result

# 测试代码
distances = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]
print(tsp(distances))
```
