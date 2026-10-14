import { existsSync } from "node:fs";
import { relative } from "node:path";
import { sourceRoot, courseRoot, baseline, chapters, walk, readDocument, localTarget } from "./algorithm-docs-utils.mjs";

const errors = [];
let migrated = 0;
const files = walk(courseRoot).filter((file) => file.endsWith(".md"));
const guarded = new Set(baseline.filter((entry) => entry.anchors).map((entry) => entry.source));
for (const entry of baseline) {
  if (!existsSync(`${sourceRoot}/${entry.source}`)) errors.push(`原有路径对应的文档被删除或移动：${entry.source}`);
}
for (const file of files) {
  const display = relative(sourceRoot, file);
  let doc;
  try { doc = readDocument(file); }
  catch (error) { errors.push(`${display}: frontmatter 或 Markdown 解析失败：${error.message}`); continue; }
  const type = doc.frontmatter.algorithmDocType;
  if (guarded.has(display.replaceAll("\\", "/")) && type !== "problem") errors.push(`${display}: 首批题目必须保留 algorithmDocType: problem，不能跳过检查`);
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(doc.text)) errors.push(`${display}: 包含影响公式或页面解析的隐藏控制字符`);
  if (type && !["problem", "lesson", "guide"].includes(type)) errors.push(`${display}: algorithmDocType 必须是 problem、lesson 或 guide`);
  if (type) {
    migrated++;
    for (const key of ["title", "author", "category", "tag"]) {
      if (!doc.frontmatter[key]) errors.push(`${display}: 缺少 ${key} 元数据`);
    }
    if (/\[\[[\p{Script=Han}][^\]\n]*\]\]/u.test(doc.text)) errors.push(`${display}: 留有模板编写提示`);
  }
  if (type === "problem") {
    if (JSON.stringify(doc.headings) !== JSON.stringify(chapters)) errors.push(`${display}: 二级标题必须按七章结构组织`);
    if (!/^::: tip 本节学习目标\s*$/m.test(doc.text)) errors.push(`${display}: 缺少学习目标`);
    const implementation = doc.text.split("## 实现代码")[1]?.split("## 算法执行过程")[0] ?? "";
    if (!/```python[^\n]*\n/.test(implementation)) errors.push(`${display}: 缺少 Python 主实现`);
    if (!/```text\n/.test(implementation)) errors.push(`${display}: 缺少主实现的运行输出`);
    if (!/^::: details 参考答案\s*$/m.test(doc.text)) errors.push(`${display}: 缺少可展开的练习答案`);
    const exercises = doc.text.split("## 课堂练习")[1] ?? "";
    for (const heading of ["基础核对", "过程推演", "进阶思考"]) {
      if (!exercises.includes(`### ${heading}`)) errors.push(`${display}: 课堂练习缺少 ${heading}`);
    }
  }
  const required = type === "lesson"
    ? ["学习目标", "本课路线", "题目串联", "方法比较", "课堂任务"]
    : type === "guide" ? ["主题介绍", "学习路线", "题目索引", "方法比较", "学习建议"] : [];
  for (const heading of required) if (!doc.headings.includes(heading)) errors.push(`${display}: 缺少 ${heading}`);
  for (const href of doc.links) {
    if (/^(?:file:|\/(?:Users|Volumes|tmp)\/)/i.test(href)) {
      errors.push(`${display}: 不允许个人或临时路径引用：${href}`);
      continue;
    }
    let target;
    try { target = localTarget(file, href); }
    catch { errors.push(`${display}: 链接编码错误：${href}`); continue; }
    if (target && relative(sourceRoot, target.file).startsWith("..")) {
      errors.push(`${display}: 本地运行引用超出站点源码：${href}`);
    } else if (target && !existsSync(target.file)) {
      errors.push(`${display}: 本地引用不存在：${href}`);
    }
  }
}
if (errors.length) {
  console.error("算法文档检查失败：\n" + [...new Set(errors)].map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`算法文档检查通过：${files.length}篇课程文档，${migrated}篇已按模板核对；原有文件路径保留。`);
if (process.argv.includes("--audit-links")) console.log("课程中的 Markdown 本地引用均存在且位于站点源码中。");
