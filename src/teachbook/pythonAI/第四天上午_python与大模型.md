---
title: 第四天上午_Python大模型
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 6
---

## 一天Python+通义千问大模型实战培训方案

### 一、培训总体设计

**培训目标**  
使学员掌握：①通义千问API调用基础 ②Prompt工程技巧 ③RAG应用开发 ④Agent智能体构建 ⑤完整项目实战能力

**培训特色**  
- 以**DashScope SDK**为核心（阿里云官方Python SDK）  
- 采用"理论15分钟+编码45分钟"循环教学模式  
- 所有代码现场可运行，提供完整项目模板  
- 聚焦Qwen3系列最新能力（256K长上下文、混合推理模式）

**前置准备**  
1. 学员需提前注册阿里云账号并开通DashScope服务（免费额度100万tokens）  
2. 安装Python 3.8+、VS Code/Jupyter Notebook  
3. 准备API Key（培训现场指导申请）

---

### 二、全天时间安排

| 时间段 | 模块 | 内容 | 形式 |
|--------|------|------|------|
| **8:00-8:20** | 开场 | 培训目标与环境检查 | 讲解+答疑 |
| **8:20-9:30** | 模块1 | 通义千问API基础调用 | 理论15'+实操45' |
| **9:30-10:40** | 模块2 | Prompt工程与函数调用 | 理论15'+实操45' |
| **10:40-10:55** | 休息 | - | - |
| **10:55-12:00** | 模块3 | 文档解析与向量检索基础 | 理论15'+实操40' |
| **12:00-14:00** | 午休 | - | - |
| **14:00-15:15** | 模块4 | RAG系统构建实战 | 理论15'+实操50' |
| **15:15-16:30** | 模块5 | Agent智能体开发 | 理论15'+实操50' |
| **16:30-16:45** | 休息 | - | - |
| **16:45-18:00** | 模块6 | 综合项目：智能知识助手 | 项目实战70'+总结10' |

---

## 三、上午实训讲义（8:00-12:00）

### 模块1：通义千问API基础调用（8:20-9:30）

#### 1.1 核心理论（15分钟）
```markdown
1. 通义千问模型家族
   - Qwen3-Max：最强通用模型（推荐教学使用）
   - Qwen3-Plus：平衡性能与成本
   - Qwen3-Turbo：高并发场景
   - 特性：256K长上下文、混合专家架构(MoE)、支持推理/非推理双模式 [[23]]

2. API调用两种方式
   - messages模式（推荐）：符合OpenAI规范，支持多轮对话
   - prompt模式：传统单轮文本生成

3. 认证机制
   - API Key通过DashScope控制台获取（非AccessKey）
   - 环境变量安全存储：`export DASHSCOPE_API_KEY=sk-xxx`
```

#### 1.2 实训任务：Hello Qwen（45分钟）
```python
# 任务1：安装与基础调用
# 终端执行
pip install dashscope python-dotenv

# 创建.env文件（安全存储API Key）
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxx

# main.py
import os
import dashscope
from dotenv import load_dotenv
from dashscope import Generation

# 加载环境变量
load_dotenv()
dashscope.api_key = os.getenv('DASHSCOPE_API_KEY')

# 方式1：messages调用（推荐）
response = Generation.call(
    model='qwen3-max',  # 使用最新Qwen3系列
    messages=[
        {'role': 'system', 'content': '你是一名Python教学助手'},
        {'role': 'user', 'content': '用Python写一个冒泡排序函数'}
    ],
    result_format='message'
)
print(response.output.choices[0].message.content)

# 方式2：流式输出（用户体验更佳）
for resp in Generation.call(
    model='qwen3-max',
    messages=[{'role': 'user', 'content': '解释Python装饰器'}],
    stream=True,
    incremental_output=True
):
    print(resp.output.choices[0].message.content, end='', flush=True)
```

**学员任务**  
1. 成功调用API并返回结果  
2. 尝试修改system prompt改变回答风格  
3. 对比流式/非流式输出差异

---

### 模块2：Prompt工程与函数调用（9:30-10:40）

#### 2.1 核心理论（15分钟）
```markdown
1. 高效Prompt设计四要素
   - 角色设定（Role）：明确AI身份
   - 任务描述（Task）：具体可执行
   - 输出格式（Format）：JSON/Markdown等
   - 约束条件（Constraint）：长度/风格限制

2. 函数调用（Function Calling）
   - 让大模型"调用外部工具"的核心能力
   - 典型场景：天气查询、数据库操作、API集成
   - Qwen3对工具调用支持显著增强 [[27]]
```

