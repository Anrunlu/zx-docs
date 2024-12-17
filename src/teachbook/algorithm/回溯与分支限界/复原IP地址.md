---
title: 复原IP地址
icon: fa-server
author: 程琬茵
order: 7
category:
  - 教学文档
tag:
  - 回溯与分支限界-dfs
---


# 复原IP地址
## 1. 题目描述

有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。

给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

  **示例 1:**
> 输入：s = "25525511135"
> 
> 输出：["255.255.11.135","255.255.111.35"]

**示例 2:**
>
> 输入: s = "0000"
>
> 输出: ["0.0.0.0"]

**示例 3:**
>
> 输入: s = "101023"
>
> 输出: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

**提示：**
- 1 <= s.length <= 20

- s 仅由数字组成



## 2. 分析

**step1分割字符串：** 将字符串 s 分割成四部分，每部分代表 IP 地址的一个段。

**step2验证每段的有效性：**
- 每段必须是一个数字，且数值在 0 到 255 之间。
- 如果一个段有多位数字，它不能以 0 开头（即不能有前导零），除非该段本身就是 0。

**step3回溯过程：**
- 从字符串的起始位置开始，尝试将前1到3位数字作为第一段，然后递归地处理剩余的字符串，继续分割成剩余的三段。
- 在每一步，如果当前段无效，则回溯并尝试下一种可能。
- 当成功分割成四段且整个字符串被完全使用时，将这个组合加入结果集。

**剪枝优化：**
- 长度限制： IP 地址总长度最小为4（"0.0.0.0"），最大为12（"255.255.255.255"）。因此，如果字符串长度小于4或大于12，直接返回空列表。
- 提前终止： 在递归过程中，如果剩余的字符数不足以填满剩余的段，或者剩余字符数过多，也可以提前终止当前路径的搜索。

## 3. 代码
```java
import java.util.ArrayList;
import java.util.List;

public class RestoreIPAddresses {
    public List<String> restoreIpAddresses(String s) {
        List<String> result = new ArrayList<>();
        // 剪枝：IP地址最小长度4，最大长度12
        if (s.length() < 4 || s.length() > 12) {
            return result;
        }
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }

    // 回溯
    private void backtrack(String s, int start, List<String> segments, List<String> result) {
        // 如果已经分割出4段
        if (segments.size() == 4) {
            // 如果所有字符都被使用，加入结果
            if (start == s.length()) {
                result.add(String.join(".", segments));
            }
            return;
        }

        // 每段最多3位
        for (int len = 1; len <= 3; len++) {
            // 剪枝：剩余字符不够填满或过多
            if (start + len > s.length()) {
                break;
            }
            // 获取当前段
            String segment = s.substring(start, start + len);
            // 验证当前段是否有效
            if (isValid(segment)) {
                segments.add(segment);
                // 继续递归处理剩余部分
                backtrack(s, start + len, segments, result);
                // 回溯，移除最后一段
                segments.remove(segments.size() - 1);
            }
        }
    }

    // 验证IP地址是否有效
    private boolean isValid(String segment) {
        // 以0开头且长度大于1，非法
        if (segment.length() > 1 && segment.startsWith("0")) {
            return false;
        }
        // 转换为整数并检查范围
        int val = Integer.parseInt(segment);
        return val >= 0 && val <= 255;
    }

    public static void main(String[] args) {
        RestoreIPAddresses solver = new RestoreIPAddresses();
        String[] testCases = {"25525511135", "0000", "101023"};
        for (String s : testCases) {
            List<String> ips = solver.restoreIpAddresses(s);
            System.out.println("输入: \"" + s + "\"");
            System.out.println("输出: " + ips);
            System.out.println();
        }
    }
}
```
