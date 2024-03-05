---

title: TS数据类型  
icon: iconfont icon-a-outline-harmony-one  
author: 周子力  
order: 5  
category:
    -   教学文档  
tag:
    -   HarmonyOS
    -   TypeScript

---

# TS数据类型

## 1.TypeScript的数据类型

TypeScript 继承了 JavaScript 的类型，在这个基础上，定义了一套自己的类型系统。JavaScript 语言（注意，不是 TypeScript）将值分成 9 种类型。

- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null
- any

TypeScript 继承了 JavaScript 的类型设计，以上 9 种类型可以看作 TypeScript 的基本类型。

注意，上面所有类型的名称都是小写字母，首字母大写的Number、String、Boolean等在 JavaScript 语言中都是内置对象，而不是类型名称。

另外，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

这 8 种基本类型是 TypeScript 类型系统的基础，复杂类型由它们组合而成。

## 2.boolean类型

boolean类型只包含true和false两个布尔值。

```typescript
const x: boolean = true;
const y: boolean = false;
```

## 3.string类型

```typescript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.I'll be ${myAge + 1} years old next month.`;
```

## 4.number类型

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;// ES6 中的16进制表示法
let binaryLiteral: number = 0b1010;// ES6 中的二进制表示法
let octalLiteral: number = 0o744;//ES6 中的八进制表示法
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 5.bigint类型

bigint 类型包含所有的大整数。

```typescript
const x: bigint = 123n;
const y: bigint = 0xffffn;
```

上面示例中，变量x和y就属于 bigint 类型。

bigint 与 number 类型不兼容。

```typescript
const x: bigint = 123; // 报错
const y: bigint = 3.14; // 报错
```

上面示例中，bigint类型赋值为整数和小数，都会报错。

> [!CAUTION]
>
> 注意，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数target不低于es2020）。

## 6.symbol类型

Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。

Symbol 值通过Symbol()函数生成。在 TypeScript 里面，Symbol 的类型使用symbol表示。

```typescript
let x:symbol = Symbol();
let y:symbol = Symbol();
x === y // false
```

symbol类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。

比如，5是一个具体的数值，就用5这个字面量来表示，这也是它的值类型。但是，Symbol 值不存在字面量，必须通过变量来引用，所以写不出只包含单个 Symbol 值的那种值类型。

为了解决这个问题，TypeScript 设计了symbol的一个子类型unique symbol，它表示单个的、某个具体的 Symbol 值。

Symbol具体使用场景，使用 Symbol 作为对象属性键，防止对象属性键被覆盖。Symbol 主要用于创建对象的属性键，这些键是独一无二的，不会与其他属性键冲突。这有助于防止命名冲突和属性覆盖。

```typescript
const mySymbol = Symbol('mySymbol');

const obj = {
  name: 'John',
  age: 30,
  [mySymbol]: 'This is a symbol property'
};

console.log(obj[mySymbol]);  

```

## 7.object类型

根据 JavaScript 的设计，object 类型包含了所有对象、数组和函数。

```typescript
const x: object = { foo: 123 };
const y: object = [1, 2, 3];
const z: object = (n: number) => n + 1;
```

## 8.undefined类型，null类型

undefined 和 null 是两种独立类型，它们各自都只有一个值。

undefined 类型只包含一个值undefined，表示未定义（即还未给出定义，以后可能会有定义）。

```typescript
let x: undefined = undefined;
```

上面示例中，变量x就属于 undefined 类型。两个undefined里面，第一个是类型，第二个是值。

null 类型也只包含一个值null，表示为空（即此处没有值）。

```typescript
let a = undefined; // any
const b = undefined; // any

