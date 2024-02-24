---
title: 序言
icon: lightbulb
---

## 什么是计算机语言？

是人与机器，机器与机器进行交互的语言。计算机系统最大特征是指令通过一种语言传达给机器。为了使电子计算机进行各种工作，就需要有一套用以编写计算机程序的数字、字符和语法规划，由这些字符和语法规则组成计算机各种指令（或各种语句）。<br> 1.由 0 和 1 组成的

## 计算机语言的目的是什么？

## 计算机语言的本质是什么？

## 计算机语言的多种形式

## Python 程序设计语言

# 课程内容（可调整）

## 1.基础知识

## 2.娱乐知识

## 3.OA 知识

## 4.DM 知识

# 考核方式

## 1.课堂签到

## 2.课程实验

## 3.期末考试

# Python 概述

Python 的作者为 Guido von Rossum，荷兰人。1982 年，Guido 从阿姆斯特丹大学获得了数学和计算机硕士学位。尽管他算得上是一位数学家，但他更加享受计算机带来的乐趣，总趋向于做计算机相关的工作、热衷于做任何和编程相关的活儿。
<br>
Guido 希望有一种语言，这种语言能够像 C 语言那样，能够全面调用计算机的功能接口，又可以像 shell 那样，可以轻松的编程。ABC 语言让 Guido 看到希望。<br>
ABC 是由荷兰的数学和计算机研究所开发的。Guido 在该研究所工作，并参与到 ABC 语言的开发。ABC 语言以教学为目的。与当时的大部分语言不同，ABC 语言的目标是 “让用户感觉更好”。ABC 语言希望让语言变得容易阅读，容易使用，容易记忆，容易学习，并以此来激发人们学习编程的兴趣。

```
HOW TO RETURN words document:
      PUT {} IN collection
      FOR line IN document:
         FOR word IN split line:
            IF word not.in collection:
               INSERT word IN collection
      RETURN collection
```

# Python 概述

1989 年，为了打发圣诞节假期，Guido 开始写 Python 语言的编译器。Python 这个名字，来自 Guido 所挚爱的电视剧 Monty Python's Flying Circus。他希望这个叫做 Python 的语言能符合他的理想：创造一种 C 和 shell 之间，功能全面、易学易用、可拓展的语言。Guido 作为一个语言设计爱好者，已经有过设计语言的尝试。这一次，也不过是一次纯粹的 hacking 行为。<br>
1991 年，第一个 Python 编译器诞生。它是用 C 语言实现的，并能够调用 C 语言的库文件。从一出生 Python 就具有类、函数、异常处理、列表和词典等核心数据类型、以及模块为基础的拓展系统。<br>
随后得到 Guido 同事的欢迎，他们迅速的反馈使用意见，并参与到 Python 的改进。Guido 和一些同事构成 Python 的核心团队。他们将自己大部分的业余时间用于 hack Python。

# Python 的优缺点

Python 属于典型的解释型语言，所以运行 Python 程序需要解释器的支持，只要你在不同的平台安装了不同的解释器，代码就可以随时运行，不用担心任何兼容性问题，真正实现了“一次编写，到处运行”。<br>
Python 几乎支持所有常见的平台，比如 Linux、Windows、macOS、Android、FreeBSD、Solaris、PocketPC 等，Python 代码无需修改就能直接在这些平台上正确运行（可移植性强）。<br>
(1)优点：
简单、易学、规范的代码<br>
免费、开源、可移植性<br>
高层语言<br>
解释性<br>
面向对象<br>
可扩展性<br>
丰富的库<br>

(2)缺点：
运行速度慢<br>
代码加密困难

# Python 应用场景

Python 有着非广泛的应用，几乎所有大中型互联网公司都在使用 Python，例如国外的 Google、Youtube、Dropbox，国内的百度、新浪、搜狐、腾讯、阿里、网易、淘宝、知乎、豆瓣、汽车之家、美团等等，Python 帮助它们完成了各种各样的任务。<br>

（1）Web 应用开发<br>
（2）操作系统管理、服务器运维的自动化脚本<br>
（3）科学计算<br>
（4）人工智能领域<br>
（5）网路爬虫<br>
（6）游戏<br>
（7）桌面软件<br>
（8）服务器软件（网络软件）<br>
（9）构思实现，产品早期原型和迭代<br>

# Python 知识图谱

# Python 解释器

C 语言编写实现的 Python 又称为 CPython。平时所讨论的 Python，指的其实就是 CPython。<br>
Stackless Python 自称 Python 增强版。之所以名为 Stackless（无栈），是因为它没有依赖 C 语言的调用栈，实际上就是对 CPython 做了一些修改，添加了一些新的功能。<br>
Jython 是 Python 语言的 Java 实现。它将代码编译为 Java 字节代码，开发人员在 Python 模块中可以无缝使用 Java 类<br>
IronPython 将 Python 引入 .NET 框架中，这个项目受到微软的支持，因为 IronPython 的主要开发人员都在微软工作。可以这么说，IronPython 是推广语言的一种重要实现。<br>
PyPy 可能是最令人兴奋的 Python 实现，因为其目标就是将 Python 重写为 Python。在 PyPy 中，Python 解释器本身是用 Python 编写的。

# Python 程序下载与安装

## 1.下载 Python 安装程序

https://www.python.org/downloads/windows/

# Python 程序下载与安装

## 2.安装 Python 程序

双击下载的安装文件（windows)<br>
安装过程中，在定制 Python 对话框中，注意选中“Add python to PATH”复选框。<br>
点击 install Now

# 安装和管理 Python 扩展包

Python 3.4 以后的版本包含 pip 和 setuptools 库<br>
pip 用于安装管理 Python 扩展包<br>
setuptools 用于发布 Python 包<br>

```python
#模拟登录网站，购买商品
import datetime

time1 = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
dl = input("请输入登录密码：")
print("\033[32m*******欢迎登录网安商城*********\033[0m")

time2 = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
gm = input("请输入要购买的商品：")
print("\033[32m***********购买成功！！************\033[0m")

time3 = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
tc = input("是否退出？")
print("\033[32m***********已退出网站**************\033[0m")

print("\n\033[0;31m用户理理今天在网站的操作\033[0m")
print(time1, "登录网站")
print(time2, "购买" + gm)
print(time3, "退出网站")
```

```python
#打印
print('hello 2024')
print('fighting'+'!'*20)
# #进行数学运算
2**1024
# 1+2+3+4
# #特殊变量 _
# _+1
# #同时运行多个表达式
# 1*7,2+8,9/3
```

```python
import random             #导入库模块
print("Hello, World")      #输出：Hello, World
print("你今天的幸运随机数是：", random.choice(range(100))) #输出从0到9之间随机选择的数
# input()                            #等待用户输入
```

```python
#数字序号转换程序
print("\033[1;31m")
print("     数字序号转换程序")
print("*"*25, '\033[0m')
num=int(input("请输入数字："))
print("\033[1;31m罗马数字为：", chr(num+8543))
print("数字序号为：", chr(num+10101))
print("汉字序号为：", chr(num+12831))
```

# 本次课小结
