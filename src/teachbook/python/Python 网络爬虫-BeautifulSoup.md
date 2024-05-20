---
title: Python 网络爬虫-BeautifulSoup
icon: fas fa-list
author: 周子力
order: 63
category:
  - 教学文档
tag:
  - Python
---


# Python 网络爬虫-BeautiSoup
## 一、BeautifulSoup 简介

[BeautifulSoup官网](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)

简单来说，Beautiful Soup是python的一个库，最主要的功能是从网页抓取数据。官方解释如下：
Beautiful Soup提供一些简单的、python式的函数用来处理导航、搜索、修改分析树等功能。它是一个工具箱，通过解析文档为用户提供需要抓取的数据，因为简单，所以不需要多少代码就可以写出一个完整的应用程序。Beautiful Soup自动将输入文档转换为Unicode编码，输出文档转换为utf-8编码。你不需要考虑编码方式，除非文档没有指定一个编码方式，这时，Beautiful Soup就不能自动识别编码方式了。然后，你仅仅需要说明一下原始编码方式就可以了。Beautiful Soup已成为和lxml、html6lib一样出色的python解释器，为用户灵活地提供不同的解析策略或强劲的速度

## 二、BeautifulSoup 安装

- `pip install beautifulsoup4`
- `pip install beautifulsoup4 -i https://pypi.tuna.tsinghua.edu.cn/simple`

Beautiful Soup支持Python标准库中的HTML解析器,还支持一些第三方的解析器，如果我们不安装它，则 Python 会使用 Python默认的解析器，lxml 解析器更加强大，速度更快，推荐安装。

