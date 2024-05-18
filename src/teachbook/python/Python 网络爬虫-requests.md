---
title: Python 网络爬虫-requests
icon: fas fa-list
author: 周子力
order: 62
category:
  - 教学文档
tag:
  - Python
---

# requests模块

##### 知识点：

- 掌握 headers参数的使用
- 掌握 发送带参数的请求
- 掌握 headers中携带cookie
- 掌握 cookies参数的使用
- 掌握 cookieJar的转换方法
- 掌握 超时参数timeout的使用
- 掌握 代理ip参数proxies的使用
- 掌握 使用verify参数忽略CA证书
- 掌握 requests模块发送post请求
- 掌握 利用requests.session进行状态保持

----

> 前面我们了解了爬虫的基础知识，接下来我们来学习如何在代码中实现我们的爬虫



## 1. requests模块介绍

> requests文档<http://docs.python-requests.org/zh_CN/latest/index.html>

### 1.1 requests模块的作用：

- 发送http请求，获取响应数据

### 1.2 requests模块是一个第三方模块，需要在你的python(虚拟)环境中额外安装

- `pip install requests`
- `pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple`

### 1.3 requests模块发送get请求

> 1. 需求：通过requests向百度首页发送请求，获取该页面的源码
>
> 2. 运行下面的代码，观察打印输出的结果

```python
# 1.2.1-简单的代码实现
import requests 

# 目标url
url = 'https://www.baidu.com' 

# 向目标url发送get请求
response = requests.get(url)

# 打印响应内容
print(response.text)
```

----

##### 知识点：掌握 requests模块发送get请求

----



## 2. response响应对象

> 观察上边代码运行结果发现，有好多乱码；这是因为编解码使用的字符集不同早造成的；我们尝试使用下边的办法来解决中文乱码问题

```python
# 1.2.2-response.content
import requests 

# 目标url
url = 'https://www.baidu.com' 

# 向目标url发送get请求
response = requests.get(url)

# 打印响应内容
# print(response.text)
print(response.content.decode()) # 注意这里！
```

1. **response.text是requests模块按照chardet模块推测出的编码字符集进行解码的结果**
2. 网络传输的字符串都是bytes类型的，所以response.text = response.content.decode('推测出的编码字符集')
3. 我们可以在网页源码中搜索`charset`，尝试参考该编码字符集，注意存在不准确的情况

### 2.1 response.text 和response.content的区别：

 - response.text
   - 类型：str
   - 解码类型： requests模块自动根据HTTP 头部对响应的编码作出有根据的推测，推测的文本编码
 - response.content
   - 类型：bytes
   - 解码类型： 没有指定

----

##### 知识点：掌握 response.text和response.content的区别

----



### 2.2 通过对response.content进行decode，来解决中文乱码

- `response.content.decode()` 默认utf-8
- `response.content.decode("GBK")`
- 常见的编码字符集
  - utf-8
  - gbk
  - gb2312
  - ascii  （读音：阿斯克码）	
  - iso-8859-1

----

##### 知识点：掌握 利用decode函数对requests.content解决中文乱码

----



### 2.3 response响应对象的其它常用属性或方法

> `response = requests.get(url)`中response是发送请求获取的响应对象；response响应对象中除了text、content获取响应内容以外还有其它常用的属性或方法：

- `response.url`响应的url；有时候响应的url和请求的url并不一致
- `response.status_code` 响应状态码
- `response.request.headers` 响应对应的请求头
- `response.headers` 响应头
- `response.request._cookies` 响应对应请求的cookie；返回cookieJar类型
- `response.cookies` 响应的cookie（经过了set-cookie动作；返回cookieJar类型
- `response.json()`自动将json字符串类型的响应内容转换为python对象（dict or list）

```python
# 1.2.3-response其它常用属性
import requests

# 目标url
url = 'https://www.baidu.com'

# 向目标url发送get请求
response = requests.get(url)

# 打印响应内容
# print(response.text)
# print(response.content.decode()) 			# 注意这里！
print(response.url)							# 打印响应的url
print(response.status_code)					# 打印响应的状态码
print(response.request.headers)				# 打印响应对象的请求头
print(response.headers)						# 打印响应头
print(response.request._cookies)			# 打印请求携带的cookies
print(response.cookies)						# 打印响应中携带的cookies
```

----

##### 知识点：掌握 response响应对象的其它常用属性

----



## 3. requests模块发送请求

