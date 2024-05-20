---
title: Python 网络爬虫-html
icon: fas fa-list
author: 周子力
order: 60
category:
  - 教学文档
tag:
  - Python
---


# Python 网络爬虫-html

## 1.什么是网络爬虫

互联网上有大量的数据，这些数据是都是由网页承载的。而页面是网上的一个节点，也就是说互联网中的节点就是网页，而数据显示在页面上。那么，如何从互联网上获取所需的数据呢？这就需要开发一个自动程序，不断地从互联网上抓取数据，然后保存到文件或数据库中供以后使用。这个自动程度就象一个蜘蛛，在网上爬行，获取数据。因此，叫做网络爬虫。

## 2.网页分析

知已知彼，百战不殆。从网页上爬取数据，肯定需要对网页有一个清晰的了解。

网页开发（前端开发）的核心的技术是：html css 和 JavaScript.

- **HTML用于控制网页的结构。**
- **CSS用于控制网页的外观。**
- **JavaScript控制着网页的行为。**

Html负责整个网页的架构，CSS负责网页的修饰，JavaScript负责网页的行为，如数据的请求和获取等。

### 2.1 HTML介绍

HTML的全称为“Hyper Text Markup Language（超文本标记语言）”，是网页的标准语言。HTML并不是一门编程语言，而是一门描述性的标记语言。

语法：

```
<标签符>内容</标签符>
```

对于一个网页来说，它最基本的HTML结构如下。

```html
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
    <title>网页的标题</title>
</head>
<body>
    <p>网页的内容</p>
</body>
</html>
```

学习HTML，说白了就是学习各种标签。HTML是一门描述性的语言，它是用标签来说话的。

举个例子，如果你要在浏览器显示一段文字，就应该使用“段落标签（p）”；

如果要在浏览器显示一张图片，就应该使用“图片标签（img）”。

针对显示东西的不同，使用的标签也会不同。在HTML中，

常用的标签如下表所示。

| 标签   | 说明             |
| ------ | ---------------- |
| div    | 分区（块元素）   |
| span   | 分区（行内元素） |
| p      | 段落             |
| ul     | 无序列表         |
| li     | 列表项           |
| h1~h6  | 1~6级标题        |
| a      | 超链接           |
| strong | 强调（粗体）     |
| em     | 强调（斜体）     |
| table  | 表格             |
| th     | 表头单元格       |
| td     | 表身单元格       |
| form   | 表单             |
| input  | 表单元素         |

## 2.CSS介绍

CSS指的是“Cascading Style Sheet（层叠样式表）”，它是用来控制网页外观的一门技术。

语法：

CSS的定义是由三部分组成的，包括选择符( selector)、属性( properties)、属性值（value）。

- 选择器：要修饰的对象（东西）
- 属性名：修饰对象的哪一个属性（样式）
- 属性值：样式的取值

```html
<head>
    <style>
        选择器{
        属性名：属性值;
        属性名：属性值;
        }
    </style>
</head>
```

## 3.CSS选择器

### 3.1 id选择器

id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式，一般来说，一个页面中标签的id的名称，**必须唯一且不能重复。**

示例：为id为test1的段落添加红色字体样式

```css
<p id='test1'>测试
    
</p>

#test1{
	color:blue;
}
```

### 3.2 class选择器

class 选择器可以为标有特定 class 的 HTML 元素指定特定的样式，一般来说，一个页面中标签的class的名称，**可以不唯一且可以重复。**

示例 ：为class为green的段落添加绿色字体样式，为class为bold的段落添加加粗字体样式。

```html
<p class="test">测试
    
</p>

```

```css
.test{
    color:bule;
}
```

### 3.3 标签选择器

除了使用id选择器和class选择器，我们也可以直接使用标签选择器。

示例：为所有段落标签添加黄色字体样式，为所有超链接标签添加红色字体样式。

```css
<p>
   测试 
</p>
<a href="https://stu.z-xin.net/">打开知新学生端</a>

p{
	color:blue;
}
```

### 3.4 子代选择器

子代选择器可以选择当前元素的所有子元素。定义的时候用 “> ”隔开。

示例 ：为div标签下所有h1子节点设置为红色文本样式

```css
<div>
    <h1>
        儿子标题
    </h1>
    <span><h2>孙子标题</h2></span>
    
</div>

div>h1{
    color:blue
}
```

### 3.5 后代选择器

标签元素除了并列书写还可以嵌套书写，后代选择器就是用于选择嵌套标签元素的一种选择器。定义的时候用“空格 ”隔开。

