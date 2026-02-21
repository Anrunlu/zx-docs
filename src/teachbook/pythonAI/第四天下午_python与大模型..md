---
title: 第4天下午_Python大模型
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 7
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


## 四、下午实训讲义（14:00-18:00）

### 模块4：RAG系统构建实战（14:00-15:15）

#### 4.1 进阶技术要点（15分钟）
```markdown
1. 文本分块策略
   - 固定长度分块：简单但可能切断语义
   - 语义分块（推荐）：按段落/标题分割，保留上下文
   - 重叠分块：相邻块保留100-200字符重叠，避免信息割裂

2. 混合检索
   - 向量检索（语义相似）+ 关键词检索（BM25）
   - 通义千问支持多路召回融合

3. Qwen3长上下文优势
   - 256K tokens上下文，可一次性处理整本技术手册 [[23]]
   - 适合法律/医疗等长文档场景
```

#### 4.2 实训任务：企业知识库问答系统（50分钟）
```python
# enterprise_rag.py
import os
import re
import dashscope
from dashscope import Generation, TextEmbedding
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions
from typing import List, Dict

load_dotenv()
dashscope.api_key = os.getenv('DASHSCOPE_API_KEY')

class RAGSystem:
    def __init__(self, collection_name="company_kb"):
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            embedding_function=embedding_functions.DashScopeEmbeddingFunction(
                api_key=os.getenv('DASHSCOPE_API_KEY'),
                model_name="text-embedding-v3"
            )
        )
    
    def semantic_split(self, text: str, max_chunk_size=500) -> List[str]:
        """语义分块：按段落分割 + 长段落二次分割"""
        paragraphs = re.split(r'\n\s*\n', text)
        chunks = []
        
        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
            if len(para) <= max_chunk_size:
                chunks.append(para)
            else:
                # 长段落按句子分割
                sentences = re.split(r'(?<=[。！？.!?])', para)
                current_chunk = []
                current_len = 0
                
                for sent in sentences:
                    if current_len + len(sent) > max_chunk_size and current_chunk:
                        chunks.append(''.join(current_chunk))
                        current_chunk = [sent]
                        current_len = len(sent)
                    else:
                        current_chunk.append(sent)
                        current_len += len(sent)
                
                if current_chunk:
                    chunks.append(''.join(current_chunk))
        
        return chunks
    
    def add_document(self, doc_id: str, content: str, metadata: Dict = None):
        """添加文档到知识库"""
        chunks = self.semantic_split(content)
        ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
        
        self.collection.add(
            documents=chunks,
            ids=ids,
            metadatas=[{**metadata, "chunk_id": i} for i in range(len(chunks))] if metadata else None
        )
        print(f"✓ 添加文档 {doc_id}，生成 {len(chunks)} 个文本块")
    
    def query(self, question: str, top_k=3) -> str:
        """检索+生成完整流程"""
        # 1. 向量检索
        results = self.collection.query(
            query_texts=[question],
            n_results=top_k
        )
        
        # 2. 构建上下文
        context = "\n\n".join([
            f"片段[{i+1}]: {doc}" 
            for i, doc in enumerate(results['documents'][0])
        ])
        
        # 3. 调用大模型生成答案
        response = Generation.call(
            model='qwen3-max',
            messages=[
                {
                    'role': 'system', 
                    'content': '''你是一名企业知识助手，请基于提供的知识库内容回答问题。
                    要求：
                    1. 仅使用知识库中的信息回答
                    2. 如果知识库没有相关信息，请明确告知"知识库中未找到相关信息"
                    3. 回答要简洁专业，避免编造信息'''
                },
                {
                    'role': 'user',
                    'content': f'''知识库内容：
                    {context}

                    问题：{question}'''
                }
            ],
            temperature=0.3  # 降低随机性，提高事实准确性
        )
        
        answer = response.output.choices[0].message.content
        sources = [f"来源: 片段[{i+1}]" for i in range(len(results['documents'][0]))]
        
        return f"{answer}\n\n{' | '.join(sources)}"

# ===== 实战演示 =====
if __name__ == "__main__":
    rag = RAGSystem()
    
    # 模拟企业知识库内容
    company_docs = {
        "hr_policy": """
        员工请假制度：
        1. 年假：工作满1年享5天，每增加1年加1天，上限15天
        2. 病假：需提供医院证明，3天内部门审批，3天以上HR审批
        3. 事假：提前1天申请，单次不超过5天，年累计不超过15天
        4. 产假：女性员工享98天基础产假+30天奖励假
        """,
        "it_guide": """
        IT设备申领流程：
        1. 新员工入职：由部门助理统一申领笔记本电脑、显示器
        2. 设备更换：使用满3年可申请更换，需部门总监审批
        3. 软件安装：联系IT支持邮箱it-support@company.com
        4. 密码重置：访问SSO系统自助重置，或拨打IT热线8001
        """,
        "expense": """
        差旅报销标准：
        一线城市（北京/上海/深圳）：
        - 住宿：800元/晚
        - 餐饮：200元/天
        - 交通：实报实销（需发票）
        
        二线城市：
        - 住宿：500元/晚
        - 餐饮：150元/天
        """
    }
    
    # 添加文档
    for doc_id, content in company_docs.items():
        rag.add_document(doc_id, content, metadata={"doc_type": doc_id})
    
    # 交互式问答
    print("\n" + "="*50)
    print("🚀 企业知识库问答系统已启动")
    print("="*50)
    
    test_questions = [
        "员工工作3年有多少天年假？",
        "笔记本电脑使用多久可以申请更换？",
        "去上海出差住宿标准是多少？",
        "如何重置公司系统密码？"
    ]
    
    for q in test_questions:
        print(f"\n❓ 问题: {q}")
        print(f"💡 答案: {rag.query(q)}")
        print("-"*50)
```

