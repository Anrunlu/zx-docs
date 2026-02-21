---
title: 第2天上午_Python数据分析
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 2
---


# Python数据分析实训讲义  
## 主题：电商用户行为分析实战（含机器学习预测）  
*——从数据清洗到智能营销的完整闭环*  
**实训时间**：上午 8:00-12:00｜下午 14:00-18:00  

---

## 📅 上午模块讲义（8:00-12:00）  
### 主题：数据清洗与探索性分析  
**核心目标**：掌握Pandas数据处理技能，完成数据清洗并产出3个核心业务指标  

---

## Python数据分析包

(1)[pandas-Series](../python/Python%20Pandas-Series.md)

(2)[pandas-DataFrame](../python/Python%20Pandas-DataFrame.md)

### 8:00-8:20｜开篇导入：数据分析工作流全景  
**教师讲解**  
> 今天我们用真实电商数据解决核心业务问题：  
> **如何通过用户行为预测购买，提升转化率20%？**  
>   
> 看这张图（投影展示）：  
> ```
> 业务问题 → 数据获取 → 清洗加工 → 探索分析 → 可视化 → 机器学习 → 业务落地
> ```  
> 今天我们将走完这个完整闭环，上午聚焦**数据清洗与探索**，下午实现**预测建模与营销落地**。  
>   
> **关键思维转变**：  
> ❌ 旧思维：我会用groupby/pivot_table  
> ✅ 新思维：这个指标能帮运营同学提升多少GMV？”
> GMV（Gross Merchandise Volume） 中文通常称为“商品交易总额”，是电商、零售等互联网行业最核心的业务指标之一。

**互动**  
- “大家日常工作中，最头疼的数据质量问题是什么？”（收集3个典型问题）  
- 教师总结：“缺失值、异常值、时间格式混乱——今天全部解决！”

---

### 8:20-9:10｜任务1：数据加载与快速探查  
**教学目标**：掌握数据探查三板斧（shape/info/value_counts），识别数据质量问题  

#### 教师演示
```python
# 【板书代码】数据探查三板斧
import pandas as pd

# 1. 看形状（多少行/列）
df = pd.read_csv('user_behavior.csv')
print(df.shape)  # 输出: (100000, 5)

# 2. 看结构（字段类型/缺失值）
print(df.info())
# 关键观察: timestamp是object类型 → 需转为datetime

# 3. 看分布（行为类型占比）
print(df['behavior_type'].value_counts(normalize=True))
# 输出: pv 70%, cart 15%, fav 10%, buy 5%
```

**关键知识点**  
| 方法 | 用途 | 业务意义 |
|------|------|----------|
| `df.shape` | 快速评估数据量级 | 10万行适合单机分析，1000万行需分布式 |
| `df.info()` | 识别字段类型错误 | timestamp为object → 无法做时间分析 |
| `value_counts()` | 发现业务分布特征 | 购买仅占5% → 典型不平衡场景 |

#### 学生实操  
**基础任务**（必做）  
```python
# 1. 加载模拟数据（教师提供generate_sample_data函数）
df = generate_sample_data(100000)

# 2. 完成三板斧探查并回答：
#    Q1: 数据共有多少条记录？几个字段？
#    Q2: 哪个字段存在类型问题？（提示：看timestamp）
#    Q3: 购买行为占比多少？是否属于不平衡数据？
```

**挑战任务**（选做）  
```python
# 计算每个用户的平均行为深度（总行为数/活跃天数）
df.groupby('user_id').agg(
    total_actions=('behavior_type', 'count'),
    active_days=('timestamp', lambda x: x.dt.date.nunique())
).assign(avg_depth=lambda x: x['total_actions']/x['active_days'])
```

**教学提示**  
- ✅ 正确做法：先`df.info()`再决定清洗策略  
- ❌ 常见错误：直接`pd.to_datetime()`不检查原始格式 → 报错  
- 💡 教学话术：“数据探查就像医生问诊，先看‘症状’再开‘药方’”

---

### 9:10-9:20｜休息 & 问题收集  
- 教师收集学员共性问题  


---

### 9:20-10:30｜任务2：数据清洗与特征工程  
**教学目标**：掌握4类清洗技巧，完成时间特征提取  

#### 教师讲解（25分钟）  
> “真实数据就像未整理的房间，我们需要：  
> 1️⃣ **扫地**（处理缺失值）→ 本数据无缺失，跳过  
> 2️⃣ **扔垃圾**（处理异常值）→ 识别刷单用户  
> 3️⃣ **归类整理**（类型转换）→ timestamp转datetime  
> 4️⃣ **贴标签**（特征工程）→ 提取小时/星期特征”

