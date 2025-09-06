---
title: ArkUI-简介
icon: iconfont icon-a-outline-harmony-one
author: 周子力
order: 17
category:
  - 教学文档
tag:
  - HarmonyOS
  - TypeScript
---

# ArkUI简介

ArkUI（方舟UI框架）为应用的UI开发提供了完整的基础设施，包括简洁的UI语法、丰富的UI功能（组件、布局、动画以及交互事件），以及实时界面预览工具等，可以支持开发者进行可视化界面开发。

## 基本概念
- UI： 即用户界面。开发者可以将应用的用户界面设计为多个功能页面NavDestination，页面通过栈结构管理，并通过导航容器Navigation完成页面间的调度管理如跳转、回退等操作，以实现应用内的功能解耦。

- 组件： UI构建与显示的最小单位，如列表、网格、按钮、单选框、进度条、文本等。开发者通过多种组件的组合，构建出满足自身应用诉求的完整界面。

## 两种开发范式
针对不同的应用场景及技术背景，方舟UI框架提供了两种开发范式，分别是基于ArkTS的声明式开发范式（简称“声明式开发范式”）和兼容JS的类Web开发范式（简称“类Web开发范式”）。

- **声明式开发范式：**采用基于TypeScript声明式UI语法扩展而来的ArkTS语言，从组件、动画和状态管理三个维度提供UI绘制能力。

- 类Web开发范式：采用经典的HML、CSS、JavaScript三段式开发方式，即使用HML标签文件搭建布局、使用CSS文件描述样式、使用JavaScript文件处理逻辑。该范式更符合于Web前端开发者的使用习惯，便于快速将已有的Web应用改造成方舟UI框架应用。

[ArkUI主页-官方文档](https://developer.huawei.com/consumer/cn/arkui/)

[ArkUI简介-官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkui-overview)