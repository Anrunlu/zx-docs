---
title: 第1天下午_Python基础2
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 1
---

# 第一天下午-python基础2

## 1. python基础语法

（1）[python函数一](../python/Python函数一.md)

（2）[python函数二](../python/Python函数二.md)

（3）[python函数三](../python/Python函数三.md)

（4）[python类与对象一](../python/Python类与对象一.md)

（5）[python类与对象二](../python/Python类与对象二.md)

（6）[python类与对象三](../python/Python类与对象三.md)

## 2. 🌍 综合实训项目：旅行愿望清单管理器 2.0  
**—— 用Python数据结构 + 函数 + 类与对象构建数字梦想地图 ——**

本项目在真实场景中**三位一体**训练核心技能：  
✅ **基础数据结构**（变量/列表/字符串/字典/元组）  
✅ **函数设计**（封装/复用/参数传递）  
✅ **面向对象编程**（类/对象/封装/方法）  
通过渐进式任务设计，学生将体验从过程式到面向对象的思维跃迁。

---

### 📌 项目背景升级
你正在开发专业级旅行愿望清单应用。每个目的地不仅是数据集合，更是具有**行为能力**的智能对象：能自我描述、验证数据、计算旅行成本。通过本项目，你将掌握**用对象建模现实世界**的工程思维。

---

### 🧩 核心架构设计（三位一体训练）

#### 1️⃣ 数据建模三层次（覆盖全部知识点）
```python
# 层次1：基础数据类型（变量/字符串/元组）
city = "京都"                          # 字符串变量
coordinates = (35.0116, 135.7681)      # 元组：不可变坐标
budget = 8000                          # 整型变量

# 层次2：复合结构（字典）
destination_dict = {                   # 字典：键值对组织
    "city": city,
    "coordinates": coordinates,
    "budget": budget
}

# 层次3：智能对象（类与实例）
class Destination:                     # ← 类定义（蓝图）
    def __init__(self, city, budget, coordinates):
        self.city = city              # ← 实例属性（对象专属数据）
        self.budget = budget
        self.coordinates = coordinates
    
    def get_travel_cost(self, days):  # ← 实例方法（对象行为）
        return self.budget * days     # ← 变量运算

# 创建对象（实例化）
kyoto = Destination("京都", 8000, (35.0116, 135.7681))  # ← 对象创建
print(kyoto.get_travel_cost(5))       # 调用对象方法 → 40000
```

#### 2️⃣ 系统功能架构（菜单驱动 + OOP整合）
```
===== 旅行愿望清单管理器 2.0 =====
1. 添加新目的地（函数封装输入 + 类实例化）
2. 查看所有目的地（对象列表遍历 + __str__魔术方法）
3. 按城市搜索（字符串处理 + 对象筛选）
4. 删除目的地（列表操作 + 对象管理）
5. 统计分析（变量聚合 + 字典计数）
6. 旅行成本计算器（函数 + 对象方法组合）
7. 退出
请选择操作 (1-7):
```

---

### 🛠️ 实训任务卡（渐进式四阶段）

#### ✅ 阶段1：基础数据结构  
*目标：用字典+列表构建初始数据模型*
```python
# 任务1.1：创建目的地字典（覆盖字符串/元组/变量）
paris = {
    "city": "巴黎".title(),           # 字符串方法
    "country": "法国",
    "reason": "埃菲尔铁塔下喝咖啡",
    "budget": 12000,                  # 变量
    "coordinates": (48.8588, 2.3200), # 元组
    "best_season": ("春季", "夏季")    # 元组
}

# 任务1.2：用列表管理多个目的地
wishlist = [paris]                    # 列表作为容器

# 任务1.3：添加第二个目的地（学生实践）
kyoto = { ... }                       # 学生自行完成字典构建
wishlist.append(kyoto)                # 列表操作
```

