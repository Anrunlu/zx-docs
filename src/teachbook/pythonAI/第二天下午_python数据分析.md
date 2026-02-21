---
title: 第2天下午_Python数据分析
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 3
---



## 🌇 下午模块讲义  
### 主题：可视化洞察与机器学习落地  
**核心目标**：掌握4类可视化图表，完成用户购买预测模型并生成营销名单  

---

### python可视化包

(1)[matplotlib](../python/Python%20Matplotlib.md)

### 14:00-15:00｜任务4：业务可视化（解决中文显示问题）  
**教学目标**：掌握中英文自适应可视化方案，产出3类业务图表  

#### 教师痛点导入  
> “90%学员遇到过中文乱码（展示方框图），今天彻底解决！  
> **三重保障方案**：  
> 1️⃣ 硬编码字体路径（Windows最可靠）  
> 2️⃣ 全局语言开关（教学进度保障）  
> 3️⃣ 保存参数优化（避免截断）”

**代码**（关键配置）  
```python
# 【终极中文方案】放在所有绘图代码之前
import matplotlib.pyplot as plt
import os

# 方案1: 优先使用系统SimHei
if os.path.exists('C:/Windows/Fonts/simhei.ttf'):
    plt.rcParams['font.sans-serif'] = ['SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    USE_CHINESE = True
else:
    USE_CHINESE = False  # 自动回退英文

# 方案2: 全局语言开关（学员可手动修改）
GLOBAL_USE_CHINESE = USE_CHINESE  # 设为False强制英文
```

**教学演示**  
```python
# 图1：24小时活跃度（带中文标题）
labels = {'title': '用户24小时活跃度分布' if GLOBAL_USE_CHINESE else 'User Activity Trend'}
plt.figure(figsize=(10,4.5))
hourly_pv = df_clean.groupby('hour')['behavior_type'].count()
plt.plot(hourly_pv.index, hourly_pv.values, marker='o', color='#2E86AB')
plt.title(labels['title'], fontsize=16, fontweight='bold')
plt.xlabel('小时' if GLOBAL_USE_CHINESE else 'Hour')
plt.savefig('trend.png', dpi=200, bbox_inches='tight')  # 关键：bbox_inches避免截断
plt.show()
```

#### 学生实操  
**基础任务**  
```python
# 1. 配置中文字体（复制教师板书代码）
# 2. 绘制24小时活跃度折线图
# 3. 验证：图表标题是否显示中文？如否，将GLOBAL_USE_CHINESE=False重试
```

**挑战任务**  
```python
# 绘制周末vs工作日对比图（双折线）
weekend_pv = df_clean.groupby(['is_weekend','hour'])['behavior_type'].count().unstack(0)
plt.plot(weekend_pv[1], label='周末' if GLOBAL_USE_CHINESE else 'Weekend')
plt.plot(weekend_pv[0], label='工作日' if GLOBAL_USE_CHINESE else 'Weekday')
```

**教学提示**  
- ✅ 成功标志：图表标题/坐标轴显示清晰中文  
- ❌ 问题排查：  
  - 方框 → 检查`plt.rcParams`是否在绘图前设置  
  - 截断 → 检查`bbox_inches='tight'`参数  
- 💡 教学话术：“中文显示是职场高频痛点，掌握此方案可节省未来100小时排查时间”

---

### 15:00-15:10｜休息 & 可视化成果展示  
- 邀请2位学员投屏展示图表  
- 教师点评：“这张热力图清晰展示了周末晚间高峰，可直接用于排班决策”

---

### 15:10-16:20｜任务5：机器学习实战（用户购买预测）  
**教学目标**：完成端到端预测建模，理解特征工程业务价值  

#### 理念导入  
> “机器学习不是魔法，而是**业务规则的自动化**：  
> - 人工规则：加购用户更可能购买 → 逻辑回归自动学习此规则  
> - 业务价值：从‘经验判断’到‘数据驱动’精准营销  
>   
> **今日聚焦3个问题**：  
> 1️⃣ 如何定义预测目标？（未来4小时是否购买）  
> 2️⃣ 什么特征最有预测力？（加购>浏览）  
> 3️⃣ 模型结果如何落地？（生成营销名单）”

