---
title: Python 符号雨
icon: fas fa-list
author: 周子力
order: 33
category:
  - 教学文档
tag:
  - Python
---

# 符号雨

## 1.游戏功能

![picture 0](https://oss.docs.z-xin.net/01d46a023fcad5b39150121c8beccd077f20b12da245446bbb75f1bc9ec4d307.gif)  


在屏幕上显示由上至下，类似下雨的多个符号。

## 2.游戏设计

游戏功能分析：在游戏窗口内，显示会移动的符号。

- 游戏窗口，有大小，有标题，有背景颜色。
  - WIDTH: 800
  - HEIGHT:600
  - BKCOLOR:(0,0,0)
- 符号，有内容，有颜色，有速度
  - 内容：符号包含具体的符号和长度，给出符号集，随机抽取。找度也可以随机产生。
  - 颜色：随机产生颜色。
  - 速度：给出速度范围，随机产生速度值。
  - 位置：随机给出精灵位置。
- 一般游戏都有控制功能，即接收键盘或鼠标的输入
  - 这里初步只考虑退出功能

## 3.游戏实现

### 3.1 整个游戏程序架构

- 包的引入（pygame, random, sys)
- 主函数（用于整个游戏功能的实现）
  - 时间设定
  - 窗口设计
  - 标题设计
  - 死循环控制函数
    - 接收键盘与鼠标输入并判断
    - 更新背景
    - 更新精灵状态
    - 帧数控制
- 精灵类的构建（符号精灵的实现）
  - 内容
  - 速度
  - 颜色
  - 精灵大小
  - 精妙位置

### 3.2游戏窗口的实现

```py
pygame.init()			# 初始函数，使用pygame的第一步
screen = pygame.display.set_mode((WIDTH, HEIGHT))	#生成主屏幕screen；第一个参数是屏幕大小
pygame.display.set_caption('符号雨')	# 窗口命名
screen.fill((0, 0, 0))#窗口颜色
```

### 3.3精灵的创建

```py
class Code(pygame.sprite.Sprite):
	def __init__(self):
		pygame.sprite.Sprite.__init__(self)
		self.font = pygame.font.Font('./font.ttf', randomSize())	# 随机字体大小
		self.speed = randomSpeed()			# 随机速度
		self.code = self.getCode()			# 随机长度
		self.image = self.font.render(self.code, True, randomColor())	# 使用已有的文本创建一个位图image，返回值为一个image  随机颜色
		self.image = pygame.transform.rotate(self.image, random.randint(87, 93))	# 讲图像随机旋转角度
		self.rect = self.image.get_rect() #获取精灵的大小
		self.rect.topleft = randomPos()		# 随机位置

	def getCode(self):#获取内容
		length = randomLen() #符号精灵中符号的长度
		code = ''
		for i in range(length):
			code += randomCode() #将随机取出的符号拼接到code中
		return code
	def update(self): #更新符号
		self.rect = self.rect.move(0, self.speed) #在x和y轴方向上移动的距离，0，表示不移动。
		if self.rect.top > HEIGHT:
			self.kill()
```

### 3.4精灵创建中的随机函数

```py
#随机生成一个颜色，是RGB三基色
def randomColor():
	return (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))


# 随机生成一个速度
def randomSpeed():
	return random.randint(SPEED[0], SPEED[1])


# 随机生成一个大小
def randomSize():
	return random.randint(SIZE[0], SIZE[1])


# 随机生成一个长度
def randomLen():
	return random.randint(LEN[0], LEN[1])


# 随机生成一个位置
def randomPos():
	return (random.randint(0, WIDTH), -20)


# 随机生成一个字符串
def randomCode():
	return random.choice('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890')
	# return random.choice('')
```

### 3.5 主函数实现

```py
def main():
    pygame.init()			# 初始函数，使用pygame的第一步
    screen = pygame.display.set_mode((WIDTH, HEIGHT))	#生成主屏幕screen；第一个参数是屏幕大小
    pygame.display.set_caption('Code Rain-居然')	# 窗口命名

    clock = pygame.time.Clock()					# 初始化一个clock对象
    codesGroup = pygame.sprite.Group()			# 精灵组，一个简单的实体容器
    while True:
        clock.tick(30)							# 控制游戏绘制的最大帧率为30，控制刷新帧数
        for event in pygame.event.get():		# 获取键盘或鼠标等输入事件
            if event.type == QUIT:				# 如果是关闭事件，则退出游戏
                pygame.quit()
                sys.exit(0)
        screen.fill((0, 0, 0))					# 填充背景颜色，如果不填充，则会使新旧画面重叠

        codeobject = Code()						# 产生精灵对象
        codesGroup.add(codeobject)				# 添加精灵对象到精灵组
        codesGroup.update() 					# 精灵组中的精灵移动
        codesGroup.draw(screen)					# 将精灵入到屏幕上
        pygame.display.update()					# 刷新屏幕
```



## 4.游戏扩展

- 增加暂停功能
- 可加入雨声音乐
- 可改变符号内容
- 可改变背景颜色

## 5.总结

- 了解游戏设计思路
- 了解游戏代码架构
- 熟悉pygame的常用函数