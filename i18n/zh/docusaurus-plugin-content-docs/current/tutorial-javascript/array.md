---
sidebar_position: 3
---

# 数组

## 创建数组
- 【强制】使用字面量创建数组。eslint: [no-array-constructor](https://eslint.org/docs/rules/no-array-constructor)

  不要使用 `new Array()` 和 `Array()` 创建数组，除非为了构造某一长度的空数组。

  ```javascript
  // bad
  const a = new Array(1, 2, 3);
  const b = Array(1, 2, 3);

  // good
  const a = [1, 2, 3];
  const b = new Array(500); // 构造长度为 500 的空数组
  ```

## 数组回调函数return
- 【强制】某些数组方法的回调函数中必须包含 return 语句。eslint: [array-callback-return](https://eslint.org/docs/rules/array-callback-return)

  以下数组方法：`map`, `filter`, `from
`, `every`, `find`, `findIndex`, `reduce`, `reduceRight`, `some`, `sort` 的回调函数中必须包含 `return` 语句，否则可能会产生误用或错误。

  一个常见的误用是，本该用 `forEach` 的场景却用了 `map`：

  ```javascript
  // 欲将 ['a', 'b', 'c'] 转换成 {a: 0, b: 1, c: 2}
  const myArray = ['a', 'b', 'c'];
  const myObj = {};

  // bad - map 应用于构建一个新数组，单纯想遍历数组应使用 forEach
  myArray.map((item, index) => {
    myObj[item] = index;
  });

  // good
  myArray.forEach((item, index) => {
    myObj[item] = index;
  });
  ```

  某些方法漏掉 `return` 还可能引起错误：

  ```javascript
  // 欲将 ['a', 'b', 'c'] 转换成 {a: 0, b: 1, c: 2}
  const myArray = ['a', 'b', 'c'];

  // bad => Uncaught TypeError: Cannot set property 'b' of undefined
  const myObj = myArray.reduce((memo, item, index) => {
    memo[item] = index;
  }, {});

  // good
  const myObj = myArray.reduce((memo, item, index) => {
    memo[item] = index;
    return memo;
  }, {});
  ```

## 扩展运算符
- 【推荐】使用扩展运算符 ... 处理数组。

  ES6 提供了扩展运算符 `...`，可以简化一些数组操作。

  数组复制：

  ```javascript
  // bad
  const array1 = [];
  for (let i = 0; i < array.length; i += 1) {
    array1[i] = array[i];
  }

  // bad
  const array1 = array.map(item => item);

  // good
  const array1 = [...array];
  ```

  将类数组结构（有 Iterator 接口的对象）转换为数组：

  ```javascript
  // bad
  const foo = document.querySelectorAll('.foo');

  // good
  const nodes = Array.from(foo);

  // good
  const nodes = [...foo];
  const uniqueNodes = [...new Set(foo)]; // 可以利用 Set 和 ... 将数组去重
  ```

  数组拼接：

  ```javascript
  // bad
  const array1 = [1, 2].concat(array);

  // good
  const array1 = [1, 2, ...array]
  ```

  用 `...` 替代 `apply`：

  ```javascript
  // bad
  const args = [1, 2, 3, 4];
  Math.max.apply(Math, args);

  // good
  const args = [1, 2, 3, 4];
  Math.max(...args);
  ```

  特殊的，遍历可迭代对象时，使用 `Array.from` 而不是 `...`，以免创建一个临时数组：

  ```javascript
  // bad
  const baz = [...foo].map(bar);

  // good
  const baz = Array.from(foo, bar);
  ```

## 结构数组
- 【推荐】使用解构获取数组元素。

  使用 ES6 提供的解构方法获取数组元素：

  ```javascript
  // bad
  const arr = [1, 2, 3, 4];
  const first = arr[0];
  const second = arr[1];

  // good
  const arr = [1, 2, 3, 4];
  const [first, second] = arr;
  ```

  函数有多个返回值时，应使用对象解构而不是数组解构，因为数组解构需要考虑返回值的位置：

  ```javascript
  // bad
  function giveMeDivPosition(div) {
    return [left, right, top, bottom];
  }
  const [left, _, top] = giveMeDivPosition(div);

  // good
  function giveMeDivPosition(div) {
    return { left, right, top, bottom };
  }
  const { left, top } = giveMeDivPosition(div);
  ```