**代码**  
```python
# 【关键步骤1】时间字段转换（防错写法）
df['timestamp'] = pd.to_datetime(df['timestamp'])  # 安全转换

# 【关键步骤2】异常值检测（业务规则法）
# 规则：单用户单日行为>1000次视为刷单
daily_actions = df.groupby(['user_id', df['timestamp'].dt.date]).size()
suspicious = daily_actions[daily_actions > 1000].index
df_clean = df[~df.set_index(['user_id', df['timestamp'].dt.date]).index.isin(suspicious)]

# 【关键步骤3】特征工程（业务价值最高！）
df_clean['hour'] = df_clean['timestamp'].dt.hour      # 提取小时
df_clean['weekday'] = df_clean['timestamp'].dt.weekday # 0=周一, 6=周日
df_clean['is_weekend'] = (df_clean['weekday'] >= 5).astype(int) # 周末标识
```

**易错点警示**  
| 错误写法 | 正确写法 | 原因 |
|----------|----------|------|
| `df['hour'] = df['timestamp'].hour` | `df['timestamp'].dt.hour` | Series无hour属性，需通过.dt访问器 |
| `df['is_weekend'] = df['weekday'] >= 5` | `.astype(int)` | 布尔值无法直接用于数值计算 |

#### 学生实操
**基础任务**  
```python
# 1. 完成时间字段转换
df['timestamp'] = pd.to_datetime(df['timestamp'])

# 2. 提取hour/weekday/is_weekend三个特征
# 3. 验证：打印20:00的活跃用户数
print(df[df['hour']==20]['user_id'].nunique())
```

**挑战任务**  
```python
# 会话识别：用户连续行为间隔<30分钟视为同一会话
df_sorted = df.sort_values(['user_id', 'timestamp'])
df_sorted['time_diff'] = df_sorted.groupby('user_id')['timestamp'].diff().dt.total_seconds() / 60
df_sorted['new_session'] = (df_sorted['time_diff'] > 30) | df_sorted['time_diff'].isna()
df_sorted['session_id'] = df_sorted.groupby('user_id')['new_session'].cumsum()
```

**教师演示**  
- 展示清洗前后对比：异常用户从127人→0人  
- 强调业务价值：“清洗后转化率计算更准确，避免刷单干扰决策”

---

### 10:30-11:10｜任务3：核心指标计算  
**教学目标**：计算3个核心业务指标，建立数据→业务的连接  

#### 教师引导  
> “指标不是数字游戏，而是业务语言翻译器：  
> - **UV/PV** → 流量规模与质量  
> - **转化漏斗** → 用户流失环节定位  
> - **高价值用户** → 运营资源投放优先级”

**板书代码**  
```python
# 指标1：日均UV/PV
daily = df_clean.groupby(df_clean['timestamp'].dt.date).agg(
    uv=('user_id', 'nunique'),
    pv=('behavior_type', 'count')
)
print(f"日均UV: {daily['uv'].mean():.0f} | 访问深度: {daily['pv'].mean()/daily['uv'].mean():.2f}")

# 指标2：转化漏斗
funnel = df_clean['behavior_type'].value_counts()
print(f"浏览→加购转化: {funnel['cart']/funnel['pv']*100:.1f}%")
print(f"加购→购买转化: {funnel['buy']/funnel['cart']*100:.1f}%")  # 关键瓶颈！

# 指标3：高价值用户（购买≥3次）
high_value = df_clean[df_clean['behavior_type']=='buy'].groupby('user_id').size()
high_value = high_value[high_value >= 3]
print(f"高价值用户占比: {len(high_value)/df_clean['user_id'].nunique()*100:.1f}%")
```

#### 学员实操  
- 完成指标计算并填写《上午成果卡》：  
  ```
  [ ] 日均UV: ______  [ ] 访问深度: ______
  [ ] 加购→购买转化率: ______% （我的发现：_________）
  [ ] 高价值用户占比: ______%
  ```

---

### 11:10-12:00｜上午综合挑战与总结  
**教学目标**：整合上午技能，完成端到端分析任务  

#### 综合挑战任务（30分钟）  
```python
# 任务：分析周末效应
# 1. 计算周末与工作日的平均PV
# 2. 计算周末20:00-22:00的转化率（购买/浏览）
# 3. 输出结论：周末晚间是否更适合大促活动？
```

**差异化支持**  
- 基础学员：提供代码框架（`df_clean.groupby('is_weekend')...`）  
- 进阶学员：挑战“不同商品类目的转化差异分析”

#### 上午总结  
- **知识图谱回顾**（投影展示思维导图）  
  ```
  数据清洗
  ├─ 异常值处理 → 业务规则法
  ├─ 类型转换 → pd.to_datetime()
  └─ 特征工程 → hour/weekday/is_weekend
        ↓
  核心指标
  ├─ 流量指标：UV/PV
  ├─ 转化指标：漏斗分析
  └─ 用户分层：高价值用户识别
  ```
- **成果验收**：随机抽查3位学员展示上午成果卡  
- **预告下午**：“下午14:00，我们将用这些特征训练预测模型，直接生成可执行的营销名单！”  
- **课间任务**：思考“如果你是运营，会如何利用加购行为提升转化？”

---
