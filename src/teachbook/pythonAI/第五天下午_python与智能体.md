---
title: 第5天下午_Python与智能体
author: 周子力
icon: iconfont icon-a-outline-harmony-one
tag: [Python基础]
category: 教学文档
order: 9
---
# 《Python 与扣子（Coze）智能体融合开发》实训培训方案

**培训讲师：** [您的姓名]  
**培训时长：** 1 天（8 小时）  
**培训时间：** 08:00 - 12:00（上午），14:00 - 18:00（下午）  
**适用对象：** 具备 Python 基础语法知识，希望了解 AI Agent 应用开发的专业学生  
**实训案例主题：** 智能医疗预诊助手（Smart Medical Triage Assistant）  
**培训目标：**
1.  理解 AI 智能体（Agent）的基本概念与架构。
2.  掌握在扣子（Coze）平台上创建、配置及发布"智能医疗预诊助手"的能力。
3.  掌握通过 Python 代码调用 Coze 智能体 API 的方法。
4.  能够完成一个"Python 读取健康问卷 -> 调用智能体预诊 -> 生成健康建议报告"的联动项目。

> ⚠️ **重要声明：** 本实训案例中的医疗智能体仅用于教学演示，输出内容仅供参考，不能替代专业医疗诊断。实际应用中需严格遵守医疗法规，获得相关资质授权。

---

## 一、培训前准备

1.  **环境要求：**
    *   学生自带笔记本电脑，预装 Python 3.8+ 环境。
    *   安装 IDE（推荐 VS Code 或 PyCharm）。
    *   安装必要库：`requests`, `python-dotenv`, `json`, `csv`。
    *   网络环境：确保能访问扣子官网（www.coze.cn）。
2.  **账号准备：**
    *   所有学生需提前注册好扣子（Coze）账号。
    *   讲师提前准备好示例代码库、API 文档链接以及一份模拟的 `health_survey.csv` 文件。
3.  **资料分发：**
    *   《Coze 平台操作手册.pdf》
    *   《Python 调用 API 示例代码.zip》
    *   《实训任务书.docx》
    *   `模拟健康问卷.csv`（包含姓名、年龄、症状描述、持续时间等字段）
    *   《医疗 AI 应用伦理与合规指南.pdf》

---

## 二、详细日程安排


### 下午：Python 与智能体结合（代码实战）
**目标：** 编写 Python 程序，自动化调用上午创建的智能体，完成健康预诊任务。

**14:00 - 14:30 API 原理与鉴权**
*   **详细内容：**
    1.  HTTP 请求基础回顾（重点讲解 POST 请求与 JSON 数据格式）。
    2.  解读 Coze API 接口文档（重点关注 Chat 接口与 Conversation 接口）。
    3.  鉴权机制讲解：Bearer Token 的作用与传递方式。
    4.  数据安全规范：如何使用 `.env` 文件管理密钥，避免硬编码；强调健康数据的隐私保护。
*   **教学形式：** 讲授 + 代码演示

**14:30 - 15:30 Python 封装调用类**
*   **详细内容：**
    1.  **实操环节：** 使用 `requests` 库发送第一个 API 请求，连接"医疗预诊助手"。
    2.  解析返回的 JSON 数据，提取智能体给出的"症状分析"、"可能方向"、"就医建议"。
    3.  封装一个 `CozeMedicalAgent` 类，包含 `triage_symptom` 方法，提高代码复用性。
    4.  处理常见错误（网络超时、Token 失效、参数错误等异常捕获）。
*   **教学形式：** 代码走读 + 学生跟练

**15:30 - 15:45 课间休息**
*   休息、眼部放松。

**15:45 - 16:45 场景化综合开发**
*   **详细内容：**
    1.  **综合任务：** 构建"批量健康预诊报告系统"。
    2.  业务逻辑设计：Python 读取本地 `health_survey.csv` 文件 -> 逐行提取用户症状 -> 发送给 Coze 智能体 -> 智能体分析 -> Python 将结果汇总写入 `health_report.html`。
    3.  体现"Python 处理数据 IO + 智能体处理医学语义"的分工优势。
    4.  体验流式输出（Stream）效果（视学生基础作为可选进阶内容）。
*   **教学形式：** 项目实战

**16:45 - 17:30 成果调试与优化**
*   **详细内容：**
    1.  学生独立完成综合任务，讲师巡回指导。
    2.  解决代码运行中的 Bug（如编码问题、API 限流问题、JSON 解析错误）。
    3.  优化上午创建的 Bot 的 Prompt，以确保返回的医学建议更准确、更安全。
    4.  检查输出报告是否包含必要的免责声明。
*   **教学形式：** 辅导 + 调试

**17:30 - 18:00 成果展示与结课**
*   **详细内容：**
    1.  邀请 2-3 位学生展示运行效果（演示从 CSV 问卷到生成 HTML 健康报告的全过程）。
    2.  总结全天知识点，梳理 Python 与 Agent 结合的核心流程。
    3.  强调医疗 AI 应用的伦理边界与合规要求。
    4.  提供后续学习路径建议（多模态问诊、与医院系统对接、部署上线）。
    5.  填写培训反馈表。
*   **教学形式：** 展示 + 总结

---

### 1. Python 调用逻辑详情（下午任务）
*   **输入：** 本地 `health_survey.csv` 文件，内容示例：
    ```csv
    name,age,symptoms,duration
    张三,35,"头痛、发热、乏力",3天
    李四,28,"咳嗽、咽痛、流涕",2天
    王五,45,"胸闷、心悸",1周
    ```
