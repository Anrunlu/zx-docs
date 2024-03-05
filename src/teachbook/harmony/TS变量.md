---
title: TS 变量
icon: fas fa-code
author: 周子力
order: 6
category:
  - 教学文档
tag:
  - HarmonyOS
  - TypeScript
---

# TS 变量

## 1.变量声明

变量的命名规则：\_、$, 不能以数字开头
包含字母、数字、
声名变量及初始值：

```typescript
let testname: string = "tom"; //该变量是string类型
```

如果不声明类型，则该变量可以是任意类型

```typescript
let testname = "tom"; //类型自动推断为字符串
```

声明变量没有设置类型和初始值，类型可以是任意类型，默认初始值为 undefined

```typescript
let testname;
testname = 1;
testname = "a";
```
