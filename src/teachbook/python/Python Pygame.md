---
title: Python Pygame
icon: fas fa-list
author: 周子力
order: 28
category:
  - 教学文档
tag:
  - Python
---

# Python Pygame

## 5.相关技术

### 1.1 pygame

#### 1.1.2 pygame简介

[Pygame](https://www.pygame.org/tags/pygame)是一个基于Python的游戏开发库，它提供了一系列的工具和接口，使开发人员能够轻松地创建各种类型的游戏，包括2D游戏和简单的3D游戏。

#### 1.1.3 pygame基本知识

在使用Pygame开发游戏之前，您需要了解一些基本概念和术语。下面是一些常用的Pygame概念：

- Surface（表面）：Pygame中的所有图形都是绘制在Surface对象上的。Surface可以是窗口、图像、按钮等，是游戏中最基本的图形对象。
- Rect（矩形）：Pygame中的所有图形都是使用矩形表示的。Rect可以表示Surface的位置、大小等信息，是游戏中常用的对象。
- Event（事件）：Pygame中的所有操作都是通过事件来实现的。事件可以是鼠标点击、键盘按下等用户操作，也可以是游戏中的自定义事件。
- Clock（时钟）：Pygame中的所有动画都是使用时钟实现的。时钟可以控制游戏的帧率、动画速度等。
- Sprite（精灵）：Pygame中的Sprite是一个抽象概念，表示游戏中的可移动对象，例如人物、怪物等。Sprite可以方便地进行移动、碰撞检测等操作。

#### 1.1.4 pygame小例子

```python
import pygame

# 初始化Pygame
pygame.init()

# 设置窗口大小
size = (700, 500)
screen = pygame.display.set_mode(size)

# 设置窗口标题
pygame.display.set_caption("My Game")

# 设置矩形位置和大小
rect_x = 50
rect_y = 50
rect_width = 50
rect_height = 50

# 设置颜色
red = (255, 0, 0)

# 游戏循环
done = False
while not done:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

    # 填充窗口颜色
    screen.fill((255, 255, 255))

    # 绘制矩形
    pygame.draw.rect(screen, red, [rect_x, rect_y, rect_width, rect_height])

    # 更新窗口
    pygame.display.update()

# 退出Pygame 
```

## 2.pygame实现步骤

### 2.1pygame初始化

在使用Pygame之前，需要先初始化Pygame。可以通过以下代码实现Pygame的初始化：

```python
import pygame

# 初始化Pygame
pygame.init()
```

### 2.2创建窗口

创建窗口是游戏开发的第一步。可以使用Pygame提供的`set_mode()`方法创建一个窗口，例如：

```python
# 设置窗口大小
size = (700, 500)
screen = pygame.display.set_mode(size)

# 设置窗口标题
pygame.display.set_caption("My Game")
```

### 2.3处理事件

在Pygame中，所有的操作都是通过事件来实现的。可以使用Pygame提供的`event.get()`方法获取所有的事件，并通过事件类型来判断用户的操作。例如：

```python
# 游戏循环
done = False
while not done:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
```

### 2.4绘制图形

Pygame中的所有图形都是绘制在Surface对象上的。可以使用Pygame提供的各种绘图方法来创建各种图形。例如：

```python
# 绘制矩形
pygame.draw.rect(screen, (255, 0, 0), [50, 50, 50, 50])
```

### 2.5更新窗口

在绘制完图形后，需要使用`pygame.display.update()`方法来更新窗口，使得用户能够看到最新的游戏画面。例如：

```python
# 更新窗口
pygame.display.update()
```

### 2.6控制游戏帧率

在Pygame中，游戏帧率是非常重要的，可以使用Pygame提供的`Clock`类来控制游戏的帧率。例如：

```python
# 创建时钟对象
clock = pygame.time.Clock()

# 控制游戏帧率
clock.tick(60)
```

### 2.7 创建Sprite

Sprite是Pygame中的一个抽象概念，表示游戏中的可移动对象。可以通过继承`pygame.sprite.Sprite`类来创建自己的Sprite对象，例如：

```python
# 创建精灵
class MySprite(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([50, 50])
        self.image.fill((255, 0, 0))
        self.rect = self.image.get_rect()
        self.rect.x = 50
        self.rect.y = 50

# 添加精灵到组中
my_group = pygame.sprite.Group()
my_sprite = MySprite()
my_group.add(my_sprite)
```

### 2.8 碰撞检测

在游戏中，碰撞检测是非常常见的操作。可以使用Pygame提供的`spritecollide()`方法来检测Sprite之间的碰撞。例如：

```python
# 检测碰撞
collision_list = pygame.sprite.spritecollide(my_sprite, other_group, False)
if collision_list:print("碰撞了！")
```



### 2.9 声音和音乐

在游戏中，声音和音乐也是非常重要的元素。可以使用Pygame提供的`mixer`模块来加载和播放声音和音乐。例如：

```python
# 加载音乐
pygame.mixer.music.load("music.mp3")

# 播放音乐
pygame.mixer.music.play(-1)
```

### 2.10 键盘和鼠标输入

在游戏中，键盘和鼠标输入也是非常重要的操作。可以使用Pygame提供的`key`模块和`mouse`模块来检测键盘和鼠标的输入。例如：

```python
# 检测键盘输入
if event.type == pygame.KEYDOWN:
    if event.key == pygame.K_LEFT:
        print("向左移动")
    elif event.key == pygame.K_RIGHT:
        print("向右移动")

# 检测鼠标输入
if event.type == pygame.MOUSEBUTTONDOWN:
    print("鼠标点击")
```

## 3.游戏示例

```python
import pygame

# 初始化Pygame
pygame.init()

# 设置窗口大小
size = (700, 500)
screen = pygame.display.set_mode(size)

# 设置窗口标题
pygame.display.set_caption("My Game")

# 创建精灵
class MySprite(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([50, 50])
        self.image.fill((255, 0, 0))
        self.rect = self.image.get_rect()
        self.rect.x = 50
        self.rect.y = 50

# 添加精灵到组中
my_group = pygame.sprite.Group()
my_sprite = MySprite()
my_group.add(my_sprite)

# 加载音乐
pygame.mixer.music.load("music.mp3")

# 播放音乐
pygame.mixer.music.play(-1)

# 创建时钟对象
clock = pygame.time.Clock()

# 游戏循环
done = False
while not done:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                my_sprite.rect.x -= 10
            elif event.key == pygame.K_RIGHT:
                my_sprite.rect.x += 10
        elif event.type == pygame.MOUSEBUTTONDOWN:
            print("鼠标点击")

    # 绘制背景
    screen.fill((255, 255, 255))

    # 绘制精灵
    my_group.draw(screen)

    # 更新窗口
    pygame.display.update()

    # 控制游戏帧率
    clock.tick(60)

# 退出Pygame
pygame.quit()
```

[资源来源](https://zhuanlan.zhihu.com/p/618198911)

