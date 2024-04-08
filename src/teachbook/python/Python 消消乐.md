---
title: Python 消消乐
icon: fas fa-list
author: 周子力
order: 37
category:
  - 教学文档
tag:
  - Python
---

# Python 消消乐

## 1.游戏简介

很久很久以前，在神秘的阿瑞亚大陆上，有一个被遗忘了很久的小岛，人们称它为“失落之岛”。这个岛屿被茂密的覆盖，其中充满了各种奇异的动植物和神秘的宝藏。这个岛屿的居民们过着平静而和谐的生活，直到有一天，一场突如其来的灾难打破了这份宁静。

这个灾难源于一种被称为“黑暗元素”的神秘力量。黑暗元素侵蚀了失落之岛的深处，引发了一场无法控制的魔法风暴。风暴席卷了整个岛屿，摧毁了无数的家园，迫使岛上的居民们逃离家园。

在这个危难时刻，一位名叫艾瑞克的年轻探险家站了出来。他带领着一支由勇敢的村民们组成的队伍，决定寻找失落的神秘力量，以恢复失落之岛的和平。

在他们的冒险旅程中，艾瑞克和他的队伍发现了一个神奇的地图碎片，这个碎片记录着失落之岛过去的光辉岁月，也隐藏着打开魔法风暴的秘密。通过破解地图碎片上的谜题和挑战，艾瑞克和他的队伍找到了一个古老的神秘宝藏——星星之石。这块石头具有强大的光明力量，可以对抗黑暗元素。

他们通过收集星星之石并组成特定图案，释放出强大的魔法能量，成功地击退了魔法风暴。然而，胜利的代价是他们发现了一种更强大的黑暗力量正在复苏——一个名叫“黑暗魔君”的邪恶生物正在酝酿一场更大的灾难。

为了阻止黑暗魔君的野心，艾瑞克和他的队伍开始了新一轮的冒险。他们必须寻找更多的星星之石，组成更强大的消除图案，才能击败黑暗魔君。在这个过程中，他们遇到了各种挑战和困难，但他们从未放弃，一直坚持下去。

经过无数次的冒险和战斗，艾瑞克和他的队伍终于找到了所有剩余的星星之石，并组成了最强大的消除图案——三消四连。这个消除图案释放出了强大的光明能量，成功地击败了黑暗魔君。在胜利的那一刻，艾瑞克和他的队伍得到了众神的祝福，他们得到了守护失落之岛的力量。

从此以后，失落之岛恢复了往日的宁静与和平。艾瑞克和他的队伍成为了失落之岛的守护者，他们用智慧和勇气守护着这片土地上的生灵。而开心消消乐游戏也成为了失落之岛的传统，每个岛民都可以通过游戏锻炼自己的思维能力和手眼协调能力，同时也可以为失落之岛的和平做出一份贡献。

在游戏中，玩家需要利用各种道具和特效来组合相同颜色的方块，消除并收集尽可能多的星星。随着游戏的进展，玩家还将解锁更多有趣的关卡和角色，并参与到各种有趣的活动和中。这些活动和不仅可以让玩家享受到游戏的乐趣，还可以为失落之岛的繁荣做出贡献。

总的来说，开心消消乐游戏是一个充满冒险和挑战的故事。在这个故事中，玩家不仅可以享受到游戏的乐趣，还可以为失落之岛的和平做出一份贡献。同时，这个游戏也展现了友谊、勇气和智慧的力量，这些品质将一直激励着玩家在未来的生活中不断前行。

## 2.需求分析



