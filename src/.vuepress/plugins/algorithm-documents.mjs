// 仅在构建阶段添加课程排版类。页面路径、永久链接与路由元数据保持原值。
export function algorithmDocuments() {
  return {
    name: "local-algorithm-documents",
    extendsPage(page) {
      const file = (page.filePathRelative ?? "").replaceAll("\\", "/");
      const isCoursePage = file.startsWith("teachbook/algorithm/")
        || (page.path ?? "").startsWith("/teachbook/algorithm/");
      if (!isCoursePage) return;

      const existing = typeof page.frontmatter.containerClass === "string"
        ? page.frontmatter.containerClass.split(/\s+/)
        : [];
      const classes = existing.filter((name) => name && name !== "algorithm-typography-sample");
      page.frontmatter.containerClass = [...new Set([...classes, "algorithm-document"])].join(" ");
    },
  };
}