**学员任务**  
1. 运行完整RAG系统，验证问答效果  
2. 尝试添加自己的文档（如课程大纲）  
3. 修改prompt提升回答准确性（如增加"请标注信息来源"）

---

### 模块5：Agent智能体开发（15:15-16:30）

#### 5.1 核心理论（15分钟）
```markdown
1. Agent核心组件
   - 规划（Planning）：任务分解与步骤规划
   - 记忆（Memory）：短期/长期记忆管理
   - 工具（Tools）：外部能力集成
   - 反思（Reflection）：自我评估与修正

2. Qwen3 Agent能力优势
   - BFCL基准测试达70.8分，超越Gemini 2.5 Pro [[26]]
   - 支持复杂任务的多步推理与工具协调
   - 混合推理模式：思维链(Chain-of-Thought) + 直接输出

3. 开发框架选择
   - LangChain：生态丰富，适合快速原型
   - Dify/LangGraph：可视化编排
   - 自研轻量框架：教学场景推荐（理解原理）
```

#### 5.2 实训任务：多工具协调Agent（50分钟）
```python
# multi_tool_agent.py
import os
import json
import datetime
import requests
from typing import Dict, List, Callable
import dashscope
from dashscope import Generation

class ToolRegistry:
    """工具注册中心"""
    def __init__(self):
        self.tools: Dict[str, Dict] = {}
        self.functions: Dict[str, Callable] = {}
    
    def register(self, name: str, description: str, parameters: Dict, func: Callable):
        self.tools[name] = {
            "type": "function",
            "function": {
                "name": name,
                "description": description,
                "parameters": parameters
            }
        }
        self.functions[name] = func
    
    def get_tools_schema(self) -> List[Dict]:
        return [tool for tool in self.tools.values()]
    
    def execute(self, tool_name: str, arguments: Dict) -> str:
        if tool_name not in self.functions:
            return f"错误：未知工具 {tool_name}"
        try:
            return self.functions[tool_name](**arguments)
        except Exception as e:
            return f"工具执行错误: {str(e)}"

# ===== 工具实现 =====
tool_registry = ToolRegistry()

# 工具1：获取当前时间
tool_registry.register(
    name="get_current_time",
    description="获取当前日期和时间",
    parameters={
        "type": "object",
        "properties": {},
        "required": []
    },
    func=lambda: datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
)

# 工具2：简单计算器
tool_registry.register(
    name="calculator",
    description="执行基础数学运算",
    parameters={
        "type": "object",
        "properties": {
            "expression": {"type": "string", "description": "数学表达式，如'2+3*4'"}
        },
        "required": ["expression"]
    },
    func=lambda expression: str(eval(expression))
)

# 工具3：网络搜索模拟（实际项目对接SerpAPI）
tool_registry.register(
    name="web_search",
    description="搜索互联网信息",
    parameters={
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "搜索关键词"}
        },
        "required": ["query"]
    },
    func=lambda query: f"模拟搜索结果：关于'{query}'的最新信息（2026年2月）..."
)

class Agent:
    def __init__(self, model="qwen3-max"):
        self.model = model
        self.messages = [
            {"role": "system", "content": """你是一个智能助手，可以使用以下工具：
            - get_current_time: 获取当前时间
            - calculator: 执行数学计算
            - web_search: 搜索互联网信息
            
            使用工具的规则：
            1. 仔细分析用户需求，选择最合适的工具
            2. 一个任务可能需要多次工具调用
            3. 工具结果返回后，基于结果生成最终回答
            4. 不要编造工具不存在的功能"""}]
    
    def run(self, user_input: str, max_steps=5) -> str:
        self.messages.append({"role": "user", "content": user_input})
        step = 0
        
        while step < max_steps:
            step += 1
            
            # 调用模型（可能触发工具调用）
            response = Generation.call(
                model=self.model,
                messages=self.messages,
                tools=tool_registry.get_tools_schema(),
                tool_choice="auto"
            )
            
            msg = response.output.choices[0].message
            self.messages.append(msg)
            
            # 检查是否需要工具调用
            if 'tool_calls' in msg and msg['tool_calls']:
                tool_call = msg['tool_calls'][0]
                tool_name = tool_call['function']['name']
                args = json.loads(tool_call['function']['arguments'])
                
                print(f"[Step {step}] 调用工具: {tool_name}({args})")
                
                # 执行工具
                tool_result = tool_registry.execute(tool_name, args)
                print(f"  → 工具返回: {tool_result}")
                
                # 将结果反馈给模型
                self.messages.append({
                    "role": "tool",
                    "content": tool_result,
                    "tool_call_id": tool_call['id']
                })
            else:
                # 无工具调用，返回最终答案
                return msg['content']
        
        return "⚠️ 任务执行超时，请简化问题"

# ===== 实战演示 =====
if __name__ == "__main__":
    agent = Agent()
    
    test_cases = [
        "现在几点了？",
        "计算(15+25)*3的结果",
        "今天是2026年几月几号？先查时间再告诉我",
        "搜索Python 3.12的新特性并总结3个重点"
    ]
    
    for i, query in enumerate(test_cases, 1):
        print(f"\n{'='*60}")
        print(f"🧪 测试案例 {i}: {query}")
        print('='*60)
        result = agent.run(query)
        print(f"\n🤖 回答: {result}")
```

