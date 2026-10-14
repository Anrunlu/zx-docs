import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { root, sourceRoot, courseRoot, baseline, walk, readDocument, localTarget, pageData, htmlIds } from "./algorithm-docs-utils.mjs";

const output = resolve(sourceRoot, ".vuepress/dist");
const generated = resolve(sourceRoot, ".vuepress/.temp/pages");
const errors = [];
const pages = new Map();
const byRoute = new Map();
const registry = readFileSync(resolve(sourceRoot, ".vuepress/.temp/internal/routes.js"), "utf8");
const activeRoutes = new Set([...registry.matchAll(/^\s*\[("(?:\\.|[^"\\])*")\s*,/gm)]
  .map((match) => decodeURIComponent(JSON.parse(match[1]))));
for (const file of walk(generated).filter((path) => path.endsWith(".js"))) {
  const data = pageData(file);
  if (!data) continue;
  const route = decodeURIComponent(data.path);
  if (!activeRoutes.has(route)) continue;
  const previous = byRoute.get(route);
  if (previous && previous.filePathRelative !== data.filePathRelative) errors.push(`重复页面地址：${data.path}`);
  byRoute.set(route, data);
  if (data.filePathRelative) pages.set(data.filePathRelative, data);
}
const htmlCache = new Map();
function htmlFor(page) {
  const route = decodeURIComponent(page.path);
  if (htmlCache.has(route)) return htmlCache.get(route);
  const htmlPath = resolve(output, `.${route.endsWith("/") ? route + "index.html" : route}`);
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, "utf8") : "";
  if (!html) errors.push(`生产页面不存在：${page.path}`);
  htmlCache.set(route, html);
  return html;
}
for (const entry of baseline) {
  const page = pages.get(entry.source);
  if (!page || page.path !== entry.path) errors.push(`原有页面地址改变：${entry.source}，应保持 ${entry.path}`);
  else {
    const ids = htmlIds(htmlFor(page));
    for (const anchor of entry.anchors ?? []) if (!ids.has(anchor)) errors.push(`${entry.source}: 原有章节锚点丢失：#${anchor}`);
  }
}
const docs = walk(courseRoot).filter((path) => path.endsWith(".md"));
let checked = 0;
for (const file of docs) {
  const source = relative(sourceRoot, file).replaceAll("\\", "/");
  const page = pages.get(source);
  if (!page) { errors.push(`文档未生成页面：${source}`); continue; }
  const html = htmlFor(page);
  if (!page.frontmatter.containerClass?.split(/\s+/).includes("algorithm-document") || !html.includes("algorithm-document")) errors.push(`${source}: 共用排版类未生效`);
  const doc = readDocument(file);
  if (!doc.frontmatter.algorithmDocType) continue;
  checked++;
  if (/class="[^"]*\bkatex-error\b/.test(html)) errors.push(`${source}: 公式渲染失败`);
  for (const href of doc.links) {
    const target = localTarget(file, href);
    if (!target || !target.file.endsWith(".md")) continue;
    const linked = pages.get(relative(sourceRoot, target.file).replaceAll("\\", "/"));
    if (!linked) errors.push(`${source}: 本地文档没有对应路由：${href}`);
    else if (target.hash && !htmlIds(htmlFor(linked)).has(target.hash)) errors.push(`${source}: 本地链接锚点不存在：${href}`);
  }
}
for (const [source, page] of pages) {
  if (!source.startsWith("teachbook/algorithm/") && page.frontmatter.containerClass?.split(/\s+/).includes("algorithm-document")) errors.push(`共用排版影响了其他课程：${source}`);
  if (source.startsWith("templates/") || page.path.includes("/templates/")) errors.push("维护模板被发布为教学页面");
}
const base = readFileSync(resolve(sourceRoot, ".vuepress/config.ts"), "utf8").match(/\bbase:\s*["']([^"']+)["']/)?.[1] ?? "/";
let fontFound = false;
for (const file of walk(output).filter((path) => path.endsWith(".css"))) {
  const css = readFileSync(file, "utf8");
  for (const match of css.matchAll(/url\(["']?([^)'"\s]*inter-latin[^)'"\s]*\.woff2)["']?\)/g)) {
    const url = match[1];
    const target = url.startsWith("/")
      ? resolve(output, url.startsWith(base) ? url.slice(base.length) : "__invalid_base__")
      : resolve(file, "..", url);
    if (!existsSync(target)) errors.push(`字体基础路径或资源无效：${url}`);
    else fontFound = true;
  }
}
if (!fontFound) errors.push("生产构建未打包共用字体");
if (!existsSync(resolve(output, "assets/font-licenses/Inter-OFL.txt"))) errors.push("字体许可未随站点发布");
if (errors.length) {
  console.error("算法课程生产检查失败：\n" + [...new Set(errors)].map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`算法课程生产检查通过：${baseline.length}个原有页面地址保留，${docs.length}篇文档共用排版，${checked}篇迁移文档的锚点、链接和公式通过；基础路径 ${base}。`);
