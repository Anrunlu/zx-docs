---
title: Python Matplotlib
icon: fas fa-list
author: 周子力
order: 28
category:
  - 教学文档
tag:
  - Python
---

# Python Matplotlib

## 1.什么是Matplotlib?

matplotlib 是python最著名的绘图库，它提供了一整套和Matlab相似的命令API，十分适合交互式地进行制图。而且也可以方便地将它作为绘图控件，嵌入GUI应用程序中。matplotlib 可以绘制多种形式的图形包括普通的线图，直方图，饼图，散点图以及误差线图等；可以比较方便的定制图形的各种属性比如图线的类型，颜色，粗细，字体的大小等；它能够很好地支持一部分 TeX 排版命令，可以比较美观地显示图形中的数学公式。

## 2.pylot介绍

Matplotlib 包含了几十个不同的模块， 如 matlab、mathtext、finance、dates 等，而 pylot 则是我们最常用的绘图模块，这也是需要介绍的重点。

注意：中文显示问题一种解决方案：

```python
from pylab import mpl

mpl.rcParams['font.sans-serif'] = ['SimHei'] # 指定字体

mpl.rcParams['axes.unicode_minus'] = False # 解决保存图像时'-'显示为方块的问题
```



## 3.绘制简单图形

### 3.1简单示例

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
#产生数据
x=np.arange(0,2*np.pi,0.01)
y=np.sin(x)
#将数据传递给plt
plt.plot(x,y)
#将数据通过plt显示出来
plt.show()

```

### 3.2设置标题、坐标轴名称及范围

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
from pylab import mpl
#设置字体
mpl.rcParams['font.sans-serif']=['SimHei']
mpl.rcParams['axes.unicode_minus']=False

#产生数据
x=np.arange(0,2*np.pi,0.01)
y=np.sin(x)

#将数据传送到plt
plt.plot(x,y)
#装饰plt
# plt.title('自定义标题名称', fontproperties='SimHei')

plt.title(u'正弦曲线',fontdict={'size':20})#设置标题
plt.xlabel(u'弧度',fontdict={'size':16})#设置X轴名称
plt.ylabel(u'正弦值',fontdict={'size':20})#设置Y轴名称

plt.axis([-0.1*np.pi,2.1*np.pi,-1.1,1.1])#设置坐标轴范围
plt.show()
```

### 3.3设置点和线的样式、宽度、颜色

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
from pylab import mpl
#设置字体
mpl.rcParams['font.sans-serif']=['SimHei']
mpl.rcParams['axes.unicode_minus']=False

#产生数据
x=np.arange(0,2*np.pi,0.01)
y=np.sin(x)

#将数据传送到plt
# plt.plot(x,y)
plt.plot(x, y, color='green', linestyle='dashed', linewidth=1, marker='o', markerfacecolor='blue', markersize=6)
# plt.plot(x, y, c='g', ls='--', lw=1, marker='o', mfc='blue', ms=6)#这是缩小
#装饰plt
# plt.title('自定义标题名称', fontproperties='SimHei')

plt.title(u'正弦曲线',fontdict={'size':20})#设置标题
plt.xlabel(u'弧度',fontdict={'size':16})#设置X轴名称
plt.ylabel(u'正弦值',fontdict={'size':20})#设置Y轴名称

plt.axis([-0.1*np.pi,2.1*np.pi,-1.1,1.1])#设置坐标轴范围
plt.show()

```

**color指定线的颜色，可简写为“c”。颜色的选项为：**

○ 蓝色： ‘b’ (blue)

○ 绿色： ‘g’ (green)

○ 红色： ‘r’ (red)

○ 墨绿： ‘c’ (cyan)

○ 洋红： ‘m’ (magenta)

○ 黄色： ‘y’ (yellow)

○ 黑色： ‘k’ (black)

○ 白色： ‘w’ (white)

○ 灰度表示： e.g. 0.75 ([0,1]内任意浮点数)

○ RGB表示法： e.g. ‘#2F4F4F’ 或 (0.18, 0.31, 0.31)

**linestyle指定线型，可简写为“ls”。线型的选项为：**

○ 实线： ‘-’ (solid line)

○ 虚线： ‘–’ (dashed line)

○ 虚点线： ‘-.’ (dash-dot line)

○ 点线： ‘:’ (dotted line)

○ 无： ”或’ ‘或’None’

**linewidth指定线宽，可简写为“lw”。**

**marker描述数据点的形状**

○ 点线： ‘.’

○ 点线： ‘o’

○ 加号： ‘+

○ 叉号： ‘x’

○ 上三角： ‘^’

○ 上三角： ‘v’

**markerfacecolor指定数据点标记的表面颜色，可 简写为“ mfc”。**

**markersize指定数据点标记的大小，可 简写为“ ms”。**

### 3.4 文本标注和图例

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
from pylab import mpl
#设置字体
mpl.rcParams['font.sans-serif'] = ['SimHei']
mpl.rcParams['axes.unicode_minus'] = False
#获取数据
x = np.linspace(-4, 4, 200)#x轴数据
f1 = np.power(10, x) #函数输出的数据
f2 = np.power(np.e, x)
f3 = np.power(2, x)
#设置图形显示
plt.plot(x, f1, 'r', ls='-', linewidth=2, label='$10^x$')#函数1数据传输到plt 
plt.plot(x, f2, 'b', ls='--', linewidth=2, label='$e^x$')#函数2数据传输到plt 
plt.plot(x, f3, 'g', ls=':', linewidth=2, label='$2^x$')#函数3数据传输到plt 
#设置图形显示样式
plt.axis([-4, 4, -0.5, 8])
plt.text(1, 7.5, r'$10^x$', fontsize=16)
plt.text(2.2, 7.5, r'$e^x$', fontsize=16)
plt.text(3.2, 7.5, r'$2^x$', fontsize=16)
plt.title('幂函数曲线', fontsize=16)
plt.legend(loc='upper left')
plt.show()
```

