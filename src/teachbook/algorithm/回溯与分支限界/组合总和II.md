---
title: 组合总和II
icon: fas fa-beer
author: 周子力
order: 1
category:
  - 教学文档
tag:
  - 回溯法
---

## 题目描述
![picture 0](https://oss.docs.z-xin.net/013634469e18f2c7d53f3e7f5c7feaee5eba5ed668cdb87931f551a8be91d4d3.png)  


## 求解思路

1. **排序预处理**：首先对候选数组进行排序，这样可以：
   - 便于跳过重复元素
   - 可以在当前数字已经大于剩余目标值时提前剪枝

2. **回溯搜索**：
   - 对于每个位置，我们有两种选择：选择当前数字或跳过当前数字
   - 使用 `start` 参数控制起始位置，确保每个数字只使用一次
   - 当剩余目标值为 0 时，找到一个有效解

3. **去重策略**：
   - 由于数组已排序，重复的数字会相邻
   - 在同一层递归中，如果当前数字与前一个数字相同，且前一个数字没有被选择（即在同一层被跳过），那么当前数字也应该跳过，避免产生重复组合

4. **剪枝优化**：
   - 如果当前数字大于剩余目标值，可以直接跳出循环（因为数组已排序，后续数字更大）

## Python 代码实现

```python
def combinationSum2(candidates, target):
    """
    找出 candidates 中所有可以使数字和为 target 的组合
    candidates 中的每个数字在每个组合中只能使用一次
    解集不能包含重复的组合
    
    Args:
        candidates: List[int] - 候选人编号集合
       目标数
    
    Returns:
        List[List[int]] - 所有满足条件的组合
    """
    # 预处理：排序
    candidates.sort()
    result = []
    path = []
    
    def backtrack(start, remaining_target):
        # 基础情况：找到有效解
        if remaining_target == 0:
            result.append(path[:])  # 注意要复制当前路径
            return
        
        # 递归回溯
        for i in range(start, len(candidates)):
            # 剪枝：当前数字太大，后续数字更大，直接跳出
            if candidates[i] > remaining_target:
                break
            
            # 去重：在同一层递归中跳过重复的数字
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            
            # 选择当前数字
            path.append(candidates[i])
            # 递归搜索，下一个位置开始，目标值减少
            backtrack(i + 1, remaining_target - candidates[i])
            # 回溯：撤销选择
            path.pop()
    
    backtrack(0, target)
    return result


# 测试用例
if __name__ == "__main__":
    # 示例 1
    candidates1 = [10, 1, 2, 7, 6, 1, 5]
    target1 = 8
    print("示例 1:")
    print(f"输入: candidates = {candidates1}, target = {target1}")
    print(f"输出: {combinationSum2(candidates1, target1)}")
    print()
    
    # 示例 2
    candidates2 = [2, 5, 2, 1, 2]
    target2 = 5
    print("示例 2:")
    print(f"输入: candidates = {candidates2}, target = {target2}")
    print(f"输出: {combinationSum2(candidates2, target2)}")
```

## 算法复杂度分析

- **时间复杂度**：O(2^n)，最坏情况下需要遍历所有可能的子集
- **空间复杂度**：O(target)，递归栈的深度最多为 target（当所有数字都是 1 时）

## 关键点说明

1. **排序的重要性**：排序不仅帮助剪枝，更重要的是让重复元素相邻，便于去重处理

2. **去重条件**：`i > start and candidates[i] == candidates[i - 1]`
   - `i > start` 确保我们是在同一层递归中（不是深层递归）
   - 这样可以避免 `[1,1,6]` 出现多次，但允许同一个组合中使用多个相同的数字（如果它们原本就存在）

3. **回溯模板**：
   - 选择元素 → 递归 → 撤销选择
   - 使用 `path[:]` 进行深拷贝，避免引用问题

这个解法能够正确处理重复元素，确保每个组合只出现一次，并且每个数字在每个组合中只使用一次。