#### 教师演示）  
**步骤1：构建预测标签（防数据泄露！）**  
```python
# 业务场景：12月2日20:00预测用户20:00-24:00是否购买
prediction_time = pd.Timestamp('2017-12-02 20:00:00')

# 历史行为（<=20:00）
df_history = df_clean[df_clean['timestamp'] <= prediction_time]

# 未来标签（20:00-24:00购买行为）
future_buy = df_clean[
    (df_clean['timestamp'] > prediction_time) & 
    (df_clean['timestamp'] <= prediction_time + pd.Timedelta(hours=4)) &
    (df_clean['behavior_type'] == 'buy')
]['user_id'].unique()

df_history['will_buy'] = df_history['user_id'].isin(future_buy).astype(int)
```
> 💡 教学重点：“**时间窗口设计是防数据泄露关键**！绝不能用22:00的行为预测20:00的购买”

**步骤2：特征工程（业务驱动）**  
```python
features = df_history.groupby('user_id').agg(
    pv_count=('behavior_type', lambda x: (x=='pv').sum()),    # 浏览次数
    cart_count=('behavior_type', lambda x: (x=='cart').sum()), # 加购次数 ← 关键特征！
    buy_count=('behavior_type', lambda x: (x=='buy').sum()),  # 历史购买
    active_days=('timestamp', lambda x: x.dt.date.nunique())  # 活跃天数
)
```

**步骤3：模型训练与解释**  
```python
# 随机森林（自动处理不平衡）
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(class_weight='balanced')
rf.fit(X_train, y_train)

# 特征重要性（业务价值核心！）
importances = pd.DataFrame({
    'feature': X.columns,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)

print(importances.head(3))
# 输出: cart_count 0.45 → 加购是购买最强信号！
```

#### 学员实操  
**基础任务**  
```python
# 1. 构建will_buy标签（复制教师代码）
# 2. 计算cart_count特征
# 3. 训练随机森林并输出特征重要性前3名
```

**挑战任务**  
```python
# 生成高潜力用户名单（购买概率>60%）
all_users['buy_proba'] = rf.predict_proba(all_users_features)[:,1]
marketing_list = all_users[all_users['buy_proba'] > 0.6]
marketing_list.to_csv('marketing_list.csv', encoding='utf-8-sig')  # Excel友好编码
```

**教学强调**  
- ✅ 业务价值：“加购特征重要性0.45 → 证明运营‘催付’策略有效”  
- ❌ 避免误区：“不追求AUC 0.99，0.85+且可解释的模型更实用”  
- 💡 教学话术：“模型是翻译器：把用户行为翻译成‘购买概率’，让运营精准触达”

---

### 16:20-17:30｜任务6：综合项目实战  
**教学目标**：整合全天技能，产出完整分析报告与营销方案  

#### 任务卡（投影展示）  
```
【终极挑战】生成智能营销方案（90分钟）
1. 可视化：绘制特征重要性条形图（中文标签）
2. 洞察：用1句话总结"什么行为最能预测购买"
3. 落地：导出前100名高潜力用户名单（CSV）
4. 建议：提出1条可执行的营销策略（含预期提升效果）
5. 【挑战】计算"加购未买"用户的召回价值（预计挽回订单数）
```

#### 学员独立完成  
- 提供差异化支持：  
  - 基础学员：提供代码片段拼接任务卡  
  - 进阶学员：挑战“用户流失预警模型”  
- 产出物检查清单：  
  ✅ feature_importance.png（含中文）  
  ✅ marketing_list.csv（100行）  
  ✅ 营销策略文档（1页PPT或Markdown）