#### 2.2 实训任务：智能计算器Agent（45分钟）
```python
# calculator_agent.py
import json
import dashscope
from dashscope import Generation

# 定义可用工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "执行数学计算",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "数学表达式，如'2+3*4'"}
                },
                "required": ["expression"]
            }
        }
    }
]

def execute_tool(tool_name, args):
    """工具执行函数"""
    if tool_name == "calculate":
        try:
            # 安全计算（生产环境需用ast.literal_eval替代eval）
            result = eval(args['expression'])
            return f"计算结果: {result}"
        except Exception as e:
            return f"计算错误: {str(e)}"
    return "未知工具"

# 主循环
messages = [
    {"role": "system", "content": "你是一个数学助手，使用calculate工具解决用户问题"}
]

while True:
    user_input = input("\n用户: ")
    if user_input.lower() == 'quit':
        break
    
    messages.append({"role": "user", "content": user_input})
    
    # 调用模型（启用工具调用）
    response = Generation.call(
        model='qwen3-max',
        messages=messages,
        tools=tools,
        tool_choice="auto"  # 让模型自主决定是否调用工具
    )
    
    # 处理模型响应
    assistant_msg = response.output.choices[0].message
    messages.append(assistant_msg)
    
    # 检查是否需要调用工具
    if 'tool_calls' in assistant_msg and assistant_msg['tool_calls']:
        tool_call = assistant_msg['tool_calls'][0]
        tool_name = tool_call['function']['name']
        args = json.loads(tool_call['function']['arguments'])
        
        # 执行工具并返回结果
        tool_result = execute_tool(tool_name, args)
        print(f"\n[工具调用] {tool_name}({args}) → {tool_result}")
        
        # 将工具结果反馈给模型
        messages.append({
            "role": "tool",
            "content": tool_result,
            "tool_call_id": tool_call['id']
        })
        
        # 再次调用模型生成最终回答
        final_resp = Generation.call(
            model='qwen3-max',
            messages=messages
        )
        final_msg = final_resp.output.choices[0].message
        messages.append(final_msg)
        print(f"AI: {final_msg['content']}")
    else:
        print(f"AI: {assistant_msg['content']}")
```

**学员任务**  
1. 实现基础计算器功能  
2. 扩展支持"平方根"、"阶乘"等新函数  
3. 尝试让模型处理"计算(3+5)*2的平方根"等复合问题

---

### 模块3：文档解析与向量检索基础（10:55-12:00）

#### 3.1 核心理论（15分钟）
```markdown
1. RAG（检索增强生成）核心流程
   文档加载 → 文本分块 → 向量嵌入 → 向量存储 → 相似检索 → 生成答案

2. 通义千问文本嵌入模型
   - text-embedding-v3：最新版嵌入模型，支持1024维向量
   - 中英文混合场景表现优异

3. 轻量级向量库选择
   - Chroma：单机开发首选，零配置
   - FAISS：Facebook开源，高性能
```

#### 3.2 实训任务：构建本地知识库（40分钟）
```python
# rag_basic.py
import os
import dashscope
from dashscope import TextEmbedding
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions

load_dotenv()
dashscope.api_key = os.getenv('DASHSCOPE_API_KEY')

# 1. 初始化Chroma向量库
client = chromadb.Client()
collection = client.create_collection(
    name="python_docs",
    embedding_function=embedding_functions.DashScopeEmbeddingFunction(
        api_key=os.getenv('DASHSCOPE_API_KEY'),
        model_name="text-embedding-v3"
    )
)

# 2. 模拟文档数据（实际项目用PyPDF2/Unstructured解析PDF）
documents = [
    "Python列表推导式语法：[x*2 for x in range(10) if x%2==0]",
    "Python装饰器用于修改函数行为，常用@符号定义",
    "Pandas是Python数据分析库，核心数据结构是DataFrame",
    "Flask是轻量级Web框架，适合快速开发RESTful API"
]
ids = [f"id_{i}" for i in range(len(documents))]

# 3. 添加文档到向量库（自动嵌入）
collection.add(
    documents=documents,
    ids=ids
)

# 4. 检索相似内容
query = "如何用Python快速处理数据？"
results = collection.query(
    query_texts=[query],
    n_results=2
)

print(f"问题: {query}")
print("\n检索到的相关知识:")
for doc in results['documents'][0]:
    print(f"  - {doc}")

# 5. 结合大模型生成答案
context = "\n".join(results['documents'][0])
response = dashscope.Generation.call(
    model='qwen3-max',
    messages=[
        {'role': 'system', 'content': '基于以下知识回答问题，不知道就说不知道'},
        {'role': 'user', 'content': f'知识库内容：\n{context}\n\n问题：{query}'}
    ]
)
print(f"\nAI回答: {response.output.choices[0].message.content}")
```

**学员任务**  
1. 成功构建本地向量库并检索  
2. 尝试添加自己的技术笔记文档  
3. 对比"有RAG"和"无RAG"回答质量差异

---
