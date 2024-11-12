---
title: 跳跃游戏II(leetcode45)
icon: fas fa-layer-group
author: 顾兆林
order: 6
category:
  - 教学文档
tag:
- 贪心
- 动态规划
---

### 题目描述

给定一个长度为 `n` 的 0 索引整数数组 `nums`。初始位置为 `nums[0]`。

每个元素 `nums[i]` 表示从索引 `i` 向前跳转的最大长度。换句话说，如果你在 `nums[i]` 处，你可以跳转到任意 `nums[i + j]` 处，其中满足以下条件：

- `0 <= j <= nums[i]`
- `i + j < n`

返回到达 `nums[n - 1]` 的最小跳跃次数。题目保证生成的测试用例可以到达 `nums[n - 1]`。
### 示例

#### 示例 1

- **输入**: `nums = [2, 3, 1, 1, 4]`
- **输出**: `2`
- **解释**: 跳到最后一个位置的最小跳跃数是 `2`。
  - 从下标为 `0` 跳到下标为 `1`，跳 `1` 步
  - 再跳 `3` 步到达数组的最后一个位置

#### 示例 2

- **输入**: `nums = [2, 3, 0, 1, 4]`
- **输出**: `2`

### 题解
该题是跳跃游戏题目的修改版，在跳跃游戏中，我们需要判断是否能够到达数组的最后一个位置，而在跳跃游戏 II 中，我们需要计算到达数组的最后一个位置所需的最小跳跃次数。
我们首先回忆一下解决跳跃游戏的思想：

- 从数组的第一个位置开始，我们维护一个变量 `max_position`，表示当前能够到达的最远位置。
- 遍历数组，对于每个位置 `i`，我们更新 `max_position`，即 `max_position = max(max_position, i + nums[i])`。

**代码如下**

```python
from typing import List

class Solution:
    def canJump(self, nums: List[int]) -> bool:
        max_position = 0
        for index, num in enumerate(nums):
            if index > max_position:
                return False
            max_position = max(max_position, index + num)
            if max_position >= len(nums) - 1:
                return True
```

对应于跳跃游戏 II，我们需要计算到达数组的最后一个位置所需的最小跳跃次数。我们可以使用贪心算法来解决这个问题。

我们的贪心策略为：在当前位置的跳跃边界范围内，选择能够跳到的最远位置。

**为什么可以使用贪心算法呢？**
因为在每一步中，我们都选择在当前范围内能够跳到的最远位置，这样可以保证在最少的跳跃次数内到达终点。
由于问题保证一定可以达到这种吞吐量的最后一个位置，所以贪心策略是可行的。

**代码如下**

```python
from typing import List
class Solution:
    def jump(self, nums: List[int]) -> int:
        jumps = 0          # 跳跃次数
        current_end = 0    # 当前跳跃的边界
        max_reach = 0      # 能够到达的最远位置

        for i in range(len(nums) - 1):  # 不需要遍历最后一个元素
            max_reach = max(max_reach, i + nums[i])  # 更新能够到达的最远位置
            if i == current_end:
                jumps += 1
                current_end = max_reach  # 更新当前跳跃的边界
                # 如果已经可以到达或超过最后一个位置，直接返回结果
                if current_end >= len(nums) - 1:
                    break
        return jumps

```
在这段代码中，我们使用了两个变量 `jumps` 和 `current_end` 来记录跳跃次数和当前跳跃的边界。通过遍历数组，我们更新能够到达的最远位置 `max_reach`，并在到达当前跳跃的边界时更新跳跃次数和当前跳跃的边界。当能够到达或超过最后一个位置时，直接返回结果。