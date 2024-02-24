import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  // title: "知新新知",
  description: "知新新知，温故知新，交流互鉴，探索发现。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
