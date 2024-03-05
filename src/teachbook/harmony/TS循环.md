---

title: TS循环  
icon: iconfont icon-a-outline-harmony-one  
author: 周子力  
order: 11  
category:
    -   教学文档  
tag:
    -   HarmonyOS
    -   TypeScript

---
# TS循环

## 1.什么是循环？

循环是指在一定条件下，重复执行一系列任务。

TypeScript中的 `for` 循环和 `for...in` 循的使用就和 `JavaScript` 中的一样。此外，`TypeScript` 中还还支持 `for…of` 、`forEach`、`every` 和 `some` 循环。

## 2.for循环

`TypeScript` 语言中的 `for` 循环可以用于多次执行一个代码块。例如一句代码重复执行 10 次、100次、1000次等，都可以通过循环来实现。

语法如下所示：

```typescript
for(init; condition;increment){
//代码块
}
```

其中 `init` 是循环控制变量，会在循环最开始的时候执行，且只会执行一次。`condition` 是循环条件，当条件为 `true` 时会执行循环中的代码块，为 `false` 时则停止执行循环。`increment` 用于更新循环控制变量，当循环中的代码块执行完毕后，控制流会跳回到这个语句。

```typescript
let num:number = 10;
let i:number;
for (i = 0; i < num; i++){
    console.log(i);
}
```

```typescript
let sum: number = 0;

for (let i: number = 1; i <= 10; i++) {
  sum += i;
}

console.log(sum); // 输出结果为 55
```

## 3.while循环

`while` 循环是另一种常用的循环结构，它会根据指定的条件反复执行一段代码，直到条件不成立为止。它具有以下语法：

```typescript
while (条件表达式) {
  // 待执行的代码块
}
```

```typescript
let i: number = 1;

while (i <= 5) {
  console.log(i);
  i++;
}
```

在上述代码中，我们使用 `while` 循环不断输出变量 `i` 的值，并在每次循环结束后将 `i` 的值递增。当 `i` 的值超过 5 时，条件表达式 `i <= 5` 不再成立，循环结束。

## 4.do...while循环

`do-while` 循环与 `while` 循环类似，但它会先执行一次循环内的代码块，然后再判断条件是否成立。因此，无论条件是否成立，`do-while` 循环至少会执行一次。

```typescript
do {
  // 待执行的代码块
} while (条件表达式);
```

```typescript
let sum: number = 0;
let i: number = 1;

do {
  sum += i;
  i++;
} while (i <= 5);

console.log(sum); // 输出结果为 15
```

在上述代码中，我们使用 `do-while` 循环将变量 `i` 的值加到 `sum` 上，并在每次循环结束后递增 `i`。当 `i` 的值超过 5 时，条件表达式 `i <= 5` 不再成立，循环结束。

## 5.循环控制

在循环中，我们还可以使用以下控制语句来改变循环的行为：

- `break`：用于终止循环，并跳出循环体。
- `continue`：用于跳过当前迭代，继续下一次迭代。

这些控制语句通常结合条件语句使用，以实现更灵活的循环控制。

下面是一个使用 `break` 和 `continue` 的示例：

```typescript
let sum: number = 0;

for (let i: number = 1; i <= 10; i++) {
  if (i === 5) {
    break; // 当 i 等于 5 时终止循环
  }

  if (i === 3) {
    continue; // 当 i 等于 3 时跳过当前迭代，继续下一次迭代
  }

  sum += i;
}

console.log(sum); // 输出结果为 12
```

在上述代码中，当变量 `i` 的值等于 5 时，使用 `break` 终止循环；当 `i` 的值等于 3 时，使用 `continue` 跳过当前迭代，继续下一次迭代。

## 6.for…in 循环

`for...in` 是 `for` 循环的另一个变体， `for...in` 语句可以用于一组值的集合或列表进行迭代输出。

语法格式如下所示：

```typescript
for (let val in list) { 
    //代码块
}
```

val 的数据类型为 string 或者 any 类型。

示例：
例如我们声明一个数组，然后使用 for...in 循环来遍历这个数组：

```typescript
let myArr:string[] = ['a', 'b', 'c', 'd'];
let i:string;
for (i in myArr){
    console.log(myArr[i]);
}
```

## 7.for...of循环

`ES6` 中引入了 `for...of` 循环，用来替代`for...in` 和 `forEach()`。`for...of` 语句创建一个循环来迭代可迭代的对象。可以用于遍历字符串、数组、映射、集合等可迭代的数据结构。

```typescript
let myArr:string[] = ['a', 'b', 'c', 'd'];
let i;
for (i of myArr){
    console.log(i);
}

```

## 8.forEach循环

`forEach()` 方法是一个数组方法，用于对数组中的每个项执行一个函数。

语法如下所示

```typescript
array.forEach(callback[, thisObject]);  

```

forEach() 方法按升序对数组中的每个元素执行一次提供的回调。callback 回调函数时一个用于测试每个元素的函数，接受三个可选参数，第一个参数为元素值 value ，第二个参数为元素索引 index，第三个参数为 Array，是一个在 forEach() 方法中迭代的数组。thisObject 是执行回调时使用的对象。


```typescript
let username:string[] = ['杨过', '黄蓉', '郭靖', '梅超风'];
username.forEach(function(item){
    console.log(item);
});

```

## 9.every 循环

`every()` 方法测试数组中的所有元素是否通过由提供的函数实现的测试。如果数组中的每个元素都满足提供的测试功能，则返回true。否则返回 false

```typescript
array.every(callback[, thisObject]);

```

`every()` 方法的语法和`forEach()` 方法类似，其中 `callback` 是一个回调函数，`thisObject` 为执行回调时用作此对象的对象。

```typescript
let numArr:number[] = [1, 2, 3, 4, 5];

let result = numArr.every(function compare(element, index, array) { 
    return (element < 10); 
});        
console.log(result);

```

## 10.some 循环

`some()` 方法用于测试数组中的某些元素是否通过由提供的函数实现的测试。

`some()` 方法和 `every()` 方法很类似，但是两者又还有一些区别，`some()` 方法会遍历数组中的每一项，如果其中一项为 true，则返回值为true。`every()` 方法则需要全部为true ，结果才为 true。

```typescript
let numArr:number[] = [7, 10, 15, 21];

let result = numArr.some(function compare(element, index, array) { 
    return (element < 10); 
});        
console.log(result);

```

上述代码中只要数组 `numArr` 中的有任何一个元素通过了由函数`compare` 提供的测试，结果返回值就会为 `true`。很明显，数组中有一个元素 7，满足小于 10 这个条件，所以最终代码输出结果为 `true`