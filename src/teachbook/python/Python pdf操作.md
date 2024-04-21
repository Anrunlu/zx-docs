---
title: Python python-docx使用
icon: fas fa-list
author: 周子力
order: 51
category:
  - 教学文档
tag:
  - Python
---

# Python pdf文件操作
## 1.常用包
1. PyPDF2：PyPDF2是一个功能强大且易于使用的pdf处理库。它可以用于合并、拆分、提取文本和图像、旋转和裁剪pdf页面等。此外，PyPDF2还支持密码保护和加密pdf文件。它是Python用户最常用的pdf库之一。

2. pdfminer：pdfminer是一个用于提取文本和元数据的强大pdf处理工具。它可以解析pdf文件，并提供API来提取文本、布局和字体信息。pdfminer还提供了一些实用工具，用于查找和识别特定的文本模式。

3. pdfquery：pdfquery是一个基于pdfminer的库，它提供了一种简单和直观的方式来查询和提取pdf文件中的信息。它可以使用CSS样式选择器来选择和提取特定的元素，并提供了一个Pythonic的API来处理所选元素。

4. pdfplumber：pdfplumber是一个用于提取文本和表格信息的基于pdfminer的库。它具有自动解析表格、提取表头和数据的功能，并提供了便捷的方法来处理提取的文本和表格数据。pdfplumber还支持根据关键词进行文本搜索。

5. ReportLab：ReportLab是一个用于动态生成pdf文档的库。它提供了多种创建和编辑pdf文档的工具和功能，包括添加文本、图像、表格、图形和链接等。ReportLab还支持PDF报告和生成高质量的图像。

## 2.包的安装

```python
pip install 包名
pip install  -i https://pypi.tuna.tsinghua.edu.cn/simple 包名 
```
## 3.包的应用

```python
import 包名

```
## 4.读取pdf文件
```python
def read_pdf(path):
    # pip install pdfplumber

    with pdfplumber.open(path) as pdf:
    #len(pdf.pages)为 PDF 文档页数
        for i in range(2): #这里的2是指页数
        #pdf.pages[i] 是读取 PDF 文档第 i+1 页
            page = pdf.pages[i]
            #page.extract_text()函数即读取文本内容，下面这步是去掉文档最下面        的页码
            print(page.extract_text())

if __name__ == '__main__':
    # extract_information("pdf1.pdf")
    read_pdf("pdf1.pdf")
```