示例：为所有段落标签中的超链接标签添加红色文本

```css
<p class="test">
    <a >href="https://stu.z-xin.net/">打开知新学生端</a>
</p>

.part a{
	color:blue;
}
```

### 3.6 相邻兄弟选择器

相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素。定义的时候用 “+ ”隔开。

示例 ：为div之后的**第一个p标签元素**设置为黄色文本样式

```html
<div>
    <p>
        div内部数据
    </p>
</div>
<p>
    div后面的第一个p元素
</p>
<p>
    div后面的第一个p元素
</p>

div+p{
	background-color:yellow;
}
```

### 3.7 后续兄弟选择器

后续兄弟选择器选取所有指定元素之后的相邻兄弟元素。定义的时候用“~ ”隔开。

示例 ：为div之后的**所有p标签元素**设置为蓝色文本样式

```css
<div>

        <p></p>

</div>

<p></p>

div ~ p{
        color: red;

}
```

### 3.8 交集选择器

选择的元素必须同时满足多个条件才可以被选择，交集选择器就是干这个的。定义的时候用标签名.ID名/类名 

```css
<p class="part"></p>

<h1 class="part"></h1>

p .part{
        color: red;

}
```

### 3.9 并集选择器

多种元素共享某种属性，这时候就可以使用并集选择器。定义的时候用“逗号”**隔开。**

```css
<p></p>

<h1></h1>

<a class="like"></a>

p h1 .like{
        color: red;

}
```

### 3.10 通配符选择器

通配符选择器可以匹配任何标签，我们常用于统一页面样式。

```css
<p></p>

<h1></h1>

<a class="like"></a>

*{
        color: red;

}
```

### 3.11 伪类选择器

根据不同的状态显示不同的样式，一般多用于标签。

有四种状态：

        :link 未访问的链接
    
        :visited 已访问的链接
    
        :hover 鼠标悬浮到连接上，即移动在连接上
    
        :active 选定的链接，被激活

### 3.12 属性选择器

属性选择器可以根据元素的属性及属性值来选择元素。

```css
<input type="text" value="文本框" />

<input type="button" value="按钮" />

input[type="text"]{
        width: 150px;

}

input[type="button"]{
        width: 150px;

}

```

## 4. CSS的基本属性

### 优点

1.有效的传递页面信息

2.美化网页

3.凸显页面的主题

4.提高用户体验

格式：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    
    <style>
        .title1{
            font-size: 50px;
            background: aquamarine;
        }
    </style>
 
</head>
<body>
 
学习的<span class="title1">人最帅</span>
 