#### 成果展示  
- 邀请3位学员分享（每人2分钟）：  
  > “我的发现：加购用户转化率是浏览用户的8倍，建议对加购未买用户发5元优惠券，预计挽回15%流失订单”

---

### 17:30-18:00｜全天总结与职业发展  
**知识图谱回顾**（投影动态演示）  
```
数据清洗 → 特征工程 → 可视化 → 机器学习 → 业务落地
   ↓          ↓           ↓          ↓          ↓
 异常值处理  小时/星期  活跃度分布  购买预测   营销名单
```

**关键思维升华**（15分钟）  
> “今天你掌握的不是4个API，而是**数据驱动决策的完整闭环**：  
> - 清洗数据 → 保证决策基础可靠  
> - 可视化 → 让业务方看懂数据  
> - 机器学习 → 将经验转化为可复用的规则  
> - 生成名单 → 让数据直接产生业务价值  
>   
> **职场竞争力公式**：  
> 数据技能 × 业务理解 × 落地能力 = 不可替代性”

**课后行动指南**（10分钟）  
```markdown
1. 作品集建设（24小时内完成）：
   - 将4张图表+营销名单放入GitHub
   - 撰写1页项目说明（业务问题→解决方案→价值）
   
2. 进阶学习路径（按优先级）：
   ▶ 基础巩固：Kaggle Titanic（分类入门，2小时）
   ▶ 业务深化：天池 User Behavior完整版（本数据集100万行）
   ▶ 工程化：用Streamlit搭建预测看板（周末可完成）
   
3. 面试话术模板：
   “在电商实训中，我通过分析10万条用户行为，
    识别出加购是购买最强信号（特征重要性45%），
    生成精准营销名单，预计提升转化率20%+”
```

> **最后叮嘱**：  
> - 今天写出你的实习日报
---

## 📎 附录：教学支持材料

### 1. 时间管理表（教师用）
| 时间段 | 内容 | 缓冲机制 |
|--------|------|----------|
| 8:00-8:20 | 开篇导入 | 提前5分钟检查环境 |
| 8:20-9:10 | 任务1 | 休息前5分钟提醒进度 |
| 9:10-9:20 | 休息 | 播放轻音乐，收集问题 |
| 9:20-10:30 | 任务2 | 10:15检查进度，调整节奏 |
| 10:30-11:10 | 任务3 | 提供基础/挑战双轨任务 |
| 11:10-12:00 | 综合挑战 | 11:50开始总结，不拖堂 |
| 14:00-15:00 | 可视化 | 中文问题30秒应急方案 |
| 15:00-15:10 | 休息 | 展示优秀上午成果 |
| 15:10-16:20 | 机器学习 | 16:00检查模型训练进度 |
| 16:20-17:30 | 综合项目 | 17:15提醒剩余时间 |
| 17:30-18:00 | 总结 | 严格18:00结束，尊重学员时间 |

### 2. 学员实操速查卡（打印发放）
| 任务 | 关键代码 | 易错点 |
|------|----------|--------|
| 时间转换 | `pd.to_datetime(df['ts'])` | 先检查原始格式 |
| 特征提取 | `df['hour'] = df['ts'].dt.hour` | 必须用`.dt`访问器 |
| 中文显示 | `plt.rcParams['font.sans-serif']=['SimHei']` | 放在绘图前 |
| 样本平衡 | `df.sample(n=len(positive))` | 保留全部正样本 |
| 防数据泄露 | 严格区分历史/未来时间窗口 | 预测时点必须明确 |

### 3. 差异化教学策略
| 学员类型 | 支持方案 | 产出要求 |
|----------|----------|----------|
| 零基础 | 提供代码片段拼接任务卡 | 完成基础任务即可 |
| 有经验 | 挑战任务：用户流失预警模型 | 需完成1项挑战任务 |
| 进度慢 | 简化版数据集（1万行）+ 分步提示 | 降低数据量，保证核心流程 |
| 进度快 | 提供完整版数据集（100万行） | 优化代码性能，处理大数据 |
