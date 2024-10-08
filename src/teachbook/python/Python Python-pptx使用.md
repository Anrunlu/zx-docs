---
title: Python python-pptx使用
icon: fas fa-list
author: 周子力
order: 52
category:
  - 教学文档
tag:
  - Python
---

# Python-pptx使用
## 1. Python-pptx简介
是一个Python库，可以用来创建、修改和保存PowerPoint文件。通过使用pptx库，可以自动化地生成各种样式的幻灯片，从而提高工作效率。

## 2. Python-pptx安装
```python
pip install python-pptx
pip install python-pptx -i https://pypi.tuna.tsinghua.edu.cn/simple

```
## 3. Python-pptx使用
pptx库眼中的PPT


presentations, 表示整个ppt文档

sliders. 表示ppt文档的每一页

shapes 方框，在每页幻灯片内插入的方框，可以是形状，也可以是文本框

Paragraph 段落，即Shape中的每一段内容，都称为一个段落

Run 文字块 一般为较少字符


 ![picture 0](https://oss.docs.z-xin.net/1fc67ac5b6e11de1a7df116e917edc3d98d58480ab85c7e04a80090d9ad3f261.png)  

![picture 1](https://oss.docs.z-xin.net/593689ac96196a88e3eec2a60467a17ac1dfe562cf25661271830bfb55505e2b.png)  

1.自动形状(auto shape)。自动形状就是指矩形、椭圆、箭头等比较规则的预设形状，大概有180多种吧，它们可以填充颜色和添加文本。我们常用到的文本框,也是形状,只不过它有文本但没有填充色而已。
2图片(picture)。没想到吧，图片也是形状，换一个角度看，图片是一个填充色是图片像素颜色而不是rgb纯颜色的形状。
3.图形框架（graphic frame)。图形框架可能会有点抽象，它指的是组织某个形状的框架，我们看不到。但要创建某些形状就需要用到它来组织，比如说创建一个表格、图表、智能图形，这些形状里面都包含了很多其他的各种元素，之所以不乱掉就是因为它们有图形框架在组织和管理。
4.组形(group shape)。这个比较容易理解，就是我们同时选中多个对象，然后可以把它们打成一个组，这样就可以把多个元素当成是一个整体，比如说一起移动、旋转、调整大小,这个组虽然我们看不见，但它是一种形状。
5.线条(line)。这个也好理解吧，虽然在PPT软件里线条也属于预设形状，但线条并没有归为自动形状，因为线条是线性的，有些线条还可以连接形状并在移动形状的时候依然保持连接。
ntent part。这个我也不知道怎么翻译，因为官方文档也没有详细提到，大概是指一些嵌入到PPT的外来xml元素，我们这里也不管那么多了，反正就是形状就对了。



### 3.1 读取PPT
```python

from pptx import Presentation

# 打开一个PPT文件
prs = Presentation('e:\\test.pptx')

# 遍历幻灯片
for slide in prs.slides:
    print(slide)#打印幻灯片
    # 遍历幻灯片中的形状
    for shape in slide.shapes:
        print(shape)#打印幻灯片中的方框
        # 判断形状中是否有文本
        if shape.has_text_frame:
            text_frame = shape.text_frame
            # 读取文本内容
            print(text_frame.text) #打印方框中的文本
            for paragraph in text_frame.paragraphs:
                print(paragraph.text) #打印方框中的段落的文本

```

这段代码将打开名为example.pptx的PowerPoint文件，并遍历其中的所有幻灯片。对于每个幻灯片，它会遍历其中的所有形状，并检查形状是否具有文本框。如果形状有文本框，它将打印出文本框中的文本。

### 3.2 写PPT
#### 3.2.1 添加slide和内容

- 选择PPT模板
使用ppt自带的模板
```python
prs= Presentation()
prs.slide_layouts[1] #ppt自带了常用的1-48种模板通过index选择对应的模板

```
使用自定义模板
```python
#使用自定义的模板
prs= Presentation('template.pptx')
```
- 确认占位符id
```python
#确认占位符id
prs.slide_layouts[0] #获取第一套母版的第一个版式
```

title 标题类型的占位符
subtitle 副标题类型的占位符
body 正文类型的占位符

#### 3.2.2 添加段落及设置层级关系
首先找到一个shape，向shape的text_frame中添加段落。
```python
slide2 = prs.slides.add_slide(prs.slide_layouts[3])
shapes = slide2.shapes
title_shape=shapes.title
body_shape=shapes.placeholders[1]

title_shape.text='这是我的一个测试'

tf=body_shape.text_frame
tf.text = '项目符号1'
p=tf.add_paragraph()
p.text='项目符号2'
p.level = 1
p=tf.add_paragraph()
p.text='项目符号3'
p.level = 2
```


#### 3.2.3 添加图片
```python
left = Cm(5)
height = Cm(5.5)
pic = slide2.shapes.add_picture('1.jpg', left, top, height=height) # 设置高度或宽度后会自适应
```


#### 3.2.4 添加表格
```python
slide3 = prs.slides.add_slide(prs.slide_layouts[3])
shapes = slide3.shapes
shapes.title.text='添加表格'

rows,cols=4,2
left=top=Cm(3)
width=Cm(18)
height=Cm(3)
table = shapes.add_table(rows, cols, left, top, width, height).table
table.columns[0].width = Cm(6)
table.columns[1].width = Cm(4)
table.rows[0].height= Cm(2)
data = [
    ['姓名', '成绩'],
    ['张三', 98],
    ['李四', 99],
    ['王五', 100]
]
for row in range(rows):
    for col in range(cols):
        table.cell(row, col).text = str(data[row][col])
```
#### 3.2.5 添加文本框及设置格式
```python
left=top=width=height=Cm(10)
text_box=slide2.shapes.add_textbox(left,top,width,height)
tf=text_box.text_frame
tf.text='文本框测试'
tf.vertical_anchor=MSO_VERTICAL_ANCHOR.BOTTOM



p=tf.add_paragraph()
p.text = '增加文字 '
p.font.bold = True
p.font.italic = True
p.font.size=Pt(50)
p.alignment= PP_PARAGRAPH_ALIGNMENT.RIGHT
r=p.add_run()
r.text='run'

fill = text_box.fill
fill.solid()
fill.fore_color.rgb=RGBColor(0,255,255)

line=text_box.line
line.color.rgb=RGBColor(255,0,0)
line.width=Cm(0.5)
```