![picture 2](https://oss.docs.z-xin.net/9a2d5188deecff512ebef2ab0646c050c4d89eb830587a1e1d13b949d2906b20.gif)  

![picture 0](https://oss.docs.z-xin.net/0582e7dc079c7ae7c6b10242743551b5871044fb2c3ea118f530138695026fef.gif)  





### 2.1游戏界面

- 大小
- 标题
- 钻石方格（大小，线宽，数量）
- 分数显示
- 时间显示
- 游戏状态显示

### 2.2 钻石

2.2.1 属性

- 种类
- 大小
- 坐标
- 速度
- 移动方向
- 目标位置
- 移动距离

2.2.2 动作

- 移动
- 获取位置
- 位置赋值

### 2.3 控制

- 拖动钻石
- 钻石消失
- 钻石补充

## 3.游戏设计

### 3.1 游戏映射

- 背景映射（背景通常不变，一些数据可以用常数来表示，而这些常数可以放在一个文件里面。
  - 界面宽，高  用常量表示
  - 界面颜色，用元组表示
  - 钻子格式大小与数量，用常量表示
  - 分数，时间等数字显示通过是变量来表示
- 钻石映射
  - 钻石可以看作精灵，可以创建精灵类，类属性对应钻石的特征
  - 钻石方格可以用矩阵来对应，即用二维数据来表示
  - 钻石是否可以消除，以及钻石的消失都可以对二组数组进行操作。



### 3.2配置文件

- 配置文件config.py

```python
import os

'''屏幕设置大小'''
SCREENSIZE = (700, 700)
'''元素尺寸'''
NUMGRID = 8
GRIDSIZE = 64
XMARGIN = (SCREENSIZE[0] - GRIDSIZE * NUMGRID) // 2
YMARGIN = (SCREENSIZE[1] - GRIDSIZE * NUMGRID) // 2
'''获取根目录'''
ROOTDIR = os.getcwd()
'''FPS'''
FPS = 30
```

- 钻石精灵类 gemmodel.py

```py
import pygame

class gemSprite(pygame.sprite.Sprite):
    def __init__(self,img_path,size,position,downlen,**kwargs):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load(img_path) #获取钻石图片
        self.image =pygame.transform.smoothscale(self.image,size) #把钻石图谱的大小进行转换，转换成size大小，有长有宽，是个元组
        self.rect = self.image.get_rect() #获取钻石片的边框信息
        self.rect.left,self.rect.top=position #钻石的左上坐标赋值，用于定位图片
        self.target_x = position[0]
        self.target_y = position[1]+downlen #是钻石要达到的位置
        self.downlen = downlen #下落的距离
        self.type = img_path.split('/')[-1].split('.')[0] #获取钻石样式
        self.fixed = False #钻石是否可以游戏的标志
        self.speed_x = 10
        self.speed_y = 10 #钻石移动的速度，包括x和y方向的速度。
        self.direction = 'down'


    def move(self):
        if self.direction == 'down': #向下移动
            self.rect.top =min(self.target_y,self.rect.top+self.speed_y)
            if self.target_y == self.rect.top:
                self.fixed = True

        elif self.direction == 'up': #向下移动
            self.rect.top = max(self.target_y, self.rect.top - self.speed_y)
            if self.target_y == self.rect.top:
                self.fixed = True
                # 左移
        elif self.direction == 'left': #向左移动
            self.rect.left = max(self.target_x, self.rect.left - self.speed_x)
            if self.target_x == self.rect.left:
                self.fixed = True
                # 右移
        elif self.direction == 'right':#向右移动
            self.rect.left = min(self.target_x, self.rect.left + self.speed_x)
            if self.target_x == self.rect.left:
                self.fixed = True

    def getPosition(self):
        return self.rect.left,self.rect.top

    def setPosition(self,position):
        self.rect.left, self.rect.top = position


```

- 游戏控制文件 game.py

```py
import random
import sys
from gemmodel import *
class gemGame():
    #构造函数
    def __init__(self,screen,font,gem_images,cfg,**kwargs):
        self.screen = screen
        self.font = font
        self.gem_images = gem_images
        self.cfg = cfg
        self.reset()

    #游戏开始时的初始化过程
    def reset(self):
        while True:
            self.all_gems = []
            self.gem_group =pygame.sprite.Group()
            for x in range(self.cfg.NUMGRID):
                self.all_gems.append([])
                for y in range(self.cfg.NUMGRID):
                    gem = gemSprite(img_path=random.choice(self.gem_images),size=(self.cfg.GRIDSIZE,self.cfg.GRIDSIZE),
                                   position=[self.cfg.XMARGIN+x*self.cfg.GRIDSIZE,self.cfg.YMARGIN+y*self.cfg.GRIDSIZE-self.cfg.NUMGRID * self.cfg.GRIDSIZE],
                                   downlen=self.cfg.NUMGRID * self.cfg.GRIDSIZE)

                    self.all_gems[x].append(gem)
                    self.gem_group.add(gem)
            if self.isMatch()[0] == 0:
                break
        # 得分
        self.score = 0
        # 拼出一个的奖励
        self.reward = 10
        # 时间
        self.remaining_time = 300

    #游戏主函数
    def run(self):
        clock = pygame.time.Clock()
        #对整个游戏界面中的钻石的位置进行更新的标志
        overall_moving = True
        #指定某些对象个体更新位置
        individual_moving =False

        #点击第一个钻石时，获取的坐标
        gem_selected_xy1 =None

        #点击第二个钻石时，获取的坐标
        gem_selected_xy2 = None

        swap_again = False

        #增加分数时的动作刷新
        add_score = 0


        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT or (event.type == pygame.KEYUP and event.key == pygame.K_ESCAPE):
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.MOUSEBUTTONUP:
                    if(not overall_moving) and (not individual_moving) and (not add_score):
                        postion = pygame.mouse.get_pos()
                        if gem_selected_xy1 is None:
                            gem_selected_xy1 = self.checkSelected(postion)
                        else:
                            gem_selected_xy2 = self.checkSelected(postion)
                            if gem_selected_xy2:
                                if self.swapGem(gem_selected_xy1, gem_selected_xy2):
                                    individual_moving = True
                                    swap_again = False
                                else:
                                    gem_selected_xy1 = None

            if overall_moving :
                overall_moving = not self.dropGems(0,0)
                if not overall_moving:
                    res_match = self.isMatch()
                    add_score = self.removeMatched(res_match)
                    if add_score>0:
                        overall_moving = True


            if individual_moving:
                gem1 = self.getgemByPos(*gem_selected_xy1)
                gem2 = self.getgemByPos(*gem_selected_xy2)
                gem1.move()
                gem2.move()
                if gem1.fixed and gem2.fixed:
                    res_match = self.isMatch()

                    if res_match[0] == 0 and not swap_again:
                        swap_again = True
                        self.swapGem(gem_selected_xy1,gem_selected_xy2)
                    else:
                        add_score = self.removeMatched(res_match)
                        overall_moving = True
                        individual_moving = False
                        gem_selected_xy1 = None
                        gem_selected_xy2 = None




            self.screen.fill((135, 206, 235))
            self.drawGrid()
            self.gem_group.draw(self.screen)
            if gem_selected_xy1:
                self.drawBlock(self.getgemByPos(*gem_selected_xy1).rect)
            pygame.display.update()
            clock.tick(self.cfg.FPS)

    #画钻石方格
    def drawGrid(self):
        for x in range(self.cfg.NUMGRID):
            for y in range(self.cfg.NUMGRID):
                rect = pygame.Rect((self.cfg.XMARGIN + x * self.cfg.GRIDSIZE, self.cfg.YMARGIN + y * self.cfg.GRIDSIZE,
                                    self.cfg.GRIDSIZE, self.cfg.GRIDSIZE))
                pygame.draw.rect(self.screen,(0,0,255),rect,1 )

    #返回选中的钻石的坐标
    def checkSelected(self,postion):
        for x in range(self.cfg.NUMGRID):
            for y in range(self.cfg.NUMGRID):
                if self.getgemByPos(x,y).rect.collidepoint(*postion):
                    return [x,y]
        return None

    #根据坐标，返回钻石精灵
    def getgemByPos(self,x,y):
        return self.all_gems[x][y]

    #查看是否有三个连在一起的钻石，0，表示没有，1表示横向相连，2表示纵向相连
    def isMatch(self):
        for x in range(self.cfg.NUMGRID):
            for y in range(self.cfg.NUMGRID):
                if x+2 < self.cfg.NUMGRID :
                    if self.getgemByPos(x,y).type == self.getgemByPos(x+1,y).type == self.getgemByPos(x+2,y).type:
                        return [1,x,y]
                if y+2 < self.cfg.NUMGRID :
                    if self.getgemByPos(x, y).type == self.getgemByPos(x , y+1).type == self.getgemByPos(x,
                                                                                                         y+2).type:
                        return [2, x, y]
        return [0,x,y]

    #交换两个钻石
    def swapGem(self,gem1_pos,gem2_pos):
        margin = gem1_pos[0]-gem2_pos[0]+gem1_pos[1]-gem2_pos[1]
        if abs(margin) != 1:
            return False
        gem1 = self.getgemByPos(*gem1_pos)
        gem2 = self.getgemByPos(*gem2_pos)
        if gem1_pos[0]-gem2_pos[0] == 1:
            gem1.direction = 'left'
            gem2.direction = 'right'

        if gem1_pos[0]-gem2_pos[0] == -1:
            gem1.direction = 'right'
            gem2.direction = 'left'

        if gem1_pos[1]-gem2_pos[1] == 1:
            gem1.direction = 'up'
            gem2.direction = 'down'

        if gem1_pos[1]-gem2_pos[1] == -1:
            gem1.direction = 'down'
            gem2.direction = 'up'

        gem1.target_x = gem2.rect.left
        gem1.target_y = gem2.rect.top
        gem1.fixed = False
        gem2.target_x = gem1.rect.left
        gem2.target_y = gem1.rect.top
        gem2.fixed = False
        self.all_gems[gem1_pos[0]][gem1_pos[1]]=gem2
        self.all_gems[gem2_pos[0]][gem2_pos[1]]=gem1
        return True

    #画方框，用于标识选中的钻石
    def drawBlock(self, block, color=(255, 0, 255), size=4):
        pygame.draw.rect(self.screen, color, block, size)

    #钻石下落
    def dropGems(self,x,y):
        if not self.getgemByPos(x,y).fixed:
            self.getgemByPos(x,y).move()
        if x<self.cfg.NUMGRID -1:
            x+=1
            return self.dropGems(x,y)
        elif y<self.cfg.NUMGRID -1:
            x=0
            y+=1
            return self.dropGems(x,y)
        else:
            return self.isFull()

    #检查是不是方程里面全是fixed的钻石，如果是，返回True
    def isFull(self):
        for x in range(self.cfg.NUMGRID):
            for y in range(self.cfg.NUMGRID):
                if not self.getgemByPos(x, y).fixed:
                    return False
        return True

    #移除匹配的钻石，并赋与分数
    def removeMatched(self,res_match):
        if res_match[0]>0:
            self.genNewGem(res_match)
            self.score += self.reward
            return self.reward
        return 0

    #当三个连在一起的时候，消除钻石，将上面的钻石下落，并产生新的钻石。
    def genNewGem(self,res_match):
        if res_match[0] == 1:
            start = res_match[2]
            while start > -2:

                for e in [res_match[1],res_match[1]+1,res_match[1]+2]:
                    gem = self.getgemByPos(*[e,start])
                    if start == res_match[2]:
                        self.gem_group.remove(gem)
                        self.all_gems[e][start]=None
                    elif start >=0:
                        gem.target_y+=self.cfg.GRIDSIZE
                        gem.fixed = False
                        gem.direction = 'down'
                        self.all_gems[e][start+1] = gem
                    else:
                        gem = gemSprite(img_path=random.choice(self.gem_images),
                                        size=(self.cfg.GRIDSIZE,self.cfg.GRIDSIZE),
                                        position=[self.cfg.XMARGIN + e * self.cfg.GRIDSIZE,
                                                      self.cfg.YMARGIN - self.cfg.GRIDSIZE],
                                        downlen=self.cfg.GRIDSIZE)
                        self.gem_group.add(gem)
                        self.all_gems[e][start+1] = gem

                start-=1

        elif res_match[0] == 2:
            start = res_match[2]
            while start>-4:
                if start==res_match[2]:
                    for e in range(0,3):
                        gem = self.getgemByPos(*[res_match[1],start+e])
                        self.gem_group.remove(gem)
                        self.all_gems[res_match[1]][start+e]=None
                elif start >= 0:
                    gem = self.getgemByPos(*[res_match[1],start])
                    gem.target_y+=self.cfg.GRIDSIZE*3
                    gem.fixed = False
                    gem.direction = 'down'
                    self.all_gems[res_match[1]][start+3]=gem
                else:
                    gem = gemSprite(img_path=random.choice(self.gem_images),
                                    size=(self.cfg.GRIDSIZE,self.cfg.GRIDSIZE),
                                    position=[self.cfg.XMARGIN + res_match[1] * self.cfg.GRIDSIZE,
                                                  self.cfg.YMARGIN + start * self.cfg.GRIDSIZE],
                                    downlen=self.cfg.GRIDSIZE*3)
                    self.gem_group.add(gem)
                    self.all_gems[res_match[1]][start+3] = gem
                start -= 1
```

- 主文件 main.py

```py
import os
import config as cfg
from game import *


def main():
    pygame.init()
    screen = pygame.display.set_mode(cfg.SCREENSIZE)
    pygame.display.set_caption('网安消消乐')
    font = pygame.font.Font('freesansbold.ttf')

    gem_images = []
    for i in range(1,8):
        gem_images.append(os.path.join(cfg.ROOTDIR, 'imgs\gem%s.png' % i))
    gem_game = gemGame(screen, font, gem_images, cfg)
    gem_game.run()

if __name__ == '__main__':
    main()

```