在绘制图例时，loc用于指定图列的位置，可以用的选项有：

best, upper right, upperleft, lower left, lower right

### 3.5 绘制多轴图

在介绍如何将多幅子图绘制在同一画板的同时，顺便演示如何绘制直线和矩形。我们可以使用subplot函数快速绘制有多个轴的图表。subplot函数的调用形式如下：

subplot(numRows, numCols, plotNum)

subplot将整个绘图区域等分为numRows行 * numCols列个子区域，然后按照从左到右，从上到下的顺序对每个子区域进行编号，左上的子区域的编号为1。如果numRows，numCols和plotNum这三个数都小于10的话，可以把它们缩写为一个整数，例如subplot(323)和subplot(3,2,3)是相同的。subplot在plotNum指定的区域中创建一个轴对象。如果新创建的轴和之前创建的轴重叠的话，之前的轴将被删除。

```python
import matplotlib.pyplot as plt
plt.subplot(221) # 两行两列的第1个位置
plt.axis([-1, 2, -1, 2])
plt.axhline(y=0.5, color='b')
plt.axhline(y=0.5, xmin=0.25, xmax=0.75, color='r')
plt.subplot(222) # 两行两列的第2个位置
plt.axis([-1, 2, -1, 2])
plt.axvline(x=0, ymin=0, linewidth=4, color='r')
plt.axvline(x=1.0, ymin=-0.5, ymax=0.5, linewidth=4, color='g')
plt.subplot(212) # 两行一列的第2个位置
plt.axis([-1, 2, -1, 2])
plt.axvspan(1.25, 1.55, facecolor='g', alpha=0.5)
plt.axhspan(0.25, 0.75, facecolor='0.5', alpha=0.5)
plt.show()
```

### 3.6 常用绘图类型

#### 3.6.1 直方图

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
data = np.random.normal(5,3,1000)
plt.hist(data)
bins = np.arange(-5,16,1)
plt.hist(data,bins)#使用自定义的分段区域
plt.show()
```

#### 3.6.2 散点图

使用plot()绘图时，如果指定样式参数为仅绘制数据点（linestyle=’None’），那么所绘制的就是一幅散列图。这

种方法所绘制的点无法单独指定数据点的颜色和大小，而使用scatter()绘制散列图就可以指定每个点的颜色和大小。

plt.scatter函数的调用形式如下：

scatter(x, y, s=None, c=None, marker=None, cmap=None, norm=None, vmin=None, vmax=None, 

alpha=None, linewidths=None, verts=None, edgecolors=None, hold=None, data=None, **kwargs)

scatter()的前两个参数是数组，分别指定每个点的X轴和Y轴的坐标。s参数指定点的大 小，值和点的面积成正比，它

可以是一个数，指定所有点的大小，也可以是数组，分别对每个点指定大小。c参数指定每个点的颜色，可以是数值

或数组。这里使用一维数组为每个点指定了一个数值。通过颜色映射表，每个数值都会与一个颜色相对应。默认的颜

色映射表中蓝色与最小值对应，红色与最大值对应。当c参数是形状为(N,3)或(N,4)的二维数组时，则直接表示每个点

的RGB颜色。marker参数设置点的形状，可以是个表示形状的字符串，也可以是表示多边形的两个元素的元组，第一

个元素表示多边形的边数，第二个元素表示多边形的样式，取值范围为0、1、2、3。0表示多边形，1表示星形，2表

示放射形，3表示忽略边数而显示为圆形。alpha参数设置点的透明度。facecolors参数为“none”时，表示散列点

没有填充色。

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
#数据
x = np.random.rand(50)#数据维度
y = np.random.rand(50)#数据维度

#修饰
area = np.pi*(15.*np.random.rand(50))**2 #设置面积
color = 2*np.pi*np.random.rand(50) #设置颜色

plt.scatter(x,y,s=area,c=color)#将数据传送到plt
plt.show()#将图形展示出来
```

#### 3.6.3 梯形图、柱状图、填充图

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt

#生成数据
n = np.array([0,1,2,3,4,5])
x = np.linspace(-0.75,1,100)

plt.subplot(131)
plt.step(n,n**2,lw=2)
plt.subplot(132)
plt.bar(n,n**2,align='center',width=0.5,alpha=1)
plt.subplot(133)
plt.fill_between(x,x**2,x**3,color='green',alpha=0.5)

