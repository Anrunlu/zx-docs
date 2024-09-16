---
title: 数组中第k个最大元素
icon: fas fa-maxcdn
author: 程琬茵
order: 7
category:
  - 教学文档
tag:
  - 分治法
---

# 数组中第k个最大元素
## 1. 题目描述

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。
你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

>  **示例 1:**
>
> 输入: [3,2,1,5,6,4], k = 2
> 
> 输出: 5
>
> 解释：返回数组中第2个最大元素，即5


> **示例 2:**
>
> 输入: [3,2,3,1,2,4,5,5,6], k = 4
>
> 输出: 4

## 2. 分析

### 2.1 题目分析

> 题目要求我们在一个整数数组 `nums` 中找到排序后的**第 `k` 个最大的元素**。

分治法的基本思想是将一个复杂问题划分为多个相似的小问题，逐步解决这些子问题，最后将结果合并。针对本题，我们可以将数组划分成两部分，然后递归地解决一部分问题，直到找到第 `k` 个最大的元素。

### 2.2 实现过程

1. **选择一个基准数（pivot）**
2. **划分数组**：将数组根据基准值划分为两部分：
   - **左部分**：大于基准值的元素。
   - **右部分**：小于等于基准值的元素。
3. **确定第 `k` 大元素的位置**：
   - 计算基准值的位置 `pivot_index`，即基准值在排序后的数组中的位置。
   - 比较`pivot_index`和`k`：
     - 如果 `pivot_index` 等于 `k-1`，则基准值就是第 `k` 大的元素。
     - 如果 `pivot_index` 大于 `k-1`，说明第 `k` 大的元素在左边部分，递归在左半部分寻找。
     - 如果 `pivot_index` 小于 `k-1`，说明第 `k` 大的元素在右边部分，递归在右半部分寻找。

### 2.3 示例分析

**示例 1：**

输入：`nums = [3, 2, 1, 5, 6, 4]`，`k = 2`

1. 选择一个基准值（假设选择 `4`）。
2. 将数组划分为两部分：
   - 左部分 `[5, 6]`（大于 `4` 的元素）。
   - 右部分 `[3, 2, 1]`（小于等于 `4` 的元素）。
3. 基准值 `4` 的位置是 `pivot_index = 2`，而我们需要第 `k = 2` 大的元素，因此继续在左部分 `[5, 6]` 寻找。
4. 递归调用，选择基准值（假设选择`5`），将其划分为：左部分 `[6]`，右部分 `[]`。
5. 基准值 `5` 的位置是 `pivot_index = 1`，正好是我们需要的第 2 大的元素。

输出：`5`

**示例 2：**

输入：`nums = [3, 2, 3, 1, 2, 4, 5, 5, 6]`，`k = 4`

1. 选择一个基准值（假设选择 `4`）。
2. 划分为：
   - 左部分 `[6, 5, 5]`。
   - 右部分 `[3, 2, 3, 1, 2]`。
3. 基准值 `4` 的位置是 `pivot_index = 3`，正好是第 4 大的元素。

输出：`4`

## 3. 代码
```cpp
// 分区，将数组根据基准值划分成两部分
int partition(vector<int>& nums, int left, int right, int pivot_index) {
    int pivot_value = nums[pivot_index];
    // 将基准值移到右边界
    swap(nums[pivot_index], nums[right]);

    int store_index = left;

    // 将所有大于基准值的元素移到左侧
    for (int i = left; i < right; ++i) {
        if (nums[i] > pivot_value) {
            swap(nums[store_index], nums[i]);
            store_index++;
        }
    }

    // 把基准值移到它的最终位置
    swap(nums[right], nums[store_index]);
    return store_index;
}
```

``` cpp
// 分治法，递归查找第 k 小的元素
int quickselect(vector<int>& nums, int left, int right, int k_smallest) {
    if (left == right) {
        return nums[left];  // 只有一个元素时直接返回
    }

    // 固定基准值为数组中间位置
    int pivot_index = left + (right - left) / 2;

    // 找到基准值的最终位置
    pivot_index = partition(nums, left, right, pivot_index);

    // 判断基准值的位置是否等于目标位置
    if (k_smallest == pivot_index) {
        return nums[k_smallest];
    } else if (k_smallest < pivot_index) {
        // 递归左边部分
        return quickselect(nums, left, pivot_index - 1, k_smallest);
    } else {
        // 递归右边部分
        return quickselect(nums, pivot_index + 1, right, k_smallest);
    }
}
```

