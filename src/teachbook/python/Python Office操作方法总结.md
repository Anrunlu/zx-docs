---
title: Python office操作方法总结
icon: fas fa-list
author: 周子力
order: 53
category:
  - 教学文档
tag:
  - Python
---

# Python office操作方法总结
## 1. office文档结构特点
不管是word,PPT还是excel文档，都是一种类型。那就是文档，文档模块和更小的模块。
- word
![picture 1](https://oss.docs.z-xin.net/216719e14d402505a62bacbd7338e52d5ef715c6025fd2c55c1c52fdadc7f3f2.png) 
- PPT
![picture 0](https://oss.docs.z-xin.net/1fc67ac5b6e11de1a7df116e917edc3d98d58480ab85c7e04a80090d9ad3f261.png) 
- excel
![picture 0](https://oss.docs.z-xin.net/e4a0c812e3fabec5ace1345047e1e24d95f175c4d220de795a2fcb864ca9fba0.png)  

## 2. office文档结构与Python代码映射
- word
文档：document
段落：paragraph
段落内容：run
表格：Table
...

- PPT
文档：presentation
形状：shape(多种形状)
段落：paragraph
段落内容：run

- excel
文档：wordbook
表：sheet
单元：cell

## 3.Python代码特点
创建一个文档，或段落，然后返回该文档，或段落。
然后对文档或段落等进行样式的设置。