#### ✅ 阶段2：函数封装  
*目标：将重复逻辑提取为可复用函数*
```python
# 任务2.1：创建输入验证函数（字符串处理训练）
def validate_budget(budget_str):
    """验证预算输入 - 函数封装训练"""
    try:
        budget = int(budget_str.strip())  # 字符串→整型转换
        if budget <= 0:
            print("❌ 预算必须大于0！")
            return None
        return budget
    except ValueError:
        print("❌ 请输入有效数字！")
        return None

# 任务2.2：创建目的地工厂函数（函数返回字典）
def create_destination(city, country, budget):
    """工厂函数：标准化创建目的地"""
    return {
        "city": city.strip().title(),     # 字符串标准化
        "country": country.strip().title(),
        "budget": budget,
        "coordinates": (0.0, 0.0),        # 占位元组
        "best_season": ("全年",)
    }

# 任务2.3：调用函数添加目的地
budget = validate_budget(input("预算: "))
if budget:
    new_dest = create_destination("冰岛", "冰岛", budget)
    wishlist.append(new_dest)
```

#### ✅ 阶段3：面向对象重构 ⭐核心训练  
*目标：将字典升级为智能对象*
```python
# 任务3.1：定义Destination类（类设计训练）
class Destination:
    """旅行目的地类 - 封装数据与行为"""
    
    def __init__(self, city, country, reason, budget, 
                 coordinates=(0.0, 0.0), best_season=("全年",)):
        # 属性封装（字符串标准化）
        self.city = city.strip().title()      # ← 实例属性
        self.country = country.strip().title()
        self.reason = reason.strip()
        self.budget = budget
        
        # 元组验证（保护关键数据）
        if not isinstance(coordinates, tuple) or len(coordinates) != 2:
            raise ValueError("坐标必须是二元元组")
        self.coordinates = coordinates        # ← 元组属性
        
        self.best_season = tuple(best_season) # ← 元组转换
    
    # 实例方法1：格式化输出（字符串操作）
    def get_seasons_str(self):
        return " / ".join(self.best_season)   # 元组→字符串
    
    # 实例方法2：成本计算（变量运算）
    def calculate_cost(self, days=7):
        """计算N日旅行总成本"""
        return self.budget * days             # ← 变量乘法
    
    # 魔术方法：自定义字符串表示
    def __str__(self):
        lat, lon = self.coordinates           # ← 元组解包
        return (f"📍 {self.city}, {self.country}\n"
                f"   预算: ¥{self.budget:,}/天 | 坐标: {lat:.4f}, {lon:.4f}\n"
                f"   最佳季节: {self.get_seasons_str()}")

# 任务3.2：实例化对象（对象创建训练）
paris_obj = Destination(
    "巴黎", "法国", "艺术之旅", 12000,
    (48.8588, 2.3200), ("春季", "夏季")
)
print(paris_obj)  # 自动调用__str__ → 格式化输出

# 任务3.3：对象方法调用（行为训练）
print(f"7日巴黎之旅总成本: ¥{paris_obj.calculate_cost(7):,}")
```

#### ✅ 阶段4：Wishlist管理类 
*目标：用类管理对象集合*
```python
# 任务4.1：定义Wishlist类（组合设计训练）
class Wishlist:
    """愿望清单管理器 - 对象容器"""
    
    def __init__(self):
        self.destinations = []  # ← 列表存储Destination对象
    
    def add(self, dest):
        """添加目的地 - 列表操作"""
        if isinstance(dest, Destination):  # 类型检查
            self.destinations.append(dest)
            return True
        return False
    
    def search(self, keyword):
        """搜索目的地 - 字符串匹配 + 列表推导式"""
        kw = keyword.strip().lower()
        return [d for d in self.destinations 
                if kw in d.city.lower() or kw in d.country.lower()]
    
    def total_budget(self):
        """统计总预算 - 变量累加"""
        return sum(d.budget for d in self.destinations)  # ← 列表推导式

# 任务4.2：整合系统（对象协作训练）
my_wishlist = Wishlist()
my_wishlist.add(paris_obj)
my_wishlist.add(Destination("京都", "日本", "禅意之旅", 8500))

# 调用管理类方法
print(f"总预算: ¥{my_wishlist.total_budget():,}")
for dest in my_wishlist.search("日"):
    print(dest)  # 自动调用__str__
```

---

### 🌟 挑战任务（分层进阶）

