---

title: TS装饰器 
icon: iconfont icon-a-outline-harmony-one  
author: 周子力  
order: 15  
category:
    -   教学文档  
tag:
    -   HarmonyOS
    -   TypeScript

---

# TS装饰器

## 1.什么是装饰器？

装饰器就是一个方法，可以注入到类、方法、属性、参数上来拓展类、属性、方法、参数的功能。相当于对类、属性、方法、参数等做了一个装修。增加了一些功能。

常见装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器
装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）
装饰器是过去几年js中的重大成就，已经是ES7的标准特性之一

## 2.类装饰器

```ts
// 装饰器
function simpleDecorator(target: any, context: any) {
  console.log("hi, this is " + target);
  return target;
}

@simpleDecorator
class A {} // "hi, this is class A {}"
```