**学员任务**  
1. 运行多工具Agent，观察工具调用过程  
2. 新增"天气查询"工具（模拟返回固定值）  
3. 尝试复杂任务："计算我工作5年能休多少天年假"（需组合时间+计算工具）

---

### 模块6：综合项目实战（16:45-18:00）

#### 6.1 项目：智能技术文档助手
**需求**：构建一个能回答技术问题、生成代码示例、解释概念的智能助手

```python
# final_project.py
import os
import re
import dashscope
from dashscope import Generation
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions

load_dotenv()
dashscope.api_key = os.getenv('DASHSCOPE_API_KEY')

class TechDocAssistant:
    def __init__(self):
        # 初始化向量库
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(
            name="tech_knowledge",
            embedding_function=embedding_functions.DashScopeEmbeddingFunction(
                api_key=os.getenv('DASHSCOPE_API_KEY'),
                model_name="text-embedding-v3"
            )
        )
        
        # 预加载技术知识
        self._load_sample_knowledge()
    
    def _load_sample_knowledge(self):
        """加载示例技术知识"""
        docs = [
            ("python_decorator", """
            Python装饰器：
            - 本质是高阶函数，接收函数作为参数并返回新函数
            - 语法糖：@decorator 等价于 func = decorator(func)
            - 常见用途：日志记录、权限验证、缓存、性能计时
            - 带参数装饰器需三层嵌套函数
            """),
            ("list_comprehension", """
            列表推导式：
            - 语法：[expression for item in iterable if condition]
            - 优势：比for循环更简洁高效
            - 示例：[x**2 for x in range(10) if x%2==0] → [0,4,16,36,64]
            - 可嵌套：生成矩阵 [[i*j for j in range(3)] for i in range(3)]
            """),
            ("async_python", """
            Python异步编程：
            - async/await：Python 3.5+原生支持
            - asyncio：标准库事件循环
            - 适用场景：I/O密集型任务（网络请求、文件读写）
            - 不适用：CPU密集型任务（需用多进程）
            - 关键概念：协程、事件循环、Task、Future
            """)
        ]
        
        for doc_id, content in docs:
            self.collection.add(
                documents=[content],
                ids=[doc_id],
                metadatas=[{"topic": doc_id}]
            )
        print("✓ 知识库初始化完成")
    
    def _retrieve_context(self, query: str, top_k=2) -> str:
        """检索相关技术知识"""
        results = self.collection.query(
            query_texts=[query],
            n_results=top_k
        )
        
        if not results['documents'][0]:
            return ""
        
        context = "\n\n".join([
            f"【{results['ids'][0][i]}】\n{doc}" 
            for i, doc in enumerate(results['documents'][0])
        ])
        return context
    
    def chat(self, query: str) -> str:
        """主对话接口"""
        # 1. 检索相关知识
        context = self._retrieve_context(query)
        
        # 2. 构建prompt（区分问题类型）
        is_code_request = bool(re.search(r'(写|生成|示例|code|实现)', query, re.I))
        
        if is_code_request:
            system_prompt = """你是一名资深Python工程师，请：
            1. 优先使用检索到的知识库内容
            2. 生成完整、可运行的代码示例
            3. 添加必要注释和使用说明
            4. 说明代码的关键点和注意事项"""
        else:
            system_prompt = """你是一名技术讲师，请：
            1. 基于知识库内容准确回答
            2. 用通俗易懂的语言解释技术概念
            3. 适当举例说明
            4. 不确定的内容请说明"根据现有知识..." """
        
        # 3. 调用大模型
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"技术知识库：\n{context}\n\n用户问题：{query}"}
        ]
        
        response = Generation.call(
            model='qwen3-max',
            messages=messages,
            temperature=0.7 if is_code_request else 0.3
        )
        
        return response.output.choices[0].message.content
    
    def interactive_mode(self):
        """交互式对话模式"""
        print("\n" + "="*60)
        print("🚀 智能技术文档助手已启动")
        print("💡 支持提问：概念解释 / 代码生成 / 最佳实践")
        print("🚪 输入 'quit' 退出")
        print("="*60)
        
        while True:
            try:
                user_input = input("\n❓ 你的问题: ").strip()
                if user_input.lower() in ['quit', 'exit', 'q']:
                    print("👋 再见！")
                    break
                
                if not user_input:
                    continue
                
                print("\n🤖 正在思考...", end='', flush=True)
                answer = self.chat(user_input)
                print(f"\r✅ {answer}")
                
            except KeyboardInterrupt:
                print("\n👋 退出程序")
                break
            except Exception as e:
                print(f"\n❌ 错误: {str(e)}")

# ===== 项目运行 =====
if __name__ == "__main__":
    assistant = TechDocAssistant()
    
    # 演示模式
    demo_questions = [
        "什么是Python装饰器？",
        "用装饰器实现一个函数执行计时器",
        "列表推导式和生成器表达式有什么区别？"
    ]
    
    print("\n📚 演示模式：自动回答预设问题")
    for q in demo_questions:
        print(f"\n❓ {q}")
        print(f"💡 {assistant.chat(q)}")
        print("-"*60)
    
    # 切换到交互模式
    input("\n\n按Enter键进入交互模式...")
    assistant.interactive_mode()
```