*   **处理流程：**
    1.  Python 脚本使用 `csv` 模块读取文件内容。
    2.  对每一行数据，调用 `CozeMedicalAgent.triage_symptom(symptoms)`。
    3.  接收 JSON 响应，解析预诊建议。
    4.  将结果格式化为 HTML 报告，包含用户信息、症状、智能体建议、免责声明。
*   **输出：** 本地 `health_report.html` 文件，内容示例：
    ```html
    <h2>健康预诊报告</h2>
    <div class="user-info">姓名：张三 | 年龄：35</div>
    <div class="symptoms">症状：头痛、发热、乏力（持续3天）</div>
    <div class="analysis">
      <h3>症状分析</h3>
      <p>根据描述，症状可能与上呼吸道感染相关...</p>
    </div>
    <div class="suggestion">
      <h3>建议</h3>
      <ul>
        <li>就医建议：建议前往呼吸内科就诊</li>
        <li>日常护理：多休息、多饮水、监测体温</li>
        <li>警惕信号：如出现高热不退、呼吸困难，请立即就医</li>
      </ul>
    </div>
    <div class="disclaimer">⚠️ 本建议仅供参考，不能替代专业医疗诊断。如有不适，请及时就医。</div>
    ```

---

### 2. 下午重点：Python 代码实现
*   **基础调用模板（讲师需提供）：**
    ```python
    import requests
    import os
    import csv
    import json
    from dotenv import load_dotenv

    load_dotenv()

    COZE_API_BASE = "https://api.coze.cn/open_api/v2/chat"
    BOT_ID = os.getenv("COZE_BOT_ID")
    PAT_TOKEN = os.getenv("COZE_PAT_TOKEN")

    class CozeMedicalAgent:
        def __init__(self):
            self.headers = {
                "Authorization": f"Bearer {PAT_TOKEN}",
                "Content-Type": "application/json"
            }
        
        def triage_symptom(self, symptom_text: str) -> dict:
            data = {
                "bot_id": BOT_ID,
                "user": "health_system",
                "query": f"请分析以下症状：{symptom_text}",
                "stream": False
            }
            response = requests.post(COZE_API_BASE, headers=self.headers, json=data)
            if response.status_code == 200:
                result = response.json()
                # 解析 Coze 返回的消息内容
                content = result['messages'][0]['content']
                return json.loads(content)  # 假设智能体返回纯 JSON
            else:
                return {"error": f"API 请求失败: {response.status_code}"}
    ```
*   **业务逻辑结合：** 引导学生理解"Python 处理批量数据 + 智能体处理专业语义"的协作模式。
    *   *场景：* Python 负责读取 100 份健康问卷，循环调用智能体，最后生成可分享的 HTML 报告。这体现了技术在健康管理中的辅助价值。

---


## 五、讲师注意事项（Tips）

1.  **网络问题预案：** Coze 平台偶尔可能访问波动，需提前下载好离线文档或截图，若 API 调用失败，准备本地 Mock 数据方案作为备选。
2.  **Token 安全：** 反复强调 PAT Token 等同于密码，严禁上传到 GitHub 等公共仓库。
3.  **医疗伦理强调：** 在每个环节反复强调智能体的"辅助定位"，避免学生产生"AI 可以替代医生"的误解。
4.  **难度控制：** 下午的 Python 部分，对于基础较弱的学生，提供"填空式"代码（即写好框架，让学生填写关键参数和逻辑），保证所有人都能跟上进度。
5.  **时间管理：** 上午构建 Bot 环节容易因为纠结 Prompt 而超时，讲师需严格控制时间，告诉学生 Prompt 可以后续迭代，先跑通流程最重要。
6.  **互动激励：** 设置"最佳专业智能体奖"和"最佳代码实现奖"，在下午结课时给予小礼品激励，提高参与度。
7.  **案例一致性：** 确保上午教的 Bot 配置完全匹配下午代码所需的输入输出格式（特别是 JSON 格式），避免下午调试时因格式问题卡壳。
8.  **数据安全提醒：** 强调健康数据属于敏感个人信息，实训中使用的均为模拟数据，实际应用中需遵守《个人信息保护法》等相关法规。

---

## 六、课后延伸作业

1.  尝试在 Coze 中为智能体添加"多轮问诊"工作流，实现症状追问功能。
2.  将 Python 脚本封装为简单的 Web 界面（使用 Streamlit 或 Flask），模拟在线预诊场景。
3.  探索 Coze 的知识库功能，尝试上传权威医学指南文档，提升智能体建议的准确性。
4.  （进阶）研究如何在输出中添加"置信度"字段，帮助使用者判断建议的参考程度。

---

## 七、附录：医疗 AI 应用伦理要点（供讲师参考）

在培训过程中，请向学生传达以下核心伦理原则：

1.  **辅助定位原则：** AI 智能体是医疗服务的辅助工具，不能替代执业医师的诊断和治疗决策。
2.  **安全第一原则：** 对于可能涉及急重症的症状，必须设置"优先建议就医"的硬性逻辑。
3.  **透明告知原则：** 所有输出必须清晰标注"本建议由 AI 生成，仅供参考"，避免用户误解。
4.  **隐私保护原则：** 健康数据属于敏感个人信息，处理时需脱敏、加密，遵守相关法律法规。
5.  **持续监督原则：** AI 建议需由专业人员进行定期审核和优化，确保内容科学可靠。

---

**备注：** 本方案可根据学生实际 Python 基础水平，适当调整下午代码编写的深度。如果学生基础较好，可增加"流式响应（Stream）"的处理教学，实现打字机效果的实时预诊展示；或增加"多模态输入"（如图片症状描述）的拓展内容。