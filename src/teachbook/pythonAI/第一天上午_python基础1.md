---
title: 第1天上午_Python基础1
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 1
---

# 第一天上午-python基础1

## 1. Python简介
[python概述](../python/ch03.md)

## 2. python编程环境搭建
## （1）PyCharm

### 简介
PyCharm 是由 JetBrains 公司开发的专业级 Python 集成开发环境（IDE），提供完整的开发工具链：
- **版本分类**：Community（社区版，免费开源）和 Professional（专业版，付费，支持 Web 框架、数据库工具等高级功能）
- **核心优势**：
  - 智能代码补全、语法高亮和错误检查
  - 强大的调试器和测试工具
  - 内置版本控制（Git/SVN）
  - 项目结构管理、虚拟环境支持
  - 专业版额外支持 Django/Flask 等 Web 框架、数据库工具、科学计算插件
- **适用场景**：中大型项目开发、Web 应用、企业级软件开发 

### 安装方法（2026 最新版）
**前提**：需先安装 Python（建议 3.8+ 版本）

#### Windows 系统：
1. 访问官网下载：[https://www.jetbrains.com/pycharm/download/](https://www.jetbrains.com/pycharm/download/)
2. 选择版本：
   - 初学者/普通开发 → 下载 **Community 版**
   - 专业开发/Web 开发 → 下载 **Professional 版**（可试用 30 天）
3. 运行安装程序：
   - 勾选 `.py` 文件关联
   - 勾选 **"Add to PATH"**（方便命令行调用）
   - 选择安装路径（建议默认）
   - 保持默认组件选项，点击 **Install**
4. 首次启动配置：
   - 选择 UI 主题（Light/Dark）
   - 配置 Python 解释器：`File → Settings → Project → Python Interpreter` → 选择已安装的 Python 路径

#### macOS/Linux：
- macOS：通过官网下载 `.dmg` 文件拖拽安装，或使用 Homebrew：`brew install --cask pycharm-community`
- Linux：下载 `.tar.gz` 解压后运行 `bin/pycharm.sh`，或通过 Snap：`sudo snap install pycharm-community --classic`

> 💡 **提示**：PyCharm 2026 版本（当前最新为 2025.3）支持 Apple Silicon 芯片原生运行，启动速度提升 30%

---

## （2）Jupyter Notebook

### 简介
Jupyter Notebook 是基于 Web 的交互式计算环境，核心特点：
- **单元格式编程**：将代码、文本（Markdown）、公式、图表混合编排在同一文档中
- **实时执行**：逐单元格运行代码，即时查看输出结果（含可视化图表）
- **内核支持**：默认支持 Python，也支持 R、Julia 等 40+ 种语言
- **适用场景**：数据科学探索、机器学习实验、教学演示、快速原型开发 
- **生态扩展**：JupyterLab（增强版界面）、JupyterHub（多用户服务器） 

### 安装方法（2026 推荐方案）

#### 方案一：通过 Anaconda（推荐新手）
Anaconda 是数据科学发行版，自带 Jupyter Notebook 和常用库（NumPy/Pandas 等）：
1. 下载 Anaconda：[https://www.anaconda.com/download](https://www.anaconda.com/download)
2. 运行安装程序（Windows 勾选 "Add to PATH"）
3. 安装完成后：
   - Windows：开始菜单 → Anaconda Navigator → 点击 Jupyter Notebook 的 **Launch**
   - 或命令行执行：`jupyter notebook` 

#### 方案二：通过 pip（轻量级安装）
**前提**：已安装 Python 3.7+ 且配置好环境变量
```bash
# 1. 升级 pip（推荐）
python -m pip install --upgrade pip

# 2. 安装 Jupyter
pip install notebook

# 3. 启动（自动在浏览器打开）
jupyter notebook
```
> 启动后默认在 `http://localhost:8888` 打开 Web 界面 

#### 验证安装
```bash
jupyter --version  # 查看版本（2026 年主流为 Notebook 7.x / JupyterLab 4.x）
```

---

## 选择建议
| 场景 | 推荐工具 | 原因 |
|------|----------|------|
| 大型项目/工程开发 | **PyCharm** | 完善的项目管理、调试和重构工具 |
| 数据分析/机器学习实验 | **Jupyter Notebook** | 交互式探索、可视化即时反馈 |
| 教学/报告撰写 | **Jupyter Notebook** | 代码+文档混合排版，便于分享 |
| 全能方案 | **PyCharm + Jupyter 插件** | PyCharm Professional 内置 Jupyter 支持，兼顾两者优势 |

> 💡 **2026 趋势**：JupyterLab 正逐步替代传统 Notebook 成为主流界面；PyCharm 2026 版本强化了对 Jupyter 的原生集成，可在 IDE 内直接运行 Notebook 单元格 

## （3）Visual Studio Code (VS Code)

### 简介
Visual Studio Code（简称 VS Code）是由 Microsoft 开发的**免费开源**、轻量级但功能强大的源代码编辑器，已成为全球最受欢迎的开发者工具之一（2025 年 Stack Overflow 调查中连续 6 年排名第一）[[25]]：

- **核心优势**：
  - **跨平台**：Windows/macOS/Linux 全平台支持，同步配置（通过 Settings Sync）
  - **极致轻量**：启动速度 <1 秒，内存占用仅为 PyCharm 的 1/3
  - **扩展生态**：通过 Marketplace 安装插件实现功能扩展（Python、Jupyter、Docker 等）
  - **内置工具**：集成终端、Git 可视化、调试器、代码片段
  - **AI 增强**：2026 年内置 **GitHub Copilot** 免费基础版（代码自动补全、注释生成）
  - **Jupyter 原生支持**：`.ipynb` 文件可直接编辑运行，无需切换工具 [[23]]

- **适用场景**：
  - 全栈开发（前端 + Python 后端）
  - 轻量级脚本/数据分析（配合 Jupyter 插件）
  - 教学/快速原型开发（启动快、学习曲线平缓）
  - 多语言混合项目（Python + JavaScript/SQL 等）

> 💡 **2026 新特性**：VS Code 1.95+ 版本引入 **"Dev Containers 2.0"**，可一键在 Docker 容器中配置隔离开发环境，彻底解决依赖冲突问题 [[24]]

---

### 安装方法（2026 最新版）

#### 步骤 1：安装 VS Code 本体
| 平台 | 安装方式 |
|------|----------|
| **Windows** | 1. 官网下载：[https://code.visualstudio.com/download](https://code.visualstudio.com/download)<br>2. 运行 `.exe` 安装程序 → 勾选 **"Add to PATH"**（关键！）→ 完成安装 |
| **macOS** | 1. 下载 `.zip` 或使用 Homebrew：<br>`brew install --cask visual-studio-code`<br>2. 拖拽 `Visual Studio Code.app` 到 Applications 文件夹 |
| **Linux (Debian/Ubuntu)** | ```bash<br>wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg<br>sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/<br>sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'<br>sudo apt update && sudo apt install code<br>``` |

> ✅ **验证安装**：终端执行 `code --version`，应输出版本号（2026 年主流为 1.95+）

#### 步骤 2：配置 Python 开发环境（关键！）
VS Code 本身不包含 Python 支持，需通过扩展激活：

1. **安装 Python 扩展**：
   - 打开 VS Code → 左侧活动栏点击 **Extensions（Ctrl+Shift+X）**
   - 搜索 `Python` → 安装 **Microsoft 官方扩展**（作者：Microsoft，下载量 >5000 万）[[26]]
   - *推荐同时安装*：
     - `Pylance`（智能补全引擎）
     - `Jupyter`（支持 `.ipynb` 文件）
     - `Python Indent`（自动缩进优化）

2. **配置 Python 解释器**：
   - 按 `Ctrl+Shift+P` → 输入 `Python: Select Interpreter` → 选择已安装的 Python 路径
   - *若未检测到*：先安装 Python（[python.org/downloads](https://www.python.org/downloads/)），勾选 **"Add Python to PATH"**

3. **（可选）创建虚拟环境**：
   ```bash
   # 在项目目录中执行
   python -m venv .venv          # Windows/macOS/Linux 通用
   # VS Code 会自动检测 .venv 并提示使用
   ```

#### 步骤 3：验证 Python 环境
1. 新建文件 `test.py`，输入：
   ```python
   print("VS Code Python 环境正常！")
   import sys
   print(f"Python 版本: {sys.version}")
   ```
2. 右键 → **Run Python File**，或按 `F5` 启动调试
3. 底部状态栏应显示当前使用的 Python 解释器路径

---

### 与 PyCharm/Jupyter 对比
| 特性 | VS Code | PyCharm | Jupyter Notebook |
|------|---------|---------|------------------|
| **启动速度** | ⚡ 极快 (<1s) | ⏱️ 较慢 (5-10s) | ⚡ 快 (Web 启动) |
| **资源占用** | 低 (~300MB) | 高 (~1.5GB) | 中 (~500MB) |
| **项目管理** | 中（需配置） | 强（开箱即用） | 弱（单文件为主） |
| **交互式计算** | ✅（需 Jupyter 插件） | ✅（专业版内置） | ✅（原生支持） |
| **学习成本** | 低（界面简洁） | 中（功能复杂） | 极低 |
| **适用场景** | 全能轻量级开发 | 专业工程开发 | 数据探索/教学 |

> 💡 **2026 实践建议**：
> - **新手入门**：VS Code + Python 扩展（安装简单、资源占用低）
> - **数据分析**：VS Code 内置 Jupyter（`.ipynb` 文件直接编辑，比独立 Notebook 更易管理代码）
> - **企业级开发**：PyCharm Professional（重构/数据库工具更强大）
> - **终极方案**：VS Code 作为主力编辑器 + **GitHub Codespaces** 云端开发（2026 年免费额度提升至 60 小时/月）[[27]]

---

### 常见问题解决
| 问题 | 解决方案 |
|------|----------|
| 安装后命令行无法识别 `code` | Windows：重装时勾选 **"Add to PATH"**；macOS：`Cmd+Shift+P` → `Shell Command: Install 'code' command` |
| Python 扩展无法激活 | 检查是否安装 Python 本体 → 重启 VS Code → 查看输出面板（Output → Python）错误日志 |
| Jupyter Notebook 无法运行 | 安装内核：`pip install ipykernel` → 重启 VS Code |

> 📌 **官方资源**：
> - Python in VS Code 教程：[https://code.visualstudio.com/docs/python/python-tutorial](https://code.visualstudio.com/docs/python/python-tutorial)
> - 快捷键速查：`Ctrl+K Ctrl+S`（Windows/Linux）或 `Cmd+K Cmd+S`（macOS）



### 3. Python基础语法

(1) [对计算机语言的理解](../python/Python%20思考.md)

(2)[python变量](../python/ch05.md)

(3)[python列表](../python/Python列表.md)

(4)[python字符串](../python/Python字符串.md)

(5)[python字典](../python/ch07.md)

(6)[python元组](../python/ch06.md)



### 4. Python实战

## 🌍 综合实训项目：旅行愿望清单管理器1.0  
**—— 用Python数据结构规划你的梦想之旅 ——**

该项目目的是在**真实场景**中综合运用变量、列表、字符串、字典和元组，同时培养数据建模思维。项目难度梯度设计，基础功能覆盖全部知识点，扩展任务挑战高阶应用。

---

### 📌 项目背景
你正在开发一个旅行愿望清单应用，帮助用户管理梦想目的地。每个目的地需记录：城市名、国家、必去理由、预算、地理坐标和旅行季节。通过这个项目，你将用Python数据结构构建完整的“数据模型”。

---

### 🧩 核心功能要求（必做）

#### 1️⃣ 数据建模（综合运用5种数据类型）
```python
# 示例：一个目的地的数据结构（学生需自行设计完整结构）
destination = {
    "city": "京都",                      # 字符串：城市名
    "country": "日本",                   # 字符串：国家
    "reason": "体验千年古都的禅意",       # 字符串：理由（需用字符串方法处理）
    "budget": 8000,                      # 变量：预算（整数）
    "coordinates": (35.0116, 135.7681),  # 元组：经纬度（不可变）
    "best_season": ("春季", "秋季")       # 元组：最佳旅行季节
}
```

#### 2️⃣ 系统功能（菜单驱动）
实现以下交互式菜单（用`while`循环+`input()`）：
```
===== 旅行愿望清单管理器 =====
1. 添加新目的地
2. 查看所有目的地（格式化输出）
3. 按城市搜索目的地
4. 删除目的地
5. 统计分析（总预算/目的地数量）
6. 退出
请选择操作 (1-6):
```

#### 3️⃣ 关键知识点覆盖表
| 功能模块         | 涉及知识点                          | 实训目标                     |
|------------------|-----------------------------------|----------------------------|
| **添加目的地**   | - 字典创建（键值对）<br>- 字符串输入处理（`.strip()`/`.title()`）<br>- 元组封装坐标 | 掌握复合数据结构构建         |
| **格式化输出**   | - 列表遍历（`for`循环）<br>- 字符串格式化（f-string）<br>- 元组解包（`lat, lon = coord`） | 提升数据展示能力             |
| **城市搜索**     | - 字符串匹配（`.lower()`统一大小写）<br>- 列表+字典组合查询 | 强化字符串操作与数据检索     |
| **统计分析**     | - 变量累加（总预算）<br>- 列表长度（`len()`）<br>- 字典值提取 | 培养数据聚合思维             |
| **数据存储**     | - 列表作为容器存储多个字典          | 理解“列表装字典”的经典模式   |

---

### 🛠️ 实训任务卡（分步指导）

#### ✅ 任务1：初始化数据容器（5分钟）
```python
# 创建空列表存储所有目的地（核心容器）
wishlist = []  # ← 这是贯穿项目的“主变量”

# 预置2个示例目的地（帮助学生快速启动）
wishlist.append({
    "city": "巴黎",
    "country": "法国",
    "reason": "在埃菲尔铁塔下喝咖啡",
    "budget": 12000,
    "coordinates": (48.8588897, 2.320041),
    "best_season": ("春季", "夏季")
})
# 再添加1个目的地（学生自行完成）
```

#### ✅ 任务2：实现添加功能（15分钟）
```python
def add_destination():
    # 字符串处理：统一城市名格式（首字母大写）
    city = input("城市名: ").strip().title()  
    
    # 元组输入：坐标需转换为浮点数元组
    lat = float(input("纬度: "))
    lon = float(input("经度: "))
    coordinates = (lat, lon)  # ← 元组创建
    
    # 字典构建
    new_dest = {
        "city": city,
        "country": input("国家: ").strip(),
        "reason": input("理由: ").strip(),
        "budget": int(input("预算(元): ")),  # ← 变量类型转换
        "coordinates": coordinates,
        "best_season": tuple(input("最佳季节(用空格分隔): ").split())  # ← 字符串→元组
    }
    wishlist.append(new_dest)  # ← 列表操作
    print(f"✓ 已添加 {city} 到愿望清单！")
```

#### ✅ 任务3：实现格式化输出（10分钟）
```python
def show_all():
    print("\n" + "="*50)
    print(f"{'序号':<5}{'城市':<10}{'国家':<8}{'预算':<10}{'坐标'}")
    print("="*50)
    
    for idx, dest in enumerate(wishlist, 1):  # ← 列表遍历+索引
        # 元组解包 + 字符串格式化
        lat, lon = dest["coordinates"]  
        print(f"{idx:<5}{dest['city']:<10}{dest['country']:<8}"
              f"{dest['budget']:<10}{lat:.4f}, {lon:.4f}")
    
    # 变量统计：总预算
    total = sum(d["budget"] for d in wishlist)  # ← 列表推导式+变量累加
    print("="*50)
    print(f"💡 共 {len(wishlist)} 个目的地 | 总预算: ¥{total:,} 元")
```

#### ✅ 任务4：实现搜索功能（10分钟）
```python
def search_by_city():
    keyword = input("输入城市关键词: ").lower()  # ← 字符串标准化
    
    # 列表+字典组合查询
    results = [
        dest for dest in wishlist 
        if keyword in dest["city"].lower()  # ← 字符串匹配
    ]
    
    if results:
        for dest in results:
            print(f"\n📍 {dest['city']}, {dest['country']}")
            print(f"   理由: {dest['reason']}")
            print(f"   预算: ¥{dest['budget']}")
            # 元组解包输出季节
            seasons = " / ".join(dest["best_season"])  # ← 元组→字符串
            print(f"   最佳季节: {seasons}")
    else:
        print("❌ 未找到匹配的目的地")
```

---

### 🌟 挑战任务（选做，加分项）
1. **数据验证**  
   - 添加时检查预算是否为正数（`if budget <= 0: ...`）
   - 坐标范围校验（纬度-90~90，经度-180~180）

2. **高级统计**  
   ```python
   # 按预算排序（列表排序+lambda）
   sorted_list = sorted(wishlist, key=lambda x: x["budget"], reverse=True)
   ```

3. **持久化存储**  
   - 退出前将`wishlist`列表保存到`wishlist.txt`（用`str()`转换）
   - 启动时读取文件恢复数据（为后续文件操作铺垫）

---

### 📝 教师指导建议
1. **分步验收**：  
   - 先验收数据结构设计（检查字典键名是否合理）
   - 再验收单个功能（如先确保`add_destination`能正确存入数据）
   - 最后整合菜单循环

2. **典型错误预警**：  
   - ❌ 混淆列表`append()`和字典`update()` → 强调`wishlist`是**列表**，元素是**字典**
   - ❌ 元组误用列表 → 提问：“坐标需要修改吗？不需要就用元组！”
   - ❌ 字符串大小写匹配失败 → 演示`.lower()`统一处理

3. **思政融合点**：  
   > “用字典组织数据就像规划旅行——每个键（key）是明确的目标，每个值（value）是具体的行动。编程思维能帮我们把模糊的愿望变成可执行的计划！”

---

### 💡 项目价值总结
| 知识点   | 在项目中的体现                          | 现实意义               |
|----------|---------------------------------------|----------------------|
| **变量** | `total`累加预算、`idx`循环计数         | 量化管理资源           |
| **字符串**| `.title()`标准化城市名、`.lower()`搜索 | 数据清洗与用户友好交互 |
| **列表** | `wishlist`存储所有目的地               | 集合管理思维           |
| **字典** | 每个目的地的结构化数据                 | 现实对象的数字化建模   |
| **元组** | 坐标/季节等不可变数据                  | 保护关键数据完整性     |

> ✨ **结语**：当学生运行`show_all()`看到自己规划的“梦想地图”整齐输出时，他们会真切感受到——**Python数据结构不是抽象概念，而是构建数字世界的基石**。这正是实训课的核心价值！