plt.show()
```

#### 3.6.4 对数坐标

plot()所绘制图表的X-Y轴坐标都是算术坐标。绘制对数坐标图的函数有三个：semilogx()、semilogy()和loglog(),它

们分别绘制X轴为对数坐标、Y轴为对数坐标以及两个轴都为对数坐标时的图表。

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
#生成数据
x = np.linspace(0,3,100)
y = np.power(2,np.power(2,x))

#画图
plt.subplot(121)
plt.semilogy(x,y,'-r')
plt.subplot(122)
plt.plot(x,y,'--g')
plt.show()
```

#### 3.6.5 极坐标绘图

极坐标系是和笛卡尔(X-Y)坐标系完全不同的坐标系，极坐标系中的点由一个夹角和一段相对中心点的距离来表

示。polar(theta, r, **kwargs)可以直接创建极坐标子图并在其中绘制曲线。也可以使用程序中调用subplot()创建子

图时通过设 polar参数为True,创建一个极坐标子图，然后调用plot()在极坐标子图中绘图。

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
#生成数据
theta = np.arange(0, 2*np.pi, 0.02)
#画图
plt.polar(theta, 1.4*np.cos(5*theta), "--", linewidth=2)
plt.polar(theta, 1.8*np.cos(4*theta), linewidth=2)
plt.rgrids(np.arange(0.5, 2, 0.5), angle=45)
plt.thetagrids([0, 60])
plt.show()
```

### 3.7 2D绘图

#### 3.7.1 等值线图

所谓等值线，是指由函数值相等的各点连成的平滑曲线。等值线可以直观地表示二元函数值的变化趋势，例如等值线

密集的地方表示函数值在此处的变化较大。matplotlib中可以使用contour()和contourf()描绘等值线，它们的区别

是：contourf()所得到的是带填充效果的等值线。

```python
#引用包
import numpy as np
import matplotlib.pyplot as plt
#生成数据
y, x = np.ogrid[-2:2:200j, -3:3:300j]
z = x * np.exp( - x**2 - y**2)
extent = [np.min(x), np.max(x), np.min(y), np.max(y)]
plt.subplot(121)
cs = plt.contour(z, 10, extent=extent)
plt.clabel(cs)
plt.subplot(122)
plt.contourf(x.reshape(-1), y.reshape(-1), z, 20)
plt.show()
```

为了更淸楚地区分X轴和Y轴，这里让它们的取值范围和等分次数均不相同.这样得 到的数组z的形状为(200, 300),它的

第0轴对应Y轴、第1轴对应X轴。

调用contour()绘制数组z的等值线图，第二个参数为10,表示将整个函数的取值范围等分为10个区间,即显示的等值线

图中将有9条等值线。可以使用extent参数指定等值线图的X轴和Y轴的数据范围。

contour()所返回的是一个QuadContourSet对象， 将它传递给clabel()，为其中的等值线标上对应的值。

调用contourf(),绘制将取值范围等分为20份、带填充效果的等值线图。这里演示了另外一种设置X、Y轴取值范围的

方法，它的前两个参数分别是计算数组z时所使用的X轴和Y轴上的取样点,这两个数组必须是一维的。

#### 3.7.2 二维数据的平面色彩显示

```python
import numpy as np
import matplotlib.pyplot as plt
data=np.clip(np.random.randn(5,5),-1,1)
plt.subplot(221)
plt.imshow(data)
plt.subplot(222)
plt.imshow(data,cmap=plt.cm.cool)
plt.subplot(223)
plt.imshow(data,cmap=plt.cm.hot)
plt.colorbar()
plt.subplot(224)
im = plt.imshow(data,cmap=plt.cm.winter)
plt.colorbar(im, cmap=plt.cm.winter, ticks=[-1,0,1])
plt.show()
```

#### 3.7.3  3D绘图

虽然matplotlib主要专注于绘图，并且主要是二维的图形，但是它也有一些不同的扩展，能让我们在地理图上绘图，

让我们把Excel和3D图表结合起来。在matplotlib的世界里，这些扩展叫做工具包（toolkits）。工具包是一些关注在

某个话题（如3D绘图）的特定函数的集合。

比较流行的工具包有Basemap、GTK 工具、Excel工具、Natgrid、AxesGrid和mplot3d。

mpl_toolkits.mplot3工具包提供了一些基本的3D绘图功能，其支持的图表类型包括散点图（scatter）、曲面图

（surf）、线图（line）和网格图（mesh）。虽然mplot3d不是一个最好的3D图形绘制库，但是它是伴随着

matplotlib产生的，因此我们对其接口已经很熟悉了。

下面是一个使用plot_surface绘制3d曲面图的例子。

```python
import numpy as np
import matplotlib.pyplot as plt
import mpl_toolkits.mplot3d
x, y = np.mgrid[-2:2:50j,-2:2:50j]
z = x*np.exp(-x**2-y**2)
ax = plt.subplot(111,projection='3d')
ax.plot_surface(x,y,z,rstride=2,cstride=1,cmap=plt.cm.coolwarm,alpha=0.8)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
plt.show()

```

