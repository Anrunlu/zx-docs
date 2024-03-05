---
title: TS 概述
icon: iconfont icon-a-outline-harmony-one
author: 周子力
order: 4
category:
  - 教学文档
tag:
  - HarmonyOS
  - TypeScript
---

# TS 概述

## 1.为什么学习 TypeScript？

鸿蒙开发用的语言是 ArkTS，即盘古 TS，因为如果不掌握 TS 是没有办法学习 ArkTS 的。

## 2.什么是 TypeScript？

TypeScript（简称 TS）是微软公司开发的一种基于 JavaScript （简称 JS）语言的编程语言。TypeScript 可以看成是 JavaScript 的超集（superset），即它继承了后者的全部语法，所有 JavaScript 脚本都可以当作 TypeScript 脚本（但是可能会报错），此外它还增加了一些自己的语法。

[Typescript 官网](https://www.typescriptlang.org/)

## 3.TypeScript 的特性

从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。

JavaScript 是一门非常灵活的编程语言：

- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值。

TypeScript 是静态类型

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型

## 4.一个 TypeScript 的例子

```typescript
function sayHello(person: string) {
  return "Hello, " + person;
}

let user = "Tom";
console.log(sayHello(user));
```

## 5.TypeScript Playground

最简单的 TypeScript 使用方法，就是使用官网的在线编译页面，叫做 [TypeScript Playground](http://www.typescriptlang.org/play/)。

只要打开这个网页，把 TypeScript 代码贴进文本框，它就会在当前页面自动编译出 JavaScript 代码，还可以在浏览器执行编译产物。如果编译报错，它也会给出详细的报错信息。

这个页面还具有支持完整的 IDE 支持，可以自动语法提示。此外，它支持把代码片段和编译器设置保存成 URL，分享给他人。