| 层级 | 任务 | 训练重点 |
|------|------|----------|
| **基础** | 实现`Wishlist.display_all()`方法，格式化输出所有目的地 | 列表遍历 + 对象方法调用 |
| **进阶** | 为`Destination`添加`is_budget_friendly(max_budget)`方法 | 条件判断 + 实例方法设计 |
| **高阶** | 实现`TripPlanner`类，关联多个目的地生成旅行路线 | 类间关系 + 列表操作 |
| **创新** | 添加`@property`装饰器保护budget属性（只读） | 属性封装 + 访问控制 |

```python
# 高阶示例：TripPlanner类设计
class TripPlanner:
    def __init__(self, name):
        self.name = name
        self.destinations = []  # Destination对象列表
    
    def add_destination(self, dest, days):
        """添加带天数的目的地"""
        self.destinations.append({"dest": dest, "days": days})
    
    def total_cost(self):
        """计算整个行程总成本"""
        return sum(item["dest"].budget * item["days"] 
                   for item in self.destinations)
```

---

### 📝 教师指导建议（OOP教学重点）

#### 1. 关键概念对比教学
| 概念 | 过程式（字典） | 面向对象（类） | 教学话术 |
|------|----------------|----------------|----------|
| **数据组织** | `dest["city"]` | `dest.city` | “对象让数据访问更自然，像操作真实事物” |
| **行为归属** | 独立函数`calculate_cost(dest)` | `dest.calculate_cost()` | “方法属于对象，符合‘谁的数据谁处理’原则” |
| **扩展性** | 修改所有使用字典的代码 | 仅扩展类方法 | “新增功能不破坏现有代码，OOP的开放-封闭原则” |

#### 2. 典型错误预警与调试
```python
# 错误1：混淆类与实例
Destination.city  # ❌ 应该 paris.city（实例属性）

# 错误2：忘记实例化
wishlist = Wishlist  # ❌ 缺少()，得到类而非对象
wishlist = Wishlist() # ✓ 正确

# 错误3：属性名拼写错误
paris.budjet  # ❌ 拼写错误 → AttributeError
# 调试技巧：print(dir(paris)) 查看所有属性

# 错误4：元组误用列表（可变性问题）
dest.coordinates = [35.0, 135.7]  # ⚠️ 技术可行但违反设计意图
# 教学强调：“坐标是固定属性，用元组保护数据完整性”
```

#### 3. 思政融合点
> “**Destination类如同人生目标**——每个目标（对象）都有清晰的属性（城市/预算）和实现路径（方法）。**Wishlist类则是梦想清单**，通过科学管理（封装/验证），将模糊的愿望转化为可执行的计划。编程思维培养的不仅是技术能力，更是**目标管理与系统规划的人生智慧**。”

---

### 💡 项目价值总结（三位一体映射）

| Python技能 | 项目中的体现 | 现实工程价值 |
|------------|--------------|--------------|
| **变量** | `total = sum(d.budget ...)` | 资源量化管理 |
| **字符串** | `.strip().title()`标准化 | 数据清洗规范 |
| **列表** | `self.destinations = []` | 集合管理思维 |
| **字典** | （过渡到对象前的中间形态） | 理解数据结构演进 |
| **元组** | `coordinates = (lat, lon)` | 关键数据保护 |
| **函数** | `validate_budget()` | 逻辑复用与测试 |
| **类** | `class Destination:` | 现实世界建模 |
| **对象** | `kyoto = Destination(...)` | 系统组件实例化 |
| **方法** | `dest.calculate_cost(7)` | 对象智能行为 |

> ✨ **教学结语**：  
> 当学生创建`Destination`对象并调用`kyoto.calculate_cost(5)`时，他们不仅在写代码，更在**用对象思维建模现实世界**——这正是从“会写脚本”到“能设计系统”的关键跃迁。虚拟环境中的每个对象，都是通向专业软件工程的基石。

---

### 📚 附：完整项目结构建议（供学生参考）
```
travel_wishlist/
├── models/               # 类定义模块
│   ├── __init__.py
│   ├── destination.py    # Destination类
│   └── wishlist.py       # Wishlist类
├── utils/                # 工具函数
│   ├── __init__.py
│   └── validators.py     # validate_budget等函数
├── main.py               # 主程序（菜单驱动）
└── requirements.txt      # 依赖清单（虚拟环境实践）
```

> 💡 **实训提示**：要求学生在虚拟环境中完成本项目（`python -m venv .venv`），将环境管理与OOP训练结合，培养完整工程素养。