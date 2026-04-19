---
title: AI赋赋能个性化教学
icon: fab fa-python
author: 周子力
order: 1
category:
  - 教学文档
tag:
  - AI技术
---

## 一、实操框架示意图



本次实操基于"智能体核心处理框架"展开，通过两类核心资源驱动整个智能服务流程。

![picture 26](https://oss.docs.z-xin.net/89b7fc31e75b731f06d3b47e7bfba986888c5e1bbf36d8eab1e3b57ce75b1958.png)  


### 1.所需资源

- **课程教学资源**：作为知识输入来源，经由"知识抽取技能"处理后，自动构建**课程知识图谱**，形成结构化的学科知识网络。
- **学生作业成绩单**：作为学情数据来源，经由"知识画像技能"分析后，生成每位学生的**个人知识画像**，精准定位掌握情况与薄弱环节。

两类数据在"知识建模与融合"层交汇后，驱动三大智能服务技能——**个性化作业生成、个性化资源推荐、AI 助教**——最终向终端用户交付个性化作业、个性化学习资源与 AI 私人助教三项服务。

### 2.所需工具（WorkBuddy）

全流程基于 **WorkBuddy** 实现。借助其内置技能包与 MCP 协议扩展能力，无需编写代码，即可完成从资源上传、知识抽取、画像分析到智能服务生成的全链路自动化操作，真正做到开箱即用。


## 一、下载、安装和登录Workbuddy
### 1.Workbuddy简介

WorkBuddy 是腾讯云代码助手推出的 AI Agent 办公工具，定位为全场景职场 AI 智能体桌面工作台。与传统 AI 聊天工具不同，WorkBuddy 能够理解用户的自然语言指令，在电脑上自主思考、拆解任务、规划执行步骤，最终交付可直接验收的工作成果——它不是在与用户对话，而是真正在帮用户干活。

该产品于 2026 年 1 月开启内部内测，同年 3 月 9 日正式全量上线，内置超 20 种 Skills 技能包与 MCP 协议，覆盖海报生成、自动化报表、数据处理、文档生成等多类办公场景，并支持 DeepSeek、GLM、Kimi、MiniMax 等主流大模型的一键切换。

针对当前 AI 办公工具技术门槛高、易用性不足的痛点，WorkBuddy 采用"零代码、免部署、自然语言交互"的设计思路，让不懂编程的普通职场人无需复杂配置即可快速上手，真正实现"AI 办公平民化"。WorkBuddy 支持 Windows x64、macOS Intel 及 macOS Apple Silicon 平台，用户可通过官网免费下载使用。

### 2.为什么用Workbuddy？


**零门槛上手**：采用自然语言交互设计，无需编程基础，无需复杂配置，下载即用，普通用户一分钟即可上手，真正做到"AI 办公平民化"。

**灵活扩展技能**：内置超 20 种 Skills 技能包，覆盖海报生成、数据报表、文档创作等常见办公场景。用户还可按需自定义创建或导入技能，让 WorkBuddy 随业务需求持续"成长"。

**无缝接入 MCP 服务**：支持 MCP 协议，可轻松对接企业微信、飞书、钉钉、QQ 等主流办公平台，用户甚至可以在手机上远程发出指令，让电脑端自动完成任务。

**数据安全留本地**：所有文件操作均在本地授权范围内完成，敏感数据不上传云端，从源头保障企业数据隐私与安全合规，让用户用得放心、用得安心。


### 3.下载网址：
[workbuddy](https://copilot.tencent.com/work/)
### 4.安装Workbuddy
（1）运行安装程序

双击下载的 WorkBuddySetup.exe 文件，若弹出 UAC 权限提示，点击"是"允许运行。

（2）按向导完成安装

选择安装路径（默认 C:\Program Files\WorkBuddy），点击"立即安装"，等待进度条完成。

（3）自动启动

安装完成后程序自动启动，也会在桌面和开始菜单创建快捷方式。

### 5.登录


![picture 27](https://oss.docs.z-xin.net/0df0e7cce9b1b354f906bfbfca88844787fe603252c8f0f4a73fa6317ec6a5e7.png)  



点击登录后，打开一个网页，选择一种登录方式，比如：用微信扫码，

![picture 28](https://oss.docs.z-xin.net/95f57f468a843f75c5d61aa5ef55b26c73ffc1816a5704c6a00743a7780857c5.png)  



表示已登录。并出现以下画面。


![picture 29](https://oss.docs.z-xin.net/a1b5170eaffe4297cab9816b644220026f56753f34e59697ee9ff74dd8d6055e.png)  


## 二、技能操作
### 1.技能简介

**技能（Skills）** 是 智能体中可调用的功能模块，相当于给 AI 装上的"工具插件"。

每个技能负责完成一项具体任务——例如本次实操中的**知识抽取技能**，能自动从课程资料中提取知识点；**知识画像技能**，能根据学生成绩分析学习状态。

用户无需编写代码，直接通过自然语言指令调用技能，智能体便会自动执行对应操作并交付结果。

### 2.技能创建


![picture 31](https://oss.docs.z-xin.net/bede2efad45272138e21fa1b71e6f2d3777915bcec5c9d1d6c708171aa24b279.gif)  



### 3.技能添加


![picture 33](https://oss.docs.z-xin.net/6451c900857e2e6c0533feab9e198874a4c9749a2f441b6d1c69edba20e60183.gif)  



### 4.技能删除


![picture 32](https://oss.docs.z-xin.net/6451c900857e2e6c0533feab9e198874a4c9749a2f441b6d1c69edba20e60183.gif)  



### 5.技能下载

本次赋能汇报中所需要的技能可以在此下载：

[理工科AI赋能技能](https://d.zxin.confnew.com/zxnext1959826806593634305/1a38e2cf-8407-4658-b547-6267d3d73965.rar)

[文科AI赋能技能](https://d.zxin.confnew.com/zxnext1959826806593634305/5d6a13f3-fe28-4b86-b99c-12a30fdebeb7.rar)

## 三、AI赋能个性化实操


### 1.建立一个工作空间

（1）先在本地建一个文件夹

（2）把鼠标移到workbuddy工作空间菜单处，点击出现的右侧按钮就可以弹出一个窗口，让选择文件夹，就选择刚才建好的文件夹即可。


![picture 34](https://oss.docs.z-xin.net/2c73cf77132ad5d70c6a9ac5d95fe3557c6fc5759c1148b852d63c54bbf149b8.gif)  



### 2.将资源都放到这个文件夹中
资源可以在这里下载测试用课程教学资源：

[理工科课程测试资源](https://d.zxin.confnew.com/zxnext1959826806593634305/88c42ba7-9cf4-45e3-982b-a1e5d0489654.rar)

[文科课程测试资源](https://d.zxin.confnew.com/zxnext1959826806593634305/a136cee5-a90a-44ff-9b8c-7c97cf4f35e0.rar)

将下载后的测试资源解压到刚建立的文件夹中。

![picture 35](https://oss.docs.z-xin.net/88706a8df324ba65a572338d2e801ccb36ffcf49ab7a50ca8e3e265ee309d631.png)  


### 3.选择模型
建议选MiniMax-M2.7 也可以自定义配置模型，如配置千问系列模型等。

![picture 36](https://oss.docs.z-xin.net/f42b43d05904579e49fce510696654185bfda840c5491d9dfce8c080ffcaf926.gif)  



### 5.课程知识图谱抽取


![picture 37](https://oss.docs.z-xin.net/28237378dbfadb2e20fb24fdd177b2f12329c7c417ef16d795d91b7da623cbad.gif)  


以下是生成后的内容:

两个csv文件：

knowledge_graph_triples.csv

knowledge_nodes.csv


### 6. 课程知识图谱展示
可以使用图谱展示技能, 展示课程知识图谱。生成一个html文件

课程图谱的图形化展示


![picture 38](https://oss.docs.z-xin.net/1c9fa26a4e14d7d907139d0d012c007c51aae876bf7878070fedc96f3b343b88.png)  



走到这里，我们就得到课程知识图谱。接下来要做的事就是：

### 7. 学生知识画像生成

（1）生成作业知识图谱
获取作业的数据，
生成作业题目和知识点文件：

question_knowledge_tags.csv

knowledge_point_statistics.csv（知识点统计表）

并生成作业的知识图谱表示


![picture 39](https://oss.docs.z-xin.net/0e066dfc8dc651e8a5d4cd20d6c605414237474dad862a755daf5f8bf57ad685.png)  

（2）生成学生知识画像

输入学生的作业成绩单，生成以下文件，

student_knowledge_profile.csv（学生×知识点掌握度明细表）

student_summary_profile.csv（学生综合画像摘要表）

class_knowledge_heatmap.csv（班级知识点热力图数据）

以及学生知识画像


![picture 40](https://oss.docs.z-xin.net/cd949d3f8ab6c654f0d0d497b115f96756c69ae043496c5980c0970a529c1d99.png)  

![picture 42](https://oss.docs.z-xin.net/df4884c27651d42a83a2057b23dc3bc7928ee7053469783ed6f741d2fab73f1a.png)  


### 8. 个性化作业推荐



![picture 43](https://oss.docs.z-xin.net/8708c05159186d5660f45be6eca6d0095124dec11b123fa1cca04f3bf06a228f.png)  

![picture 44](https://oss.docs.z-xin.net/ebabb2dfce3e8f60432a9d94d8e91593078774126bc9bc0f903d2f0e0ebc2118.png)  


### 9. 个性化学习资源推荐


![picture 45](https://oss.docs.z-xin.net/ad82a8a5ab5b40be41923bb35bb16aebcde5c27d6f7864445cf41b81ada62a96.png)  

![picture 46](https://oss.docs.z-xin.net/68364da23c02500348dfc971780655842c690c963be987700727fcaa9a828586.png)  


### 10. AI助教技能生成

![picture 47](https://oss.docs.z-xin.net/83bab56b707aea73a28915b651d39987471a16a18d67dd051c4f0ea85ccbd1f4.gif)  

![picture 48](https://oss.docs.z-xin.net/950fb7408c36a270ccdb8fe8ddc800c88e6a0cd0bda076e5b7679e495d8eef7c.gif)  
