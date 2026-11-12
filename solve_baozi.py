#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""蓝桥杯「包子凑数」（买包子）：统计凑不出的正整数个数。

输入：第一行 N (1 <= N <= 100)，随后 N 个蒸笼容量 Ai (1 <= Ai <= 100)，
      按空白分隔，写成一行或多行均可。
输出：凑不出的正整数个数；若有无穷多个，输出 INF。

示例：
    2 4 5   -> 6
    2 4 6   -> INF

思路分三步：
    1. 先算所有容量的整体 gcd。g > 1 时任何组合都是 g 的倍数，
       非倍数有无穷多个，直接返回 INF，不进入动态规划。
    2. g = 1 时缺口有限。用完全背包求「能否恰好凑出 x」的布尔数组，
       内层 x 必须递增，这样同一种蒸笼可以被取用多笼。
    3. 取枚举上界 L = max(Ai)^2。设 m = min(Ai)，一旦出现连续 m 个
       可达整数，此后任意整数都能由其中某一个反复加 m 得到，
       只需统计这个窗口之前的不可达正整数。

L = max(Ai)^2 由「每个模 m 的余数类里最小可达数最多经过 m-1 条边、
每边权不超过 max(Ai)」推出；当 Ai <= 100 时 L <= 10000。
常见竞赛代码里直接写 10000，就是在这个约束下把 L 换成了常数。
"""

import sys
from functools import reduce
from math import gcd


def count_unreachable(capacities):
    """返回凑不出的正整数个数；若有无穷多个，返回字符串 'INF'。"""
    sizes = sorted(set(capacities))
    if not sizes or sizes[0] <= 0:
        raise ValueError("蒸笼容量必须是非空的正整数列表")

    # 第一步：裴蜀定理决定答案是否有限，必须放在建表之前。
    if reduce(gcd, sizes) > 1:
        return "INF"

    # 第二步：完全背包可达性，内层递增保证同一容量可重复使用。
    limit = sizes[-1] ** 2
    reachable = [False] * (limit + 1)
    reachable[0] = True
    for a in sizes:
        for x in range(a, limit + 1):
            if reachable[x - a]:
                reachable[x] = True

    # 第三步：找最早连续 m 个可达数，之后的整数不必再统计。
    m, run = sizes[0], 0
    for x in range(limit + 1):
        run = run + 1 if reachable[x] else 0
        if run == m:
            return sum(1 for t in range(1, x - m + 1) if not reachable[t])

    raise RuntimeError("上界不足：请增大 limit")


def main():
    data = list(map(int, sys.stdin.buffer.read().split()))
    if not data:
        return
    n = data[0]
    print(count_unreachable(data[1:1 + n]))


if __name__ == "__main__":
    main()
