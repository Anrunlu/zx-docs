import { existsSync, readFileSync, readdirSync } from "node:fs";
import { builtinModules } from "node:module";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(root, "src");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const dependencies = new Set(Object.keys({
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
}));
const builtins = new Set(builtinModules.flatMap((name) => [name, `node:${name}`]));
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".cache", ".temp", "dist", "node_modules"].includes(entry.name)) return [];
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function checkImport(file, specifier) {
  const display = relative(root, file);
  const target = specifier.replace(/[?#].*$/, "");
  if (isAbsolute(target)) {
    errors.push(`${display}: 不允许绝对路径导入 ${specifier}`);
    return;
  }
  if (target.startsWith(".")) {
    const resolved = resolve(dirname(file), target);
    const sourcePath = relative(sourceRoot, resolved);
    if (sourcePath.startsWith(`..${sep}`) || sourcePath === "..") {
      errors.push(`${display}: 运行资源必须位于 src 内：${specifier}`);
    }
    if (resolved.split(sep).some((part) => [".cache", ".temp", "dist"].includes(part))) {
      errors.push(`${display}: 不允许引用构建缓存或产物：${specifier}`);
    }
    // VuePress 配置以 .js 引用 TypeScript 源文件，Vite 会进行对应解析。
    const candidates = [resolved, resolved.replace(/\.js$/, ".ts"),
      `${resolved}.ts`, `${resolved}.js`, `${resolved}.vue`, resolve(resolved, "index.ts"), resolve(resolved, "index.js")];
    if (!candidates.some(existsSync)) {
      errors.push(`${display}: 引用的源码或资源不存在：${specifier}`);
    }
    return;
  }
  if (builtins.has(target)) return;
  const packageName = target.startsWith("@")
    ? target.split("/").slice(0, 2).join("/")
    : target.split("/")[0];
  if (!dependencies.has(packageName)) {
    errors.push(`${display}: ${packageName} 未在 package.json 声明；VuePress 客户端 API 请从 vuepress/client 导入`);
  }
}

for (const file of walk(resolve(sourceRoot, ".vuepress"))) {
  if (!/\.(?:[cm]?[jt]s|vue)$/.test(file)) continue;
  const text = readFileSync(file, "utf8");
  const scripts = file.endsWith(".vue")
    ? [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]).join("\n")
    : text;
  // 检查静态导入、转导出，以及使用字符串字面量的动态导入。
  const patterns = [
    /\b(?:import|export)\s+(?:[^;]*?\s+from\s*)?["']([^"']+)["']/g,
    /\b(?:import|require)\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of scripts.matchAll(pattern)) checkImport(file, match[1]);
  }
}

if (errors.length) {
  console.error("文档部署检查失败：\n" + [...new Set(errors)].map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log("文档部署检查通过：组件导入依赖已声明，运行资源位于源码目录且存在。");