### 3.1 发送带header的请求

> 我们先写一个获取百度首页的代码

```python
import requests

url = 'https://www.baidu.com'

response = requests.get(url)

print(response.content.decode())

# 打印响应对应请求的请求头信息
print(response.request.headers)
```

#### 3.1.1 思考

1. 对比浏览器上百度首页的网页源码和代码中的百度首页的源码，有什么不同？

   - 查看网页源码的方法：
     - 右键-查看网页源代码 或
     - 右键-检查

2. 对比对应url的响应内容和代码中的百度首页的源码，有什么不同？

   - 查看对应url的响应内容的方法：
     1. 右键-检查
     2. 点击 `Net work`
     3. 勾选 `Preserve log` 
     4. 刷新页面
     5. 查看`Name`一栏下和浏览器地址栏相同的url的`Response`

3. 代码中的百度首页的源码非常少，为什么？

   - 需要我们带上请求头信息

     > 回顾爬虫的概念，模拟浏览器，欺骗服务器，获取和浏览器一致的内容

   - 请求头中有很多字段，其中User-Agent字段必不可少，表示客户端的操作系统以及浏览器的信息

#### 3.1.2 携带请求头发送请求的方法

`requests.get(url, headers=headers)`

- headers参数接收字典形式的请求头
- 请求头字段名作为key，字段对应的值作为value

#### 3.1.3 完成代码实现

> 从浏览器中复制User-Agent，构造headers字典；完成下面的代码后，运行代码查看结果

```python
import requests

url = 'https://www.baidu.com'

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"}

# 在请求头中带上User-Agent，模拟浏览器发送请求
response = requests.get(url, headers=headers) 

print(response.content)

# 打印请求头信息
print(response.request.headers)
```

----

##### 知识点：掌握 headers参数的使用

----

### 3.2 发送带参数的请求

> 我们在使用百度搜索的时候经常发现url地址中会有一个 `?`，那么该问号后边的就是请求参数，又叫做查询字符串

#### 3.2.1 在url携带参数

直接对含有参数的url发起请求

```python
import requests

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"}

url = 'https://www.baidu.com/s?wd=python'

response = requests.get(url, headers=headers)

```

#### 3.2.2 通过params携带参数字典

​	1.构建请求参数字典

​	2.向接口发送请求的时候带上参数字典，参数字典设置给params

```python
import requests

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"}

# 这是目标url
# url = 'https://www.baidu.com/s?wd=python'

# 最后有没有问号结果都一样
url = 'https://www.baidu.com/s?'

# 请求参数是一个字典 即wd=python
kw = {'wd': 'python'}

# 带上请求参数发起请求，获取响应
response = requests.get(url, headers=headers, params=kw)

print(response.content)
```

------

##### 知识点：掌握发送带参数的请求的方法

------



### 3.3 在headers参数中携带cookie

> 网站经常利用请求头中的Cookie字段来做用户访问状态的保持，那么我们可以在headers参数中添加Cookie，模拟普通用户的请求。我们以github登陆为例：

#### 3.3.1 github登陆抓包分析

1. 打开浏览器，右键-检查，点击Net work，勾选Preserve log
2. 访问github登陆的url地址 `https://github.com/login`
3. 输入账号密码点击登陆后，访问一个需要登陆后才能获取正确内容的url，比如点击右上角的Your profile访问`https://github.com/USER_NAME`
4. 确定url之后，再确定发送该请求所需要的请求头信息中的User-Agent和Cookie

