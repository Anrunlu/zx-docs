import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createMarkdown } from "vuepress/markdown";

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const sourceRoot = resolve(root, "src");
export const courseRoot = resolve(sourceRoot, "teachbook/algorithm");
export const baseline = JSON.parse(readFileSync(resolve(root, "scripts/algorithm-route-baseline.json"), "utf8"));
export const chapters = ["题目描述", "题目分析", "实现代码", "算法执行过程", "复杂度分析", "易错点", "课堂练习"];
const markdown = createMarkdown({ html: true, frontmatter: true, anchor: false, headers: false, toc: false });
const routes = new Map(baseline.map((entry) => [decodeURIComponent(entry.path), resolve(sourceRoot, entry.source)]));

export function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

export function readDocument(path) {
  const text = readFileSync(path, "utf8");
  const env = {};
  // rc.8 的 frontmatter 处理在 render 包装层执行；显式走同一接口，
  // 避免本地较新传递依赖与冻结锁文件环境对 parse 的默认行为不同。
  markdown.render(text, env);
  const tokens = markdown.parse(env.content ?? text, {});
  const headings = [];
  const links = [];
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token.type === "heading_open" && token.tag === "h2") headings.push(tokens[index + 1].content.trim());
    for (const child of token.children ?? []) {
      if (child.type === "link_open") links.push(child.attrGet("href"));
      if (child.type === "image") links.push(child.attrGet("src"));
    }
  }
  return { path, text, tokens, headings, links, frontmatter: env.frontmatter ?? {} };
}

export function localTarget(file, href) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null;
  const [encodedPath, fragment = ""] = href.split("#", 2);
  const linkPath = decodeURIComponent(encodedPath.split("?")[0]);
  const hash = decodeURIComponent(fragment);
  if (!linkPath) return { file, hash };
  const absolute = linkPath.startsWith("/");
  let target = absolute ? resolve(sourceRoot, `.${linkPath}`) : resolve(dirname(file), linkPath);
  if (linkPath.endsWith(".html") || linkPath.endsWith("/")) {
    const route = absolute ? linkPath : "/" + relative(sourceRoot, target).replaceAll("\\", "/");
    if (routes.has(route)) target = routes.get(route);
    else if (linkPath.endsWith(".html")) target = target.replace(/\.html$/, ".md");
  }
  if (existsSync(target) && !linkPath.endsWith(".md") && !linkPath.endsWith(".html")) {
    for (const name of ["README.md", "index.md"]) {
      if (existsSync(resolve(target, name))) return { file: resolve(target, name), hash };
    }
  }
  if (!existsSync(target) && absolute) target = resolve(sourceRoot, ".vuepress/public", `.${linkPath}`);
  return { file: target, hash };
}

export function pageData(path) {
  const text = readFileSync(path, "utf8");
  const match = text.match(/\bconst data = JSON\.parse\(("(?:\\.|[^"\\])*")\)/);
  return match ? JSON.parse(JSON.parse(match[1])) : null;
}

export function htmlIds(html) {
  return new Set([...html.matchAll(/\bid="([^"]*)"/g)].map((match) => match[1]
    .replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<").replaceAll("&gt;", ">")));
}
