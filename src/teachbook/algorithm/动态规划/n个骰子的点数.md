---
title: n个骰子的点数
icon: fas fa-m
author: 付可心
order: 12
category:
  - 教学文档
tag:
  - 动态规划-dfs
---

## n个骰子的点数
### 题目描述 
把 n 个骰子扔在地上，所有骰子朝上一面的点数之和为 s。输入 n，打印出 s 的所有可能的值出现的概率。
你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。 
###  输入格式
```cpp
请输入一个数n，n表示骰子的数量。 
```
###  输出格式
```cpp
输出所有可能的骰子点数出现概率，每个概率以此向下排列，直至每个情况都被列出。
```
### 输入样例
```cpp
请输入骰子的数量：3
```
### 输出样例
 
```cpp
骰子点数和为 3 到 18 的概率分别为：
点数和为 3 的概率：0.004630
点数和为 4 的概率：0.013889
点数和为 5 的概率：0.027778
点数和为 6 的概率：0.046296
点数和为 7 的概率：0.069444
点数和为 8 的概率：0.097222
点数和为 9 的概率：0.115741
点数和为 10 的概率：0.125000
点数和为 11 的概率：0.125000
点数和为 12 的概率：0.115741
点数和为 13 的概率：0.097222
点数和为 14 的概率：0.069444
点数和为 15 的概率：0.046296
点数和为 16 的概率：0.027778
点数和为 17 的概率：0.013889
点数和为 18 的概率：0.004630
点数和为 19 的概率：0.000000
点数和为 20 的概率：0.000000
点数和为 21 的概率：0.000000
```



### 解题思路
这个问题可以通过动态规划来解决。我们定义一个二维数组dp[i][j]，其中dp[i][j]表示扔i个骰子，总点数为j的概率。由于每个骰子的点数范围是1到6，所以j的范围是i到6*i。
初始化时，dp[1][1] = dp[1][2] = ... = dp[1][6] = 1/6，因为扔一个骰子得到每个点数的概率都是1/6。
对于i > 1的情况，我们可以通过以下状态转移方程来计算dp[i][j]： dp[i][j] = dp[i-1][j-1] + dp[i-1][j-2] + ... + dp[i-1][j-6]，其中j >= i。
最后，我们需要计算所有可能的点数出现的概率，并将它们存储在一个浮点数数组中，数组的第i个元素代表点数i出现的概率。

### 代码实现
```cpp
//n个骰子的点数
import java.util.Scanner;

public class DiceProbability {
    public static double[] getProbability(int n) {
        double[][] dp = new double[n + 1][6 * n + 1];
        double[] result = new double[6 * n + 1];

        // 初始化
        for (int j = 1; j <= 6; j++) {
            dp[1][j] = 1.0 / 6;
        }

        // 动态规划计算
        for (int i = 2; i <= n; i++) {
            for (int j = i; j <= 6 * i; j++) {
                for (int k = 1; k <= 6; k++) {
                    if (j - k >= i - 1) {
                        dp[i][j] += dp[i - 1][j - k];
                    }
                }
                dp[i][j] /= 6;
            }
        }

        // 计算每个点数出现的概率
        for (int j = n; j <= 6 * n; j++) {
            result[j - n] = dp[n][j];
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入骰子的数量n：");
        int n = scanner.nextInt();
        scanner.close();

        double[] probabilities = getProbability(n);
        System.out.println("骰子点数和为 " + n + " 到 " + (6 * n) + " 的概率分别为：");
        for (int i = 0; i < probabilities.length; i++) {
            System.out.printf("点数和为 %d 的概率：%.6f\n", i + n, probabilities[i]);
        }
    }
}
```