</body>
</html>
```

### 4.1 字体属性

css字体属性指的是设置字体相关的样式。

| 属性      | 说明                                           |
| --------- | ---------------------------------------------- |
| font      | 简写属性，把所有针对字体的属性设置在一个声明中 |
| font-size | 设置字体的尺寸                                 |

| font-style  | 设置字体的风格；Normal：正常、italic：斜体、oblique：倾斜    |
| ----------- | ------------------------------------------------------------ |
| font-weight | 设置字体的粗细；Normal：正常、lighter：细体、bold：粗体、bolder：特粗体 |
| font-family | 设置字体；指定多种字体时用逗号分开                           |

### 4.2 文本属性

文本属性包括阴影效果、大小写、文本缩进、对齐方式等等。

| 属性           | 说明         |
| -------------- | ------------ |
| color          | 设置文本颜色 |
| direction      | 设置文本方向 |
| letter-spacing | 设置字符间距 |

| line-height     | 设置行高                     |
| --------------- | ---------------------------- |
| text-align      | 设置文本内容的对其方式       |
| text-decoration | 向文本添加修饰               |
| text-overflow   | 设置对象内溢出的文本处理方式 |
| text-indent     | 设置首行文本的缩进           |

| text-transform | 控制文本转换             |
| -------------- | ------------------------ |
| text-shadow    | 设置文本阴影             |
| unicode-bidi   | 设置文本方向             |
| word-spacing   | 设置字间距               |
| white-space    | 设置元素中空白的处理方式 |

### 4.3 背景属性

CSS背景属性主要用于设置对象的背景颜色、背景图片、背景图片的重复性、背景图片的位置等。

| 属性                  | 说明                                         |
| --------------------- | -------------------------------------------- |
| background            | 简写属性                                     |
| background-attachment | 设置背景图像是否固定或者随着页面其余部分滚动 |

| background-color    | 设置元素的背景颜色     |
| ------------------- | ---------------------- |
| background-image    | 将图像设置为背景       |
| background-position | 设置背景图像的起始位置 |
| background-repeat   | 设置背景图像是否重复   |

### 4.4**边框属性**

CSS边框属性可以设置对象边框的颜色、样式以及宽度。使用对象的边框属性时必须先设定对象的高度及宽度。语法格式如下：

border：边框宽度 边框样式 边框颜色

| 边框样式 | 说明       | 边框样式 | 说明       |
| -------- | ---------- | -------- | ---------- |
| none     | 无边框     | ridge    | 菱型边框   |
| double   | 双线边框   | dashed   | 虚线边框   |
| hidden   | 隐藏边框   | solide   | 实线边框   |
| groove   | 3D凹槽边框 | inset    | 3D内嵌边框 |
| dotted   | 点线边框   | outset   | 3D凸边框   |

注意：border-width属性可以单独设置边框宽度；border-style属性可以单独设边框样式；border-color属性可以单独设置边框颜色。

### 4.5 列表属性

常用的列表属性是list-style-type 、list-style-image、 list-style-position以及list-style。

| 属性                | 含义                   | 说明                        |
| ------------------- | ---------------------- | --------------------------- |
| list-style-type     | 设置列表前的标记       |                             |
| list-style-image    | 将图像作为列表前的标记 |                             |
| list-style-position | 设置标记的位置         | 取值：outside(默认)、inside |
| list-style          | 简写                   |                             |

list-style-type属性用于设置列表项标记的类型，主要有disp (实心圆)、circle (空心圆)、square (实心方块)、none (不使用项目符号) 。

list-styl-image属性用于设置使用什么图像作为列表符号。

list-style-position属t用来指定列表符号的显示位置，当值为outside时， 表示将列表符号放在文本块之外，该值为默认值，当值为inside时，表示将列表符号放在文本块之内。

### 4.6 鼠标属性

CSS中可以通过鼠标指针的cursor属性设置鼠标指针的显示图形，语法格式如下：

cursor：鼠标指针样式

| crosshair       | 十字准线 | s-resize  | 向下改变大小   |
| --------------- | -------- | --------- | -------------- |
| pointer \| hand | 手型     | e-resize  | 向右改变大小   |
| wait            | 表       | w-resize  | 向左改变大小   |
| help            | 问号     | ne-resize | 向上右改变大小 |
| no-drop         | 无法释放 | nw-resize | 向上左改变大小 |

| text     | 文字或编辑   | se-resize | 向下右改变大小 |
| -------- | ------------ | --------- | -------------- |
| move     | 移动         | sw-resize | 向下左改变大小 |
| n-resize | 向上改变大小 |           |                |

## 5.盒子

概念
CSS盒子模型是一种在网页设计中用于描述元素布局的概念模型。在CSS中，每个元素都被视为一个矩形盒子，这个盒子包含了该元素的内容、内边距（padding）、边框（border）和外边距（margin）。

内容（content）：这是盒子里装的东西，可以是文本、图像或者其他元素。内容的尺寸可以通过height和width属性来控制。
内边距（padding）：这是内容与边框之间的空间。内边距的大小可以通过padding属性来控制。
边框（border）：这是围绕内容和内边距的一条线。边框的样式、宽度和颜色可以通过border属性来控制。
外边距（margin）：这是盒子与其他元素之间的空间。外边距的大小可以通过margin属性来控制。

在CSS中，可以通过设置元素的width和height属性来控制盒子的尺寸。但是需要注意的是，增加内边距和边框的宽度会增加盒子的尺寸，但不会影响内容区域的尺寸。而增加外边距则会增加盒子与其他元素之间的距离，但不会影响盒子的尺寸。

- 格式

```html
<div></div>
```



- 边框

```css
border：粗细 样式 颜色
```

- 外边距

```css
margin:0 0 0 0/*分别表示上、右、下、左；从上开始顺时针*/
/*例1：居中*/
margin:0 auto /*auto表示左右自动*/
/*例2：*/
margin:4px/*表示上、右、下、左都为4px*/
/*例3*/
margin:10px 20px 30px/*表示上为10px，左右为20px，下为30px*/

```

盒子的计算方式：
margin+border+padding+内容的大小

总结：
body总有一个默认的外边距 margin:0
常见操作：初始化

- 圆角边框

```css
<style>
        div{
            width: 100px;
            height: 100px;
            border: 10px solid red;
            /*一个border-radius只管一个圆的1/4*/
            border-radius: 50px 20px 20px 30px;/*左上 右上 右下 左下 ,顺时针方向*/
        }