![picture 0](https://oss.docs.z-xin.net/5fef5c4a026df1c1d1d34b2e24dc3365e7078d4b9a935677b80965e5786116d7.png)  




#### 3.3.2 完成代码

- 从浏览器中复制User-Agent和Cookie
- 浏览器中的请求头字段和值与headers参数中必须一致
- headers请求参数字典中的Cookie键对应的值是字符串

```python
import requests

url = 'https://github.com/USER_NAME'

# 构造请求头字典
headers = {
    # 从浏览器中复制过来的User-Agent
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
    # 从浏览器中复制过来的Cookie
    'Cookie': 'xxx这里是复制过来的cookie字符串'
}

# 请求头参数字典中携带cookie字符串
resp = requests.get(url, headers=headers)

print(resp.text)
```

#### 3.3.3 运行代码验证结果

> 在打印的输出结果中搜索title，html中的标题文本内容如果是你的github账号，则成功利用headers参数携带cookie，获取登陆后才能访问的页面


![picture 1](https://oss.docs.z-xin.net/35a28c4acba46920a4894435d176fdc9ec1f25906c3fe9609f163f05c3de34da.png)  



----

##### 知识点：掌握 headers中携带cookie

----



### 3.4 cookies参数的使用

> 上一小节我们在headers参数中携带cookie，也可以使用专门的cookies参数

1. cookies参数的形式：字典

   `cookies = {"cookie的name":"cookie的value"}`

   - 该字典对应请求头中Cookie字符串，以分号、空格分割每一对字典键值对
   - 等号左边的是一个cookie的name，对应cookies字典的key
   - 等号右边对应cookies字典的value

2. cookies参数的使用方法

   `response = requests.get(url, cookies)`

3. 将cookie字符串转换为cookies参数所需的字典：

   `cookies_dict = {cookie.split('=')[0]:cookie.split('=')[-1] for cookie in cookies_str.split('; ')}`

4. 注意：**cookie一般是有过期时间的，一旦过期需要重新获取**


```python
import requests

url = 'https://github.com/USER_NAME'

# 构造请求头字典
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
}
# 构造cookies字典
cookies_str = '从浏览器中copy过来的cookies字符串'

cookies_dict = {cookie.split('=')[0]:cookie.split('=')[-1] for cookie in cookies_str.split('; ')}

# 请求头参数字典中携带cookie字符串
resp = requests.get(url, headers=headers, cookies=cookies_dict)

print(resp.text)
```

----

##### 知识点：掌握 cookies参数的使用

----



### 3.5 cookieJar对象转换为cookies字典的方法

> 使用requests获取的resposne对象，具有cookies属性。该属性值是一个cookieJar类型，包含了对方服务器设置在本地的cookie。我们如何将其转换为cookies字典呢？

1. 转换方法

   `cookies_dict = requests.utils.dict_from_cookiejar(response.cookies)`

2. 其中response.cookies返回的就是cookieJar类型的对象

3. `requests.utils.dict_from_cookiejar`函数返回cookies字典

----

##### 知识点：掌握 cookieJar的转换方法

----



### 3.6 超时参数timeout的使用

>在平时网上冲浪的过程中，我们经常会遇到网络波动，这个时候，一个请求等了很久可能任然没有结果。
>
>在爬虫中，一个请求很久没有结果，就会让整个项目的效率变得非常低，这个时候我们就需要对请求进行强制要求，让他必须在特定的时间内返回结果，否则就报错。

1. 超时参数timeout的使用方法

   `response = requests.get(url, timeout=3)`

2. timeout=3表示：发送请求后，3秒钟内返回响应，否则就抛出异常

```python
import requests


url = 'https://twitter.com'
response = requests.get(url, timeout=3)     # 设置超时时间

```

----

##### 知识点：掌握 超时参数timeout的使用

----



### 3.7 了解代理以及proxy代理参数的使用

> proxy代理参数通过指定代理ip，让代理ip对应的正向代理服务器转发我们发送的请求，那么我们首先来了解一下代理ip以及代理服务器

#### 3.7.1 理解使用代理的过程

1. 代理ip是一个ip，指向的是一个代理服务器
2. 代理服务器能够帮我们向目标服务器转发请求

![picture 2](https://oss.docs.z-xin.net/79661396537273dc7f24e74a46aaea771b7c34eeebd49dd00ba6f10d94601e02.png)  


#### 3.7.2 正向代理和反向代理的区别

> 前边提到proxy参数指定的代理ip指向的是正向的代理服务器，那么相应的就有反向服务器；现在来了解一下正向代理服务器和反向代理服务器的区别

1. 从发送请求的一方的角度，来区分正向或反向代理
2. 为浏览器或客户端（发送请求的一方）转发请求的，叫做正向代理
   - 浏览器知道最终处理请求的服务器的真实ip地址，例如VPN
3. 不为浏览器或客户端（发送请求的一方）转发请求、而是为最终处理请求的服务器转发请求的，叫做反向代理
   - 浏览器不知道服务器的真实地址，例如nginx

#### 3.7.3 代理ip（代理服务器）的分类

1. 根据代理ip的匿名程度，代理IP可以分为下面三类：

   - 透明代理(Transparent Proxy)：透明代理虽然可以直接“隐藏”你的IP地址，但是还是可以查到你是谁。目标服务器接收到的请求头如下：

     ```
     REMOTE_ADDR = Proxy IP
     HTTP_VIA = Proxy IP
     HTTP_X_FORWARDED_FOR = Your IP
     ```

   - 匿名代理(Anonymous Proxy)：使用匿名代理，别人只能知道你用了代理，无法知道你是谁。目标服务器接收到的请求头如下：

     ```
     REMOTE_ADDR = proxy IP
     HTTP_VIA = proxy IP
     HTTP_X_FORWARDED_FOR = proxy IP
     ```

   - 高匿代理(Elite proxy或High Anonymity Proxy)：高匿代理让别人根本无法发现你是在用代理，所以是最好的选择。**毫无疑问使用高匿代理效果最好**。目标服务器接收到的请求头如下：

     ```
     REMOTE_ADDR = Proxy IP
     HTTP_VIA = not determined
     HTTP_X_FORWARDED_FOR = not determined
     ```

2. 根据网站所使用的协议不同，需要使用相应协议的代理服务。从代理服务请求使用的协议可以分为：

   - http代理：目标url为http协议
   - https代理：目标url为https协议
   - socks隧道代理（例如socks5代理）等：
     1. socks 代理只是简单地传递数据包，不关心是何种应用协议（FTP、HTTP和HTTPS等）。
     2. socks 代理比http、https代理耗时少。
     3. socks 代理可以转发http和https的请求

#### 3.7.4 proxies代理参数的使用

> 为了让服务器以为不是同一个客户端在请求；为了防止频繁向一个域名发送请求被封ip，所以我们需要使用代理ip；那么我们接下来要学习requests模块是如何使用代理ip的

- 用法：

  ```python
  response = requests.get(url, proxies=proxies)
  ```

- proxies的形式：字典

- 例如：

  ```python
  proxies = { 
      "http": "http://12.34.56.79:9527", 
      "https": "https://12.34.56.79:9527", 
  }
  ```

- 注意：如果proxies字典中包含有多个键值对，发送请求时将按照url地址的协议来选择使用相应的代理ip

----

##### 知识点：掌握 代理ip参数proxies的使用

----



### 3.8 使用verify参数忽略CA证书

> 在使用浏览器上网的时候，有时能够看到下面的提示（2018年10月之前的12306网站）：

![picture 3](https://oss.docs.z-xin.net/512962f42a46663ca19f51565909cb65833e0a135d5184bfcc939c488aa06a8e.png)  


- 原因：该网站的CA证书没有经过【受信任的根证书颁发机构】的认证
- **[关于CA证书以及受信任的根证书颁发机构点击了解更多](https://blog.csdn.net/yangyuge1987/article/details/79209473/)**，课上我们不做展开

#### 3.8.1 运行代码查看代码中向不安全的链接发起请求的效果

> 运行下面的代码将会抛出包含`ssl.CertificateError ...`字样的异常

```python
import requests
url = "https://sam.huat.edu.cn:8443/selfservice/"
response = requests.get(url)
```

#### 3.8.2 解决方案

> 为了在代码中能够正常的请求，我们使用`verify=False`参数，此时requests模块发送请求将不做CA证书的验证：verify参数能够忽略CA证书的认证

```python
import requests
url = "https://sam.huat.edu.cn:8443/selfservice/" 
response = requests.get(url,verify=False)
```

----

##### 知识点：掌握 使用verify参数忽略CA证书

----



## 4. requests模块发送post请求

> 思考：哪些地方我们会用到POST请求？
>
> 1. 登录注册（ 在web工程师看来POST 比 GET 更安全，url地址中不会暴露用户的账号密码等信息）
> 2. 需要传输大文本内容的时候（ POST 请求对数据长度没有要求）
>
> 所以同样的，我们的爬虫也需要在这两个地方回去模拟浏览器发送post请求

### 4.1 requests发送post请求的方法

- `response = requests.post(url, data)`

- `data`参数接收一个字典

- **requests模块发送post请求函数的其它参数和发送get请求的参数完全一致**


### 4.2 POST请求练习

下面面我们通过金山翻译的例子看看post请求如何使用：

1. 地址：http://fy.iciba.com/

 

   ##### 思路分析

   1. 抓包确定请求的url地址

      ![picture 4](https://oss.docs.z-xin.net/3bae606220e551d84bd2b13601b19f7ddf2f45f0f505f3286da3778f519f9eae.png) 
   2. 确定请求的参数

     ![picture 6](https://oss.docs.z-xin.net/c66ff7071f56ec3d8e11898c34242f4ce823911cdf8e3d96d284e031c8b8ddb3.png)  


   3. 确定返回数据的位置

     ![picture 7](https://oss.docs.z-xin.net/9e8503709e90a2ea39039dceea6a5b2c3b935f508d1c16f0f9e48a6d0cc5cdaf.png)  


   4. 模拟浏览器获取数据

#### 4.2.3 抓包分析的结论

1. url地址：`http://fy.iciba.com/`

2. 请求方法：POST

3. 请求所需参数：

   ```python
   data = {
       'f': 'auto', # 表示被翻译的语言是自动识别
       't': 'auto', # 表示翻译后的语言是自动识别
       'w': '人生苦短' # 要翻译的中文字符串
   }
   ```

4. **pc端User-Agent**:

   `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36`

#### 4.2.4 代码实现

> 了解requests模块发送post请求的方法，以及分析过移动端的百度翻译之后，我们来完成代码

```python
import requests
import json


class King(object):

    def __init__(self, word):
        self.url = "http://fy.iciba.com/ajax.php?a=fy"
        self.word = word
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
        }
        self.post_data = {
            "f": "auto",
            "t": "auto",
            "w": self.word
        }

    def get_data(self):
        response = requests.post(self.url, headers=self.headers, data=self.post_data)
        # 默认返回bytes类型，除非确定外部调用使用str才进行解码操作
        return response.content

    def parse_data(self, data):

        # 将json数据转换成python字典
        dict_data = json.loads(data)

        # 从字典中抽取翻译结果
        try:
            print(dict_data['content']['out'])
        except:
            print(dict_data['content']['word_mean'][0])

    def run(self):
        # url
        # headers
        # post——data
        # 发送请求
        data = self.get_data()
        # 解析
        self.parse_data(data)

if __name__ == '__main__':
    # king = King("人生苦短，及时行乐")
    king = King("China")
    king.run()
    # python标准库有很多有用的方法，每天看一个标准库的使用
```

----

##### 知识点：掌握 requests模块发送post请求

-----



## 5. 利用requests.session进行状态保持

> requests模块中的Session类能够自动处理发送请求获取响应过程中产生的cookie，进而达到状态保持的目的。接下来我们就来学习它

### 5.1 requests.session的作用以及应用场景

- requests.session的作用
  - 自动处理cookie，即 **下一次请求会带上前一次的cookie**
- requests.session的应用场景
  - 自动处理连续的多次请求过程中产生的cookie

### 5.2 requests.session使用方法

> session实例在请求了一个网站后，对方服务器设置在本地的cookie会保存在session中，下一次再使用session请求对方服务器的时候，会带上前一次的cookie

```python
session = requests.session() # 实例化session对象
response = session.get(url, headers, ...)
response = session.post(url, data, ...)
```

- session对象发送get或post请求的参数，与requests模块发送请求的参数完全一致

### 5.3 课堂测试

> 使用requests.session来完成github登陆，并获取需要登陆后才能访问的页面

#### 5.3.1 提示

1. 对github登陆以及访问登陆后才能访问的页面的整个完成过程进行抓包
2. 确定登陆请求的url地址、请求方法和所需的请求参数
   - 部分请求参数在别的url对应的响应内容中，可以使用re模块获取
3. 确定登陆后才能访问的页面的的url地址和请求方法
4. 利用requests.session完成代码

#### 5.3.2 参考代码

```python
import requests
import re


# 构造请求头字典
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
}

# 实例化session对象
session = requests.session()

# 访问登陆页获取登陆请求所需参数
response = session.get('https://github.com/login', headers=headers)
authenticity_token = re.search('name="authenticity_token" value="(.*?)" />', response.text).group(1) # 使用正则获取登陆请求所需参数

# 构造登陆请求参数字典
data = {
    'commit': 'Sign in', # 固定值
    'utf8': '✓', # 固定值
    'authenticity_token': authenticity_token, # 该参数在登陆页的响应内容中
    'login': input('输入github账号：'),
    'password': input('输入github账号：')
}

# 发送登陆请求（无需关注本次请求的响应）
session.post('https://github.com/session', headers=headers, data=data)

# 打印需要登陆后才能访问的页面
response = session.get('https://github.com/1596930226', headers=headers)
print(response.text)
```



----

##### 知识点：掌握 利用requests.session进行状态保持

----

