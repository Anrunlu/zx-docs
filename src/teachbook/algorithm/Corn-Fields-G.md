---
title: [USACO06NOV] Corn Fields G
icon: fas fa-cow
author: 刘喆
order: 6
category:
  - 教学文档
tag:
- 动态规划
- 状态压缩动态规划
---

# [USACO06NOV] Corn Fields G

## 题目描述

Farmer John has purchased a lush new rectangular pasture composed of M by N (1 ≤ M ≤ 12; 1 ≤ N ≤ 12) square parcels. He wants to grow some yummy corn for the cows on a number of squares. Regrettably, some of the squares are infertile and can't be planted. Canny FJ knows that the cows dislike eating close to each other, so when choosing which squares to plant, he avoids choosing squares that are adjacent; no two chosen squares share an edge. He has not yet made the final choice as to which squares to plant.

Being a very open-minded man, Farmer John wants to consider all possible options for how to choose the squares for planting. He is so open-minded that he considers choosing no squares as a valid option! Please help Farmer John determine the number of ways he can choose the squares to plant.

农场主 $\rm John$ 新买了一块长方形的新牧场，这块牧场被划分成 $M$ 行 $N$ 列 $(1 \le M \le 12; 1 \le  N \le 12)$，每一格都是一块正方形的土地。 $\rm John$ 打算在牧场上的某几格里种上美味的草，供他的奶牛们享用。

遗憾的是，有些土地相当贫瘠，不能用来种草。并且，奶牛们喜欢独占一块草地的感觉，于是 $\rm John$ 不会选择两块相邻的土地，也就是说，没有哪两块草地有公共边。

$\rm John$ 想知道，如果不考虑草地的总块数，那么，一共有多少种种植方案可供他选择？（当然，把新牧场完全荒废也是一种方案）

## 输入格式

第一行：两个整数 $M$ 和 $N$，用空格隔开。

第 $2$ 到第 $M+1$ 行：每行包含 $N$ 个用空格隔开的整数，描述了每块土地的状态。第 $i+1$ 行描述了第 $i$ 行的土地，所有整数均为 $0$ 或 $1$ ，是 $1$ 的话，表示这块土地足够肥沃，$0$ 则表示这块土地不适合种草。

## 输出格式

一个整数，即牧场分配总方案数除以 $100,000,000$ 的余数。

## 样例 #1

### 样例输入 #1

```
2 3
1 1 1
0 1 0
```

### 样例输出 #1

```
9
```

# 题解

这题状态很复杂，因为我们的状态要表示整个农场，考虑使用状压DP来搞（

首先，我们可以用一个二进制数来表示每一行的选取情况，比如说 $1010$ 表示第 $1$ 列和第 $3$ 列被选中了。这样，我们就可以用一个 $m$ 行的二进制数来表示整个矩阵的选取情况。

接下来，我们需要判断一个二进制数是否合法。一个二进制数合法，当且仅当它的每一位都为 $0$ 或者一位1和它的左右两位都为 $0$。我们可以用一个 $2^{2n}$ 的数组 $check$ 来预处理每一个二进制数是否合法。

我们用 $f_{i,j}$ 表示前 $i$ 行，第 $i$ 行的选取情况为 $j$ 的方案数。我们可以用 $map_i$ 来表示第 $i$ 行允许摆放的二进制状态，然后枚举第 $i$ 行的选取情况 $j$，判断 $j$ 是否合法，以及 $j$ 是否与第 $i$ 行的二进制数 $map_i$ 相容。如果 $j$ 合法且与 $map_i$相容，如果没啥问题，那么我们就可以枚举前一行的选取情况 $k$，如果 $k$ 与 $j$ 不冲突，那么就可以转移 fij 。

状态转移方程如下：

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><msub><mi>f</mi><mrow><mi>i</mi><mo>,</mo><mi>j</mi></mrow></msub><mo>=</mo><msub><mi>f</mi><mrow><mi>i</mi><mo>,</mo><mi>j</mi></mrow></msub><mo>+</mo><msub><mi>f</mi><mrow><mi>i</mi><mo>−</mo><mn>1</mn><mo>,</mo><mi>k</mi></mrow></msub></math>

最后，我们只需要将 $f_{m,i}$ 的所有值相加，就可以得到答案。~~不要忘了取模哦（~~

# Java 代码

```java
import java.util.*;

public class Main {

    static final int maxn = 50, mod = 100000000;
    static int n, m;
    static int f[][] = new int[maxn][1 << 15], map[] = new int[maxn];
    static boolean check[] = new boolean[1 << 15];

    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        m = sc.nextInt();
        n = sc.nextInt();

        for (int y = 1; y <= m; y++)
            for (int x = 1, num; x <= n; x++) {
                num = sc.nextInt(); // 读入矩阵中的每个格子的值
                map[y] = (map[y] << 1) + num; // 将每一行的值转换为二进制状态
            }

        // 预处理每个二进制状态是否合法（只看行）
        for (int i = 0; i < (1 << n); i++)
            check[i] = (i & (i << 1)) == 0 && (i & (i >> 1)) == 0;

        f[0][0] = 1; // 初始化第一行的方案数
        for (int i = 1; i <= m; i++)
            for (int j = 0; j < (1 << n); j++)
                if (check[j] && (map[i] & j) == j) // 判断当前行的选取情况是否合法
                    for (int k = 0; k < (1 << n); k++)
                        if ((k & j) == 0) { // 判断当前行的选取情况是否与上一行的选取情况冲突
                            f[i][j] += f[i - 1][k]; // 更新方案数
                            f[i][j] %= mod;
                        }

        int ans = 0;
        for (int i = 0; i < (1 << n); i++) {
            ans += f[m][i]; // 统计最后一行的方案数
            ans %= mod;
        }
        System.out.println(ans); // 输出答案
    }
}
```

# end