</style>

```

- 阴影

```css
box-shadow: 10px 10px 1px black;
```

- 标准文档流
  块级元素：独占一行 h1~h6 、p、div、 列表…
  行内元素：不独占一行 span、a、img、strong

注： 行内元素可以包含在块级元素中，反之则不可以

- display
  display属性定义了一个元素应如何在页面上显示

常用值：

block：将元素显示为块级元素。块级元素会在其前后创建新行，并且占据整个容器的宽度。例如，`<div>、<p>、<h1>`等元素的默认display属性值为block。
inline：将元素显示为内联元素。内联元素不会创建新行，而是在当前行内显示。例如，`<span>、<a>`等元素的默认display属性值为inline。
none：将元素隐藏，不显示。
inline-block：将元素显示为内联块级元素。内联块级元素可以在当前行内显示，并且可以设置宽度和高度。
flex：将元素显示为弹性盒模型。弹性盒模型是一种用于创建复杂的布局和对齐元素的CSS技术。
grid：将元素显示为网格容器。网格容器是一种用于创建二维布局的CSS技术。


- float

在CSS中，float属性用于将元素放置在其容器的左侧或右侧，使文本和内联元素环绕它。这个属性常用于文字环绕图片等场景。

float属性有三个值：

left：将元素向左浮动。
right：将元素向右浮动。
none：默认值，元素不浮动，会停在原处
注意：

        1.浮动元素会脱离正常的文档流，不会影响到其它元素的布局。
    
        2.浮动元素之后的元素会环绕浮动元素。
    
        3.如果容器内只有浮动元素，那么容器将不会显示，因为浮动元素会脱离文档流。
- overflow

overflow属性用于指定当内容溢出元素框时该如何处理。

属性有三个值：

visible：默认值，内容会溢出元素框，并在页面中显示出来。
hidden：内容不会溢出元素框，溢出的内容会被裁剪，并且其余内容是不可见的。
auto：浏览器会自动判断是否需要裁剪内容，如果需要，则裁剪内容并显示滚动条。
格式：

```css
div { overflow: hidden; }
```

使用overflow属性可以控制页面元素的显示效果，从而实现各种不同的布局效果。

## 6.定位

- 相对定位

​    相对定位是一种布局策略，它相对于元素在正常文档流中的位置进行定位。使用相对定位属性可以让元素相对于其原始位置进行平移、旋转等操作，而不会影响到其他元素的布局

格式：

```css
//一个元素向右平移100像素

div {
        position: relative;

        left: 100px;

}

如：

top:-20px;/*向上偏移20px*/
left:20px;/*向右偏移20px*/
bottom:10px;/*向上偏移10px*/
right:20px;/*向左偏移20px*/

```

通过设置元素的position属性为relative来实现的

控制元素位置属性：

    	top
    
        right
    
        bottom
    
        left
    
        相对定位不会改变元素在正常文档流中的位置，它只是在视觉上移动了元素。因此，使用相对定位不会影响到其他元素的布局。      
- 绝对定位
          绝对定位是一种布局策略，它可以使一个元素脱离正常的文档流，并相对于其包含块进行定位。使用绝对定位属性可以让元素在页面中精确定位，并且不会影响到其他元素的布局。

通过设置元素的position属性为absolute来实现的。

控制元素位置属性：

        top
    
        right
    
        bottom
    
        left

```css
//将一个元素绝对定位到页面的右下角：

div {
        position: absolute;

        bottom: 0;

        right: 0;

}
```

- z-index
          z-index属性在CSS中用于确定元素的堆叠顺序。z-index的值是一个整数，表示元素在Z轴上的位置。一个较大的z-index值意味着元素在叠层顺序中会更靠近顶部。

  需要注意的是，z-index属性只对设置了定位（position:relative/absolute/fixed/sticky）的元素有效。默认值为auto，如果z-index设置为auto，则根据元素的定位类型（static/relative/absolute/fixed/sticky），其层叠顺序会受到不同的影响。

  此外，z-index也支持负值，但要注意的是，如果定位元素有发生嵌套，那么负值的z-index可能不会按照预期工作。在CSS2.1时代，只有定位元素（position:relative/absolute/fixed/sticky）的z-index才有作用。

  





























# 参考

1. https://zhuanlan.zhihu.com/p/621238247
2. https://zhuanlan.zhihu.com/p/612097711
3. https://blog.csdn.net/qq_35056891/article/details/134649158