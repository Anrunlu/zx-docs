import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Python 程序设计",
    icon: "fab fa-python",
    link: "/teachbook/python/",
  },
  {
    text: "鸿蒙应用开发",
    icon: "iconfont icon-a-outline-harmony-one",
    link: "/teachbook/harmony/",
  },
  {
    text: "算法设计与分析",
    icon: "iconfont icon-a-outline-harmony-one",
    link: "/teachbook/algorithm/",
  },
  {
    text: "机器学习",
    icon: "iconfont icon-a-outline-harmony-one",
    link: "/teachbook/machineLearning/",
  }
]);
