---
title: Python 贪吃蛇
icon: fas fa-list
author: 周子力
order: 35
category:
  - 教学文档
tag:
  - Python
---

# Python 贪吃蛇

## 1.游戏简介

贪吃蛇游戏是一个小型益智游戏，它可以锻炼人们的反应能力，尤其是在开发人的智力方面，很受人们的欢迎。

## 2.游戏需求

功能需求：

一、简单的人机交互

　　1、玩家通过点击方向键实现交互，使蛇在游戏界面中实现上下左右的移动。

　　2、当用户按空格时游戏停止。

二、游戏规定

　　1、当蛇头碰到食物时，食物消失、蛇身增加1，并且在一定时间内生成另外一个食物。

　　2、玩家碰到界面边缘时，蛇头会在界面相对的边缘出现，当蛇头碰见蛇身时，游戏结束

　　3、拥有加分系统，当蛇头吃到食物时，分数累计加一。

![picture 0](https://oss.docs.z-xin.net/196a34029f381df7d6872395f9a1c7179b0d4146daf028f2e69b66fad929d2aa.gif)  



## 3.需求分析

1. 游戏界面
   1. 大小
   2. 界面粒度
   3. 上面的文字（字体，大小，颜色，内容）与图标
   4. 分数，速度等显示
2. 蛇
   1. 蛇的方向
   2. 蛇的长度
   3. 蛇的颜色
   4. 蛇的位置
3. 食物
   1. 食物的位置
   1. 食物的颜色和分值
4. 游戏控制
   1. 键盘（上，下，左，右，空格，ESC）
5. 游戏状态
   1. 开始
   2. 暂停
   3. 结束

## 4.游戏开发设计

### 4.1 游戏架构

### 4.2 游戏映射

- 背景映射（背景一般不变，所以其数据可以用常数来表示）
  - 界面大小，界面为方形，所以有长有宽，需要两个变量来表示：SCREEN_WIDTH，SCREEN_HEIGHT
  - 界面颜色，需要一个变量来表示 SCREEN_BKCOLOR
  - 界面粒度，就是象素的大小，用一个变量来表示 SIZE
  - 界面隔线，有时需要界面上有网格线，可以再加一个变量 LINE_WIDTH
  - 部分数据显示，如分数，速度等。
- 蛇映射
  - 长度，因为是一串方块，所以可以用列表，队列等方式来存。长度可以用SNAKE_LENGTH
  - 移动方向，方向就是使这些方块的坐标发生变量，而坐标有两个，所以方向可以用元组来表示。
  - 颜色，如果颜色不变化，可以用常来表示，如：SNAKE_COLOR
  - 位置，蛇的位置是由这些方块的位置决定的，而每个方块都有坐标，而这些方块就可以放到表示蛇的数据结构里面（如，列表，队列等）

- 食物映射
  - 位置，用坐标元组表示即可
  - 颜色，如果发生随机变量，可以用多种颜色表示，将这些颜色放到列表里面，随机抽取
  - 分值，可以用一个值来表示食物的能量大小。其实分值和颜色可以绑定在一起，也就是说不同的颜色，对应用不用的分值。

- 控制映射
  - 这个需要接收键盘的按键，是用于控制蛇状态和游戏状态的方法。

- 状态映射
  - 退出游戏，接收到退出操作后，执行退出操作
  - 暂停游戏，接收到暂停操作后，执行暂停操作
  - 重新游戏，接收到重新游戏操作后，执行重新游戏操作


上面都是静态的，如何才能动起来，就是靠Pygame的界面刷新，要注意的是：pygame的一功能就是一个照相机，一张张地照片连在一起就是视频，并且可以调节刷新率，就是运动的快慢。

那么如何才能让蛇动起来，就要靠在画一张张蛇的时候，蛇的坐标位置的变化。一种方式是改变蛇中所有方块的坐标，这种方式比如复杂。另一种方式是通过不过添加蛇头方块，同时删除蛇尾方块，这种方式实现简单，并且可以和吃食物后，蛇体增加是一个操作。

有了这些数据，就是靠pygame把这些数据进行绘画，关联，数据的接受与展示。

### 4.3 程序设计

![python教学-第 5 页.drawio](E:\BaiduSyncdisk\baidu\同步空间\zzl\教学\鸿蒙应用开发\教学md文件\图文件\python教学-第 5 页.drawio.png)

本游戏中的关键是，蛇的移动，食物的产生，而这些都与一个核心内容有关，那就是坐标。蛇在窗口里面是有坐标的，食物是有坐标的，而蛇的移动，也就是改变坐标就可以了。蛇吃食物，就是当蛇头的坐标与食物相同时，就代表吃到食物。

#### 4.3.1 包的引入

```python
import random #随机包
import sys#系统包
import time#时间包
import pygame#游戏包
from pygame.locals import * #游戏中的常量工具
from collections import deque #双端序列
```

#### 4.3.2 游戏全局变量

```py
#界面参数
SCREEN_WIDTH=600
SCREEN_HEIGHT=480
SIZE=20 #表示每20是一个单位，
BKGCOLOR=(0,0,0)

#蛇的长度
SNAKE_LENGTH=3
```

#### 4.3.3 蛇

蛇在本游戏中是一串方块，每个方块在游戏窗口中的大小为20*20。而每个方块如何让计算机识别，就是靠坐标，而一条蛇在电脑中应该是方块组成的一个序列。因为这里的蛇要吃食物和生长，还有移动，所以采用双端序列。方便对蛇中的方块坐标进行增加和删除。

注意：在计算机中表示蛇的移动的一个最好的办法，并不是使蛇体中的每个方块都进行移动，而是不断的更新蛇头和扔掉蛇尾。

- 生成

```python
def createSnake():
    snake=deque()  #deque()是一种具有队列和栈的性质的数据结构
    for i in range(SNAKE_LENGTH):
        snake.append((SNAKE_LENGTH-1-i,SCOPE_Y[0])) #生成一个长度为SNAKE_LENGTH的双端队列
    return snake  #返回蛇的数据信息。
```

- 移动

```python
def moveSnake(snake,newpos): #参数为蛇，及新的位置。
    snake.appendleft(newpos) #将新的位置放到蛇的头部
    snake.pop() #将蛇尾部的方块从蛇中删除掉。
    return snake #返回一个新的蛇（更新以后的蛇）
```

#### 4.3.4 食物

```python
#食物
FOOD_STYLE = [(10,(255,0,0)),(20,(0,255,0)),(30,(0,0,255))] #里面有三个元组，每个元组里面又有两类元素，前面的是分数，后面的颜色。不同的颜色对应不用的分数。

```

- 生成

```python
def createFood(snake): #参数为snake，目的是检查生成的食物坐标是否正好是蛇里面的方块的坐标。
    food_x=random.randint(SCOPE_X[0],SCOPE_X[1]) #随机生成食物的x坐标
    food_y = random.randint(SCOPE_Y[0], SCOPE_Y[1]) #随机生成食物的y坐标
    if (food_x,food_y) in snake:  #防止食物的坐标生成在蛇的身上。
        food_x = random.randint(SCOPE_X[0], SCOPE_X[1])
        food_y = random.randint(SCOPE_Y[0], SCOPE_Y[1])
    return food_x,food_y #返回食物的坐标
```

#### 4.3.5 主函数

主函数是将数字化的表示，呈现到界面上。

```py
def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH,SCREEN_HEIGHT)) #设置游戏窗口模式
    pygame.display.set_caption('网安小蛇')#设置标题内容
    
    #因为需要记录成绩得分和显示游戏结束的提示，所以对字体进行了设置。
    font1 = pygame.font.SysFont('SimHei', 24)  # 得分的字体
    font2 = pygame.font.Font(None, 72)  # GAME OVER 的字体
    fwidth, fheight = font2.size('GAME OVER')
    
    score = 0 #初始化得分，一开始是0
    game_over = False #用于让计算机知识是否处于游戏结束的状态。
    game_pause = False #用于记录游戏暂停的状态
    
    snake = createSnake() #生成蛇
    snakedir = (0, 0)  # 用（1，0）向右，（-1，0）向左，（0，1）向下，（0，-1）向上  对蛇中的方块进行坐标的修改即可表示移动。（0，0）表示蛇不动。
    food = createFood(snake) #生成食物，这里只产生了坐标。
    foodstyle=get_food_style() #为生成的食物赋上颜色和分数。也可以考虑与生成食物坐标放在一起。
    
    
    clock = pygame.time.Clock() #为游戏设置一个时钟，用于控制刷新率。
    
    while True:  #进入主循环
        for event in pygame.event.get(): #获取所有的键盘事件
            if event.type == QUIT: #如果事件类型为QUIT，则退出游戏。
                sys.exit()
            elif event.type == KEYDOWN: #如果事件为：有键按下
                if event.key == K_ESCAPE:#则判断为哪一个键？如果是ESC取消键，则退出游戏。
                    sys.exit()
                elif event.key == K_DOWN: #如果是向下的方向键，则表示y坐标加1
                    snakedir = (0,1)
                elif event.key == K_UP:#如果是向上的方向键，则表示y坐标减1
                    snakedir = (0,-1)
                elif event.key == K_RIGHT:#如果是向右的方向键，则表示x坐标加1
                    snakedir = (1,0)
                elif event.key == K_LEFT: #如果是向左的方向键，则表示x坐标减1
                    snakedir = (-1,0)
                elif event.key == K_SPACE:#如果是空格键，则此时蛇不动。
                    snakedir = (0,0)
                    game_pause = not game_pause
                elif event.key == K_RETURN:
                    game_over=False
                    score = 0
                    snake = createSnake()
                    food = createFood(snake)
                    foodstyle=get_food_style()
                    
                    
         screen.fill(BKGCOLOR) #每次都要刷新背景，相当于每画一张图，就可重新换一张纸，而不是在同一张纸上。如果不刷新背景就会出现画面重叠。
        
         #蛇运动
         if snakedir != (0,0): #如果现在控制方向的x,y都是为0，说明不能动。
            newpos = (snake[0][0]+snakedir[0], snake[0][1]+snakedir[1]) #如果不为0，则更新当前的蛇的头部的新位置。
            if newpos[0] >SCOPE_X[1]  or newpos[0]<-SCOPE_X[0] or newpos[1] >SCOPE_Y[1] or newpos[1]<-SCOPE_Y[0]: #如果超出来窗口范围，则game over
                game_over = True
            else: #否则蛇移动到新的位置。
                snake = moveSnake(snake,newpos)
                
         
          if snake[0] == food:#如果蛇的头部坐标等于食物的坐标，则吃掉食物。
                score = score+foodstyle[0] #根据吃掉的食物的类别增加分数
                snake.appendleft(food) #将食物坐标入到蛇的头部
                food = createFood(snake) #产生新的食物
                foodstyle = get_food_style() #获取新食物的类别。
    
    
         # 画蛇
         for s in snake:
            pygame.draw.rect(screen,(255,0,0),(s[0]*SIZE,s[1]*SIZE,SIZE,SIZE))
            print(s)
         
        # 画食物
         pygame.draw.rect(screen,foodstyle[1],(food[0]*SIZE,food[1]*SIZE,SIZE,SIZE))
            
         if game_over: #游戏结束
            snakedir=(0,0) #蛇不再移动
            screen.fill((0,0,0)) #重新刷新屏幕
            print_text(screen, font2, (SCREEN_WIDTH - fwidth) // 2, (SCREEN_HEIGHT - fheight) // 2, 'GAME OVER', (255,0,0)) #在窗口上写出游戏结束提示
        if game_pause: #游戏暂停
            snakedir = (0, 0) #蛇不再移动
            screen.fill((0, 0, 0)) #重新刷新屏幕
            print_text(screen, font2, (SCREEN_WIDTH - fwidth) // 2, (SCREEN_HEIGHT - fheight) // 2, 'GAME PAUSE', (255, 0, 0))#在窗口上写出游戏结束提示
        # 写分数与速度
        # print_text(screen, font1, 30, 7, f'速度: {score // 100}')
        print_text(screen, font1, 450, 7, f'得分: {score}') #打印得分
        #刷新
        pygame.display.update() #刷新屏幕
        #刷新频率
        clock.tick(5)  #设置刷新率。
        
```