let c = null; // any
const d = null; // any
```

## 9.包装对象类型

什么是包装对象？

JavaScript 的 8 种类型之中，undefined和null其实是两个特殊值，object属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```typescript
"hello".charAt(1); // 'e'
```

上面示例中，字符串hello执行了charAt()方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，charAt()方法其实是定义在包装对象上。

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即Symbol()和BigInt()不能作为构造函数使用），但是剩下三种可以。

- Boolean()
- String()
- Number()

以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```typescript
const s = new String("hello");
typeof s; // 'object'
s.charAt(1); // 'e'
```

### 10.包装对象类型与字面量类型

由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

```typescript
"hello"; // 字面量
new String("hello"); // 包装对象
```

上面示例中，第一行是字面量，第二行是包装对象，它们都是字符串。

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```typescript
const s1: String = "hello"; // 正确
const s2: String = new String("hello"); // 正确

const s3: string = "hello"; // 正确
const s4: string = new String("hello"); // 报错
```

上面示例中，String类型可以赋值为字符串的字面量，也可以赋值为包装对象。但是，string类型只能赋值为字面量，赋值为包装对象就会报错。

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

## 11.Object类型与object类型

大写的Object类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是Object类型，这囊括了几乎所有的值。

```typescript
let obj: Object;

obj = true;
obj = "hi";
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;

obj = undefined; // 报错 
obj = null; // 报错
```

小写的object类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```typescript
let obj: object;

obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
obj = true; // 报错
obj = "hi"; // 报错
obj = 1; // 报错
```

上面示例中，object类型不包含原始类型值，只包含对象、数组和函数。

大多数时候，我们使用对象类型，只希望包含真正的对象，不希望包含原始类型。所以，建议总是使用小写类型object，不使用大写类型Object。

注意，无论是大写的Object类型，还是小写的object类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```typescript
const o1: Object = { foo: 0 };
const o2: object = { foo: 0 };

o1.toString(); // 正确
o1.foo; // 报错

o2.toString(); // 正确
o2.foo; // 报错
```

## 12.值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```typescript
let x: "hello";

x = "hello"; // 正确
x = "world"; // 报错
```

上面示例中，变量x的类型是字符串hello，导致它只能赋值为这个字符串，赋值为其他字符串就会报错。

TypeScript 推断类型时，遇到const命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。

```typescript
// x 的类型是 "https"
const x = "https";

// y 的类型是 string
const y: string = "https";
```

上面示例中，变量x是const命令声明的，TypeScript 就会推断它的类型是值https，而不是string类型。

这样推断是合理的，因为const命令声明的变量，一旦声明就不能改变，相当于常量。值类型就意味着不能赋为其他值。

注意，const命令声明的变量，如果赋值为对象，并不会推断为值类型。

## 13.联合类型

联合类型（union types）指的是多个类型组成的一个新类型，使用符号|表示。

联合类型A|B表示，任何一个类型只要属于A或B，就属于联合类型A|B。

```typescript
let x: string | number;

x = 123; // 正确
x = "abc"; // 正确
```

上面示例中，变量x就是联合类型string|number，表示它的值既可以是字符串，也可以是数值。

联合类型可以与值类型相结合，表示一个变量的值有若干种可能。

```typescript
let setting: true | false;

let gender: "male" | "female";

let rainbowColor: "赤" | "橙" | "黄" | "绿" | "青" | "蓝" | "紫";
```

## 14.type命令

type命令用来定义一个类型的别名。

```typescript
type Age = number;

let age: Age = 55;
```

上面示例中，type命令为number类型定义了一个别名Age。这样就能像使用number一样，使用Age作为类型。

别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型。

别名不允许重名。

```typescript
type Color = "red";
type Color = "blue"; // 报错
```



## 15.任意值（any)

任意值（Any）用来表示允许赋值为任意类型。

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

```ts
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但如果是 `any` 类型，则允许被赋值为任意类型。

```ts
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

### 任意值的属性和方法

在任意值上访问任何属性都是允许的：

```ts
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任何方法：

```ts
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

可以认为，**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**。

### 未声明类型的变量

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**：

```ts
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```

等价于

```ts
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```

## 16.类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

### 什么是类型推论

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查**：

```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