![picture 0](https://oss.docs.z-xin.net/4049432648d62e5ec1b5e7b95f4576adb2845a591568d230e4bdaecedef47c31.png)  

## 三、BeautifulSoup 使用
实例：
```html
html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""


```

使用bs的初始化操作，创建一个BeautifulSoup对象
```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')
```

获取其中的某个结构化元素及其属性

```python
soup.title  # title 元素
# <title>The Dormouse's story</title>

soup.p  # 第一个 p 元素
# <p class="title"><b>The Dormouse's story</b></p>

soup.p['class']  # p 元素的 class 属性
# ['title']

soup.p.b  # p 元素下的 b 元素
# <b>The Dormouse's story</b>

soup.p.parent.name  # p 元素的父节点的标签
# body
```
并不是所有信息都可以简单地通过结构化获取，通常使用 find 和 find_all 方法进行查找：

```python

soup.find_all('a')  # 所有 a 元素
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

soup.find(id='link3')  # id 为 link3 的元素
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a
```
find 和 find_all 可以有多个搜索条件叠加，比如find('a', id='link3', class_='sister')

find 返回的是一个bs4.element.Ta****g 对象，这个对象可以进一步进行搜索。如果有多个满足的结果，find只返回第一个；如果没有，返回 None。

find_all 返回的是一个由 bs4.element.Tag 对象组成的 list，不管找到几个或是没找到，都是 list。

```python

x = soup.find(class_='story')
x.get_text()  # 仅可见文本内容
# 'Once upon a time there were three little sisters; and their names were\nElsie,\nLacie and\nTillie;\nand they lived at the bottom of a well.'
x.prettify()  # 元素完整内容
# '<p class="story">\n Once upon a time there were three little sisters; and their names were\n <a class="sister" href="http://example.com/elsie" id="link1">\n  Elsie\n </a>\n ,\n <a class="sister" href="http://example.com/lacie" id="link2">\n  Lacie\n </a>\n and\n <a class="sister" href="http://example.com/tillie" id="link3">\n  Tillie\n </a>\n ;\nand they lived at the bottom of a well.\n</p>\n'
```
如果你有前端开发经验，对 CSS 选择器很熟悉，bs 也为你提供了相应的方法：

```python
soup.select('html head title')
# [<title>The Dormouse's story</title>]
soup.select('p > #link1')
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>]

```
## 4.四大对象各类

Beautiful Soup将复杂HTML文档转换成一个复杂的树形结构,每个节点都是Python对象,所有对象可以归纳为4种:
1. Tag
2. NavigableString
3. BeautifulSoup
4. Comment

![picture 1](https://oss.docs.z-xin.net/a22766c12dfc4b5e0ef3092b14c5f0b13928be509299813417e6223f24f7e4a9.png)  

（1）Tag
Tag 是什么？通俗点讲就是 HTML 中的一个个标签，例如
```html
<title>The Dormouse's story</title>
<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>
```
上面的 title a 等等 HTML 标签加上里面包括的内容就是 Tag，下面我们来感受一下怎样用 Beautiful Soup 来方便地获取 Tags

```python
print soup.title
#<title>The Dormouse's story</title>
 
print soup.head
#<head><title>The Dormouse's story</title></head>
 
print soup.a
#<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>
 
print soup.p
#<p class="title" name="dromouse"><b>The Dormouse's story</b></p>
```
利用 soup加标签名轻松地获取这些标签的内容，是不是感觉比正则表达式方便多了？不过有一点是，它查找的是在所有内容中的第一个符合要求的标签，如果要查询所有的标签，我们在后面进行介绍。 soup.title 得到的是title标签，soup.p 得到的是文档中的第一个p标签，要想得到所有标签，得用find_all函数。 find_all 函数返回的是一个序列，可以对它进行循环，依次得到想到的东西.。
对于 Tag，它有两个重要的属性，是 name 和 attrs
name
soup 对象本身比较特殊，它的 name 即为 [document]，对于其他内部标签，输出的值便为标签本身的名称。
```python
print soup.name
print soup.head.name
#[document]
#head
```
在这里，我们把 p 标签的所有属性打印输出了出来，得到的类型是一个字典。如果我们想要单独获取某个属性，可以这样，例如我们获取它的 class 叫什么
```python
print soup.p.attrs
#{'class': ['title'], 'name': 'dromouse'}
print soup.p['class']
#['title']
print soup.p.get('class')
#['title']

```
我们可以对这些属性和内容等等进行修改，例如
```python
soup.p['class']="newClass"
print soup.p
#<p class="newClass" name="dromouse"><b>The Dormouse's story</b></p>


del soup.p['class']
print soup.p
#<p name="dromouse"><b>The Dormouse's story</b></p>

head = soup.find('head')
#head = soup.head
#head = soup.contents[0].contents[0]
print head
 
html = soup.contents[0]       # <html> ... </html>
head = html.contents[0]       # <head> ... </head>
body = html.contents[1]       # <body> ... </body>


```
(2) NavigableString
既然我们已经得到了标签的内容，那么问题来了，我们要想获取标签内部的文字怎么办呢？很简单，用 .string 即可，例如

```python
print soup.p.string
#The Dormouse's story

print type(soup.p.string)
#<class 'bs4.element.NavigableString'>

```
(3) BeautifulSoup
BeautifulSoup 对象表示的是一个文档的全部内容.大部分时候,可以把它当作 Tag 对象，是一个特殊的 Tag，我们可以分别获取它的类型，名称，以及属性来感受一下
```python
print type(soup.name)
#<type 'unicode'>
print soup.name 
# [document]
print soup.attrs 
#{} 空字典
```
(4) Comment
Comment 对象是一个特殊类型的 NavigableString 对象，其实输出的内容仍然不包括注释符号，但是如果不好好处理它，可能会对我们的文本处理造成意想不到的麻烦。
```python
print soup.a
print soup.a.string
print type(soup.a.string)
```
a 标签里的内容实际上是注释，但是如果我们利用 .string 来输出它的内容，我们发现它已经把注释符号去掉了，所以这可能会给我们带来不必要的麻烦。
另外我们打印输出下它的类型，发现它是一个 Comment 类型，所以，我们在使用前最好做一下判断，判断代码如下
```python
if type(soup.a.string)==bs4.element.Comment:
    print soup.a.string
```
## 5. 遍历文档树
### 5.1 直接子节点
Tag.Tag_child1：直接通过下标名称访问子节点。
 Tag.contents：以列表形式返回所有子节点。
 Tag.children：生成器，可用于循环访问：for child in Tag.children
要点：.contents .children 属性
.contents
tag 的 .content 属性可以将tag的子节点以列表的方式输出。可以使用 [num] 的形式获得。使用contents向后遍历树，使用parent向前遍历树
```python
print soup.head.contents 
#[<title>The Dormouse's story</title>]
print soup.head.contents[0]
#<title>The Dormouse's story</title>
```
.children
它返回的不是一个 list，不过我们可以通过遍历获取所有子节点。我们打印输出 .children 看一下，可以发现它是一个 list 生成器对象。
可以使用list可以将其转化为列表。当然可以使用for 语句遍历里面的孩子。
```python
print soup.head.children
#<listiterator object at 0x7f71457f5710>
for child in  soup.body.children:
    print child

```
### 5.2 所有子孙节点
.descendants
.contents 和 .children 属性仅包含tag的直接子节点，.descendants 属性可以对所有tag的子孙节点进行递归循环，和 children类似，我们也需要遍历获取其中的内容。
Tag.descendants：生成器，可用于循环访问：for des inTag.descendants
```python
for child in soup.descendants:
    print child
```
### 5.3 节点内容
Tag.String：Tag只有一个String子节点是，可以这么访问，否则返回None
Tag.Strings：生成器，可用于循环访问：for str in Tag.Strings
如果tag只有一个 NavigableString 类型子节点,那么这个tag可以使用 .string 得到子节点。如果一个tag仅有一个子节点,那么这个tag也可以使用 .string 方法,输出结果与当前唯一子节点的 .string 结果相同。通俗点说就是：如果一个标签里面没有标签了，那么 .string 就会返回标签里面的内容。如果标签里面只有唯一的一个标签了，那么 .string 也会返回最里面的内容。如果超过一个标签的话，那么就会返回None。例如
```python
print soup.head.string
#The Dormouse's story
print soup.title.string
#The Dormouse's story
```
如果tag包含了多个子节点,tag就无法确定，string 方法应该调用哪个子节点的内容, .string 的输出结果是 None
```python
print soup.html.string
# None
```
### 5.4 多个内容
.strings
获取多个内容，不过需要遍历获取，比如下面的例子

```python
for string in soup.strings:
    print(repr(string))
    # u"The Dormouse's story"
    # u'\n\n'
    # u"The Dormouse's story"
    # u'\n\n'
    # u'Once upon a time there were three little sisters; and their names were\n'
    # u'Elsie'
    # u',\n'
    # u'Lacie'
    # u' and\n'
    # u'Tillie'
    # u';\nand they lived at the bottom of a well.'
    # u'\n\n'
    # u'...'
    # u'\n'
```
.stripped_strings 
输出的字符串中可能包含了很多空格或空行,使用 .stripped_strings 可以去除多余空白内容
```python
for string in soup.stripped_strings:
    print(repr(string))
    # u"The Dormouse's story"
    # u"The Dormouse's story"
    # u'Once upon a time there were three little sisters; and their names were'
    # u'Elsie'
    # u','
    # u'Lacie'
    # u'and'
    # u'Tillie'
    # u';\nand they lived at the bottom of a well.'
    # u'...'
```
### 5.5 父节点
使用parent获取父节点。
Tag.parent：父节点
Tag.parents：父到根的所有节点
```python
body = soup.body
html = body.parent             # html是body的父亲
p = soup.p
print p.parent.name
#body
 
content = soup.head.title.string
print content.parent.name
#title
```
### 5.6 全部父节点
通过元素的 .parents 属性可以递归得到元素的所有父辈节点，例如
```python
content = soup.head.title.string
for parent in  content.parents:
    print parent.name
 
title
head
html
[document]
```
### 5.7 兄弟节点
使用nextSibling, previousSibling获取前后兄弟
Tag.next_sibling
Tag.next_siblings
Tag.previous_sibling
Tag.previous_siblings
兄弟节点可以理解为和本节点处在统一级的节点，.next_sibling 属性获取了该节点的下一个兄弟节点，.previous_sibling 则与之相反，如果节点不存在，则返回 None。
注意：实际文档中的tag的 .next_sibling 和 .previous_sibling 属性通常是字符串或空白，因为空白或者换行也可以被视作一个节点，所以得到的结果可能是空白或者换行
```python
print soup.p.next_sibling
#       实际该处为空白
print soup.p.prev_sibling
#None   没有前一个兄弟节点，返回 None
print soup.p.next_sibling.next_sibling
#<p class="story">Once upon a time there were three little sisters; and their names were
#<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>,
#<a class="sister" href="http://example.com/lacie" id="link2">Lacie</a> and
#<a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>;
#and they lived at the bottom of a well.</p>
#下一个节点的下一个兄弟节点是我们可以看到的节点
```
.next方法：只能针对单一元素进行.next，或者说是对contents列表元素的挨个清点。
```python
比如
soup.contents[1]=u'HTML'
soup.contents[2]=u'\n'
```
则soup.contents[1].next等价于soup.contents[2]
```python
head = body.previousSibling    # head和body在同一层，是body的前一个兄弟
p1 = body.contents[0]          # p1, p2都是body的儿子，我们用contents[0]取得p1
p2 = p1.nextSibling            # p2与p1在同一层，是p1的后一个兄弟, 当然body.content[1]也可得到
```
contents[]的灵活运用也可以寻找关系节点,寻找祖先或者子孙可以采用findParent(s), findNextSibling(s), findPreviousSibling(s)
### 5.8 全部兄弟节点
通过 .next_siblings 和 .previous_siblings 属性可以对当前节点的兄弟节点迭代输出
```python
for sibling in soup.a.next_siblings:
    print(repr(sibling))
    # u',\n'
    # <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>
    # u' and\n'
    # <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
    # u'; and they lived at the bottom of a well.'
    # None
```
### 5.9 前后节点
与 .next_sibling .previous_sibling 不同，它并不是针对于兄弟节点，而是在所有节点，不分层次。比如 head 节点为
```html
<head><title>The Dormouse's story</title></head>
```
那么它的下一个节点便是 title，它是不分层次关系的
```python
print soup.head.next_element
#<title>The Dormouse's story</title>
```
### 5.10 所有前后节点
通过 .next_elements 和 .previous_elements 的迭代器就可以向前或向后访问文档的解析内容,就好像文档正在被解析一样
```python
for element in last_a_tag.next_elements:
    print(repr(element))
# u'Tillie'
# u';\nand they lived at the bottom of a well.'
# u'\n\n'
# <p class="story">...</p>
# u'...'
# u'\n'
# None
```

## 6. 搜索文档树
### 6.1 find_all()
find_all( name , attrs , recursive , text , **kwargs )
find_all() 方法搜索当前tag的所有tag子节点,并判断是否符合过滤器的条件
1）name 参数
name 参数可以查找所有名字为 name 的tag,字符串对象会被自动忽略掉
```python
#第一个参数为Tag的名称 
tag.find_all(‘title’)  
#得到”<title>&%^&*</title>”,结果为一个列表  
 
第二个参数为匹配的属性
tag.find_all(“title”,class=”sister”)  
#得到如”<title class = “sister”>%^*&</title>  
 
# 第二个参数也可以为字符串，得到字符串匹配的结果
tag.find_all(“title”,”sister”)  
#得到如”<title class = “sister”>%^*&</title>  
```
A.传字符串
最简单的过滤器是字符串.在搜索方法中传入一个字符串参数,Beautiful Soup会查找与字符串完整匹配的内容,下面的例子用于查找文档中所有的`<b>`标签
```python
soup.find_all('b')
# [<b>The Dormouse's story</b>]
 
print soup.find_all('a')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>, <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>, <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
```
B.传正则表达式
如果传入正则表达式作为参数,Beautiful Soup会通过正则表达式的 match() 来匹配内容.下面例子中找出所有以b开头的标签,这表示`<body>`和`<b>`标签都应该被找到
```python
import re
for tag in soup.find_all(re.compile("^b")):
    print(tag.name)
# body
# b
```
C.传列表
如果传入列表参数,Beautiful Soup会将与列表中任一元素匹配的内容返回.下面代码找到文档中所有`<a>`标签和`<b>`标签
```python
soup.find_all(["a", "b"])
# [<b>The Dormouse's story</b>,
#  <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
```
D.传 True
True 可以匹配任何值,下面代码查找到所有的tag,但是不会返回字符串节点

```python
for tag in soup.find_all(True):
    print(tag.name)
# html
# head
# title
# body
# p
# b
# p
# a
# a
```
E.传方法
如果没有合适过滤器,那么还可以定义一个方法,方法只接受一个元素参数 [4] ,如果这个方法返回 True 表示当前元素匹配并且被找到,如果不是则反回 False。下面方法校验了当前元素,如果包含 class 属性却不包含 id 属性,那么将返回 True:
```python
def has_class_but_no_id(tag):
    return tag.has_attr('class') and not tag.has_attr('id')


soup.find_all(has_class_but_no_id)
# [<p class="title"><b>The Dormouse's story</b></p>,
#  <p class="story">Once upon a time there were...</p>,
#  <p class="story">...</p>] 
```
2）keyword 参数
注意：如果一个指定名字的参数不是搜索内置的参数名,搜索时会把该参数当作指定名字tag的属性来搜索,如果包含一个名字为 id 的参数,Beautiful Soup会搜索每个tag的”id”属性
```python
soup.find_all(id='link2')
# [<a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>]
```
如果传入 href 参数,Beautiful Soup会搜索每个tag的”href”属性
```python
soup.find_all(href=re.compile("elsie"))
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>]
```
使用多个指定名字的参数可以同时过滤tag的多个属性
```python
soup.find_all(href=re.compile("elsie"), id='link1')
# [<a class="sister" href="http://example.com/elsie" id="link1">three</a>]
```
在这里我们想用 class 过滤，不过 class 是 python 的关键词，这怎么办？加个下划线就可以
```python
soup.find_all("a", class_="sister")
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
# <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
```
有些tag属性在搜索不能使用,比如HTML5中的 data-* 属性
```python
data_soup = BeautifulSoup('<div data-foo="value">foo!</div>')
data_soup.find_all(data-foo="value")
# SyntaxError: keyword can't be an expression
```
但是可以通过 find_all() 方法的 attrs 参数定义一个字典参数来搜索包含特殊属性的tag

```python
data_soup.find_all(attrs={"data-foo": "value"})
# [<div data-foo="value">foo!</div>]
```
3）text 参数
通过 text 参数可以搜搜文档中的字符串内容.与 name 参数的可选值一样, text 参数接受 字符串 , 正则表达式 , 列表, True
```python
soup.find_all(text="Elsie")
# [u'Elsie']
 
soup.find_all(text=["Tillie", "Elsie", "Lacie"])
# [u'Elsie', u'Lacie', u'Tillie']
 
soup.find_all(text=re.compile("Dormouse"))
[u"The Dormouse's story", u"The Dormouse's story"]
```
4）limit 参数
find_all() 方法返回全部的搜索结构,如果文档树很大那么搜索会很慢.如果我们不需要全部结果,可以使用 limit 参数限制返回结果的数量.效果与SQL中的limit关键字类似,当搜索到的结果数量达到 limit 的限制时,就停止搜索返回结果.
文档树中有3个tag符合搜索条件,但结果只返回了2个,因为我们限制了返回数量
```python
soup.find_all("a", limit=2)
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>]
```
5）recursive 参数
调用tag的 find_all() 方法时,Beautiful Soup会检索当前tag的所有子孙节点,如果只想搜索tag的直接子节点,可以使用参数 recursive=False 。一段简单的文档:
```html
<html>
 <head>
  <title>
   The Dormouse's story
  </title>
 </head>
...
```
是否使用 recursive 参数的搜索结果:
```python
soup.html.find_all("title")
# [<title>The Dormouse's story</title>]
 
soup.html.find_all("title", recursive=False)
# []
```
### 6.2 find()
find(name=None, attrs={}, recursive=True, text=None, **kwargs)

它与 find_all() 方法唯一的区别是 find_all() 方法的返回结果是值包含一个元素的列表,而 find() 方法直接返回结果。

.find('p'),.findAll('p')：find返回的是字符串值，而且是返回从头查找到的第一个tag对。但是如果这第一个tag对包括大量的内容，父等级很高，则同时其内部所包含的，此级标签也全部都find。findAll返回值是个列表，如果发现了一个同名标签内含多个同名标签，则内部的标签一并归于该父标签显示，列表其他元素也不再体现那些内含的同名子标签。即findAll会返回所有符合要求的结果，并以list返回。

```python
soup.findAll(οnclick='document.location...')
    soup.findAll(attrs={'style':r'outline:none;'}) #用来查找属性中有style='outline:none;的标签体。                                 # 搜索所有tag
```
```python
tag搜索
find(tagname)                                  # 直接搜索名为tagname的tag 如：find('head')
find(list)                                     # 搜索在list中的tag，如: find(['head', 'body'])
find(dict)                                     # 搜索在dict中的tag，如:find({'head':True, 'body':True})
find(re.compile(''))                           # 搜索符合正则的tag, 如:find(re.compile('^p')) 搜索以p开头的tag
find(lambda)                       # 搜索函数返回结果为true的tag, 如:find(lambda name: if len(name) == 1) 搜索长度为1的tag
find(True)                                     # 搜索所有tag
 
attrs搜索
find(id='xxx')                                  # 寻找id属性为xxx的
find(attrs={id=re.compile('xxx'), algin='xxx'}) # 寻找id属性符合正则且algin属性为xxx的
find(attrs={id=True, algin=None})               # 寻找有id属性但是没有algin属性的
 
resp1 = soup.findAll('a', attrs = {'href': match1})
resp2 = soup.findAll('h1', attrs = {'class': match2})
resp3 = soup.findAll('img', attrs = {'id': match3})
 
text搜索
   文字的搜索会导致其他搜索给的值如：tag, attrs都失效。方法与搜索tag一致   
print p1.text
# u'This is paragraphone.'
print p2.text
# u'This is paragraphtwo.'
# 注意：1，每个tag的text包括了它以及它子孙的text。2，所有text已经被自动转为unicode，如果需要，可以自行转码encode(xxx)
 
recursive和limit属性
recursive=False表示只搜索直接儿子，否则搜索整个子树，默认为True。
当使用findAll或者类似返回list的方法时，limit属性用于限制返回的数量，
如:findAll('p', limit=2)： 返回首先找到的两个tag
```
### 6.3 find_parents()  find_parent()
find_all() 和 find() 只搜索当前节点的所有子节点,孙子节点等. find_parents() 和 find_parent() 用来搜索当前节点的父辈节点,搜索方法与普通tag的搜索方法相同,搜索文档搜索文档包含的内容

### 6.4 find_next_siblings()  find_next_sibling()

这2个方法通过 .next_siblings 属性对当 tag 的所有后面解析的兄弟 tag 节点进行迭代, find_next_siblings() 方法返回所有符合条件的后面的兄弟节点,find_next_sibling() 只返回符合条件的后面的第一个tag节点

### 6.5 find_previous_siblings()  find_previous_sibling()
这2个方法通过 .previous_siblings 属性对当前 tag 的前面解析的兄弟 tag 节点进行迭代, find_previous_siblings()方法返回所有符合条件的前面的兄弟节点, find_previous_sibling() 方法返回第一个符合条件的前面的兄弟节点
### 6.6find_all_next()  find_next()

这2个方法通过 .next_elements 属性对当前 tag 的之后的 tag 和字符串进行迭代, find_all_next() 方法返回所有符合条件的节点, find_next() 方法返回第一个符合条件的节点
### 6.7 find_all_previous() 和 find_previous()
这2个方法通过 .previous_elements 属性对当前节点前面的 tag 和字符串进行迭代, find_all_previous() 方法返回所有符合条件的节点, find_previous()方法返回第一个符合条件的节点

## 7. CSS选择器

在这里我们也可以利用类似的方法来筛选元素，用到的方法是 soup.select()，返回类型是 list
### 7.1 通过标签名查找
```python
print soup.select('title') 
#[<title>The Dormouse's story</title>]

print soup.select('a')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>, <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>, <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

print soup.select('b')
#[<b>The Dormouse's story</b>]
```

### 7.2 通过类名查找

```python
print soup.select('.sister')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>, <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>, <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
```
### 7.3 通过id名查找
```python
print soup.select('#link1')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>]
```


### 7.4 组合查找
组合查找即和写 class 文件时，标签名与类名、id名进行的组合原理是一样的， 例如：查找 p 标签中，id 等于 link1的内容，二者需要用空格分开
```python
print soup.select('p #link1')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>]
```
直接子标签查找
```python
print soup.select("head > title")
#[<title>The Dormouse's story</title>]
```

### 7.5 属性查找
查找时还可以加入属性元素，属性需要用中括号括起来，注意属性和标签属于同一节点，所以中间不能加空格，否则会无法匹配到。
```python
print soup.select('a[class="sister"]')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>, <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>, <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

print soup.select('a[href="http://example.com/elsie"]')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>]

```
同样，属性仍然可以与上述查找方式组合，不在同一节点的空格隔开，同一节点的不加空格
```python
print soup.select('p a[href="http://example.com/elsie"]')
#[<a class="sister" href="http://example.com/elsie" id="link1"><!-- Elsie --></a>]

```
以上的 select 方法返回的结果都是列表形式，可以遍历形式输出，然后用 get_text() 方法来获取它的内容。
```python
soup = BeautifulSoup(html, 'lxml')
print type(soup.select('title'))
print soup.select('title')[0].get_text()
 
for title in soup.select('title'):
    print title.get_text()
```
这就是另一种与 find_all 方法有异曲同工之妙的查找方法。
```python
print soup.find_all("a", class_="sister")
print soup.select("p.title")
 
# 通过属性进行查找
print soup.find_all("a", attrs={"class": "sister"})
 
# 通过文本进行查找
print soup.find_all(text="Elsie")
print soup.find_all(text=["Tillie", "Elsie", "Lacie"])
 
# 限制结果个数
print soup.find_all("a", limit=2)
```















# 参考
1. https://jianshu.com/p/f0f4c253bb14
2. https://blog.csdn.net/love666666shen/article/details/77512353
