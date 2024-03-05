---
title: TS 函数
icon: iconfont icon-a-outline-harmony-one
author: 周子力
order: 12
category:
  - 教学文档
tag:
  - HarmonyOS
  - TypeScript
---

# TS 函数

## 1.什么是函数？

函数是具有一定功能的代码块。也可以看作是一个机器，进去原材料，输出产品

## 2.函数声明

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
// 函数声明（Function Declaration）
function sum(x: number, y: number): number {
  return x + y;
}
```

注意，**输入多余的（或者少于要求的）参数，是不被允许的**：

```ts
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2, 3);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
function sum(x: number, y: number): number {
  return x + y;
}
sum(1);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```

## 3.函数表达式

```ts
//函数声明-表达式方式
let mySum = function (x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
let mySum: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数，应用十分广泛。

## 4.箭头函数

箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。

```ts
const repeat = (str: string, times: number): string => str.repeat(times);
```

上面示例中，变量`repeat`被赋值为一个箭头函数，类型声明写在箭头函数的定义里面。其中，参数的类型写在参数名后面，返回值类型写在参数列表的圆括号后面。

> [!CAUTION]
>
> 注意，类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同。

```ts
function greet(fn: (a: string) => void): void {
  fn("world");
}
```

上面示例中，函数`greet()`的参数`fn`是一个函数，类型就用箭头函数表示。这时，`fn`的返回值类型要写在箭头右侧，而不是写在参数列表的圆括号后面。

下面再看一个例子。

```ts
type Person = { name: string };

const people = ["alice", "bob", "jan"].map((name): Person => ({ name }));
```

上面示例中，`Person`是一个类型别名，代表一个对象，该对象有属性`name`。变量`people`是数组的`map()`方法的返回值。

`map()`方法的参数是一个箭头函数`(name):Person => ({name})`，该箭头函数的参数`name`的类型省略了，因为可以从`map()`的类型定义推断出来，箭头函数的返回值类型为`Person`。相应地，变量`people`的类型是`Person[]`。

至于箭头后面的`({name})`，表示返回一个对象，该对象有一个属性`name`，它的属性值为变量`name`的值。这里的圆括号是必须的，否则`(name):Person => {name}`的大括号表示函数体，即函数体内有一行语句`name`，同时由于没有`return`语句，这个函数不会返回任何值。

注意，下面两种写法都是不对的。

```ts
// 错误
(name: Person) => ({ name });

// 错误
name: (Person) => ({ name });
```

上面的两种写法在本例中都是错的。第一种写法表示，箭头函数的参数`name`的类型是`Person`，同时没写函数返回值的类型，让 TypeScript 自己去推断。第二种写法中，函数参数缺少圆括号。

## 5.用接口定义函数

可以使用接口的方式来定义一个函数

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

## 6.可选参数

输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？与接口中的可选属性类似，用 `?` 表示可选的参数：

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**：

```ts
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + " " + lastName;
  } else {
    return lastName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName(undefined, "Tom");

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```

## 7.参数默认值

在 ES6 中，允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**：

```ts
function buildName(firstName: string, lastName: string = "Cat") {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

此时就不受「可选参数必须接在必需参数后面」的限制了：

```ts
function buildName(firstName: string = "Tom", lastName: string) {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let cat = buildName(undefined, "Cat");
```

> 关于默认参数，可以参考 [ES6 中函数参数的默认值](http://es6.ruanyifeng.com/#docs/function#函数参数的默认值)。

## 8.剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```js
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a: any[] = [];
push(a, 1, 2, 3);
```

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 [ES6 中的 rest 参数](http://es6.ruanyifeng.com/#docs/function#rest参数)。

## 9.重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

这时，可以使用重载定义多个 `reverse` 的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
