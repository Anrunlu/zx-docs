---
title: ArkTS语言-简介
icon: iconfont icon-a-outline-harmony-one
author: 周子力
order: 16
category:
  - 教学文档
tag:
  - HarmonyOS
  - TypeScript
---
[鸿蒙应用开发官网文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V2/1_1_u5feb_u901f_u5165_u95e8-0000001478340845-V2?catalogVersion=V2)
# ArkTS语言

## 1.什么是ArkTS语言？

ArkTS是HarmonyOS优选的主力应用开发语言。ArkTS围绕应用开发在[TypeScript](https://www.typescriptlang.org/)（简称TS）生态基础上做了进一步扩展，继承了TS的所有特性，是TS的超集。因此，在学习ArkTS语言之前，建议开发者具备TS语言开发能力。

当前，ArkTS在TS的基础上主要扩展了如下能力：

- 基本语法：ArkTS定义了声明式UI描述、自定义组件和动态扩展UI元素的能力，再配合ArkUI开发框架中的系统组件及其相关的事件方法、属性方法等共同构成了UI开发的主体。
- 状态管理：ArkTS提供了多维度的状态管理机制。在UI开发框架中，与UI相关联的数据可以在组件内使用，也可以在不同组件层级间传递，比如父子组件之间、爷孙组件之间，还可以在应用全局范围内传递或跨设备传递。另外，从数据的传递形式来看，可分为只读的单向传递和可变更的双向传递。开发者可以灵活地利用这些能力来实现数据和UI的联动。
- 渲染控制：ArkTS提供了渲染控制的能力。条件渲染可根据应用的不同状态，渲染对应状态下的UI内容。循环渲染可从数据源中迭代获取数据，并在每次迭代过程中创建相应的组件。数据懒加载从数据源中按需迭代数据，并在每次迭代过程中创建相应的组件。

未来，ArkTS会结合应用开发/运行的需求持续演进，逐步提供并行和并发能力增强、系统类型增强、分布式开发范式等更多特性。

## 2.基本语法

![img](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20231227152826.68978747729929417932749507993929:50001231000000:2800:B44BA8980A3587F0957937999D38C66140AD85390E5F17FC2CB1A661D3E1875C.png?needInitFileName=true?needInitFileName=true?needInitFileName=true?needInitFileName=true?needInitFileName=true)

- 装饰器： 用于装饰类、结构、方法以及变量，并赋予其特殊的含义。如上述示例中@Entry、@Component和@State都是装饰器，[@Component](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-create-custom-components-0000001473537046-V3#section1430055924816)表示自定义组件，[@Entry](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-create-custom-components-0000001473537046-V3#section1430055924816)表示该自定义组件为入口组件，[@State](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-state-0000001474017162-V3)表示组件中的状态变量，状态变量变化会触发UI刷新。
- [UI描述](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-declarative-ui-description-0000001524416537-V3)：以声明式的方式来描述UI的结构，例如build()方法中的代码块。
- [自定义组件](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-create-custom-components-0000001473537046-V3)：可复用的UI单元，可组合其他组件，如上述被@Component装饰的struct Hello。
- 系统组件：ArkUI框架中默认内置的基础和容器组件，可直接被开发者调用，比如示例中的Column、Text、Divider、Button。
- 属性方法：组件可以通过链式调用配置多项属性，如fontSize()、width()、height()、backgroundColor()等。
- 事件方法：组件可以通过链式调用设置多个事件的响应逻辑，如跟随在Button后面的onClick()。
- 系统组件、属性方法、事件方法具体使用可参考[基于ArkTS的声明式开发范式](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-components-summary-0000001478181369-V3)。

- [@Builder](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-builder-0000001524176981-V3)/[@BuilderParam](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-builderparam-0000001524416541-V3)：特殊的封装UI描述的方法，细粒度的封装和复用UI描述。
- [@Extend](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-extend-0000001473696678-V3)/[@Styles](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-style-0000001473856690-V3)：扩展内置组件和封装属性样式，更灵活地组合内置组件。
- [stateStyles](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-statestyles-0000001482592098-V3)：多态样式，可以依据组件的内部状态的不同，设置不同样式。

## 3.声明式UI描述

ArkTS以声明方式组合和扩展组件来描述应用程序的UI，同时还提供了基本的属性、事件和子组件配置方法，帮助开发者实现应用交互逻辑。

### 3.1创建组件

- 无参数

如果组件的接口定义没有包含必选构造参数，则组件后面的“()”不需要配置任何内容。例如，Divider组件不包含构造参数：

```ts
Column() {
  Text('item 1')
  Divider()
  Text('item 2')
}
```

- 有参数

如果组件的接口定义包含构造参数，则在组件后面的“()”配置相应参数。

```ts
Image('https://xyz/test.jpg')

// string类型的参数
Text('test')
// $r形式引入应用资源，可应用于多语言场景
Text($r('app.string.title_value'))
// 无参数形式
Text()

```

- 变量或表达式也可以用于参数赋值，其中表达式返回的结果类型必须满足参数类型要求。例如，设置变量或表达式来构造Image和Text组件的参数。

```ts
Image(this.imagePath)
Image('https://' + this.imageUrl)
Text(`count: ${this.count}`)
```

### 3.2配置属性

属性方法以“.”链式调用的方式配置系统组件的样式和其他属性，建议每个属性方法单独写一行。

```ts
Text('test') //单属性
  .fontSize(12)

Text('hello') //多属性
  .fontSize(this.size)
Image('test.jpg')
  .width(this.count % 2 === 0 ? 100 : 200)    
  .height(this.offset + 100)

Text('hello')
  .fontSize(20)
  .fontColor(Color.Red)
  .fontWeight(FontWeight.Bold) //枚举类型可以作为参数传递。
```

### 3.3配置事件

事件方法以“.”链式调用的方式配置系统组件支持的事件，建议每个事件方法单独写一行。

```ts
Button('Click me')
  .onClick(() => {
    this.myText = 'ArkUI';
  })//箭头函数
  
  Button('add counter')
  .onClick(function(){
    this.counter += 2;
  }.bind(this))//使用匿名函数表达式配置组件的事件方法，要求使用bind，以确保函数体中的this指向当前组件
  

myClickHandler(): void {
  this.counter += 2;
}
...
Button('add counter')
  .onClick(this.myClickHandler.bind(this))//使用组件的成员函数配置组件的事件方法

fn = () => {
  console.info(`counter: ${this.counter}`)
  this.counter++
}
...
Button('add counter')
  .onClick(this.fn)//使用声明的箭头函数，可以直接调用，不需要bind this。

  
```

### 3.4配置子组件

如果组件支持子组件配置，则需在尾随闭包"{...}"中为组件添加子组件的UI描述。Column、Row、Stack、Grid、List等组件都是容器组件。

```ts
//以下是简单的Column组件配置子组件的示例。
Column() {
  Text('Hello')
    .fontSize(100)
  Divider()
  Text(this.myText)
    .fontSize(100)
    .fontColor(Color.Red)
}

//容器组件均支持子组件配置，可以实现相对复杂的多级嵌套。
Column() {
  Row() {
    Image('test1.jpg')
      .width(100)
      .height(100)
    Button('click +1')
      .onClick(() => {
        console.info('+1 clicked!');
      })
  }
}
```