#### 6.2 项目拓展任务（学员选做）
1. **基础任务**：运行项目，体验问答效果  
2. **进阶任务**：添加自己的技术笔记到知识库  
3. **挑战任务**：集成真实PDF解析（使用PyMuPDF）  
4. **创新任务**：增加"代码调试"工具，分析用户提供的错误代码

#### 6.3 培训总结（17:50-18:00）
- 核心能力回顾：API调用 → Prompt工程 → RAG → Agent  
- 企业应用场景：智能客服、知识管理、代码助手、数据分析  
- 后续学习路径：
  - 深入：LangChain/LlamaIndex框架
  - 扩展：多模态（Qwen-VL）、语音（Qwen-TTS）
  - 部署：FastAPI+Docker生产化
- 资源推荐：
  - 官方文档：https://help.aliyun.com/zh/dashscope
  - GitHub示例库：dashscope官方示例
  - 社区：魔搭（ModelScope）模型广场

---

### 五、培训交付物

1. **完整代码包**：6个模块的可运行Python脚本  
2. **环境配置指南**：含API Key申请截图步骤  
3. **常见问题手册**：Token超限/速率限制/错误码处理  
4. **项目模板**：可直接用于企业POC的RAG+Agent框架  
5. **延伸阅读清单**：Qwen3技术报告、RAG最佳实践论文

> **教学提示**：全天培训强调"做中学"，每个模块预留10分钟弹性时间处理环境问题，讲师需提前准备离线API响应备用方案应对网络波动。