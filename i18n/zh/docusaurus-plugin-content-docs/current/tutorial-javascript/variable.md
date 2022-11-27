---
sidebar_position: 2
---

# 变量

## 变量声明
- 【强制】使用 const 或 let 声明变量。eslint: [no-var](https://eslint.org/docs/rules/no-var) [no-undef](https://eslint.org/docs/rules/no-undef)

  从 ES6 开始，可以使用 `let` 和 `const` 关键字在块级作用域下声明变量。块级作用域在很多其他编程语言中都有使用，这样声明的变量不会污染全局命名空间。

  不要使用 `var`：

  ```javascript
  // bad
  var foo = 'foo';
  var bar;

  // good
  const foo = 'foo';
  let bar;
  ```

  更不要什么都不用（这将产生全局变量，从而污染全局命名空间）：

  ```javascript
  // bad
  foo = 'foo';

  // good
  const foo = 'foo';
  ```

## const 和 let
- 【强制】正确地使用 const 和 let。eslint: [prefer-const](https://eslint.org/docs/rules/prefer-const)

  声明变量时，应优先使用 `const`，只有当变量会被重新赋值时才使用 `let`：

  ```javascript
  // bad - 声明后未发生重新赋值，应使用 const
  let flag = true;
  if (flag) {
    console.log(flag);
  }

  // good - 声明后发生重新赋值，let 使用正确
  let flag = true;
  if (flag) {
    flag = false;
  }
  ```

  需注意，数组和对象是一个引用，对数组某项和对象某属性的修改并不是重新赋值，因此多数情况下应用 `const` 声明：

  ```javascript
  // bad
  let arr = [];
  let obj = {};
  arr[0] = 'foo';
  obj.name = 'bar';

  // good
  const arr = [];
  const obj = {};
  arr.push('foo');
  obj.name = 'bar';
  ```

## 一条语句声明变量
- 【强制】一条声明语句声明一个变量。eslint: [one-var](https://eslint.org/docs/rules/one-var)

  这样做更易于追加新的声明语句（你不需要总去把最后的 `;` 改成 `,` 了），也更易于进行单步调试。

  ```javascript
  // bad
  const foo = 1,
        bar = 2;

  // good
  const foo = 1;
  const bar = 2;
  ```

## 声明变量使用
- 【强制】声明的变量必须被使用。eslint: [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)

  声明而未使用的变量、表达式可能带来潜在的问题，也会给维护者造成困扰，应将它们删除。

  ```javascript
  // bad - 未使用变量 foo
  const foo = 1;

  // good
  const foo = 1;
  doSomethingWith(foo);

  // bad - 只修改变量不认为是被使用
  let bar = 1;
  bar = 2;
  bar += 1;

  // good
  let bar = 1;
  bar = 2;
  bar += 1;
  doSomethingWith(bar);

  // bad - 未使用参数 y
  function getX(x, y) {
    return x;
  }

  // good
  function getXPlusY(x, y) {
    return x + y;
  }
  ```

## 变量提升作用
- 【强制】不要在声明前就使用变量。eslint: [no-use-before-define](https://eslint.org/docs/rules/no-use-before-define)

  在 ES5 中，由于 `var` 的声明提升作用，变量可以在声明前使用，但这样做可能给人带来疑惑和隐患，所以不要在声明前就使用变量：

  ```javascript
  // bad
  console.log(foo); // => undefined
  var foo = 'foo';

  // good
  var foo = 'foo';
  console.log(foo); // => foo
  ```

  在 ES6 中，由于 `const` 和 `let` 没有声明提升作用，如果在声明前就使用变量，会直接报错：

  ```javascript
  // bad
  console.log(foo); // => Uncaught ReferenceError: foo is not defined
  const foo = 'foo';

  // good
  const foo = 'foo';
  console.log(foo); // => foo
  ```

## 变量使用
- 【参考】哪里使用，哪里声明。

  在变量被使用前再进行声明，而不是统一在块开始处进行声明。

  ES6 提供的 `let` 和 `const` 是块级作用域，不存在类似 `var` 的声明提升的问题。因此我们可以把声明写在更合理的地方（一般是变量被使用前），而不是统一在块开始处进行声明。

  ```javascript
  // bad - 如果权限校验（checkUserPermission）失败，fetchData 是不必要的
  function getData(id) {
    const data = fetchData(id);

    if (!checkUserPermission()) {
      return false;
    }

    if (data.foo === 'bar') {
      // ...
    }

    return data;
  }

  // good
  function getData(id) {
    if (!checkUserPermission()) {
      return false;
    }

    const data = fetchData(id);

    if (data.foo === 'bar') {
      // ...
    }

    return data;
  }
  ```

## 变量同名
- 【强制】变量不要与外层作用域已存在的变量同名。eslint: [no-shadow](https://eslint.org/docs/rules/no-shadow)

  如果变量与外层已存在变量同名，会降低可读性，也会导致内层作用域无法读取外层作用域的同名变量。

  ```javascript
  // bad
  const foo = 1;
  if (someCondition) {
    const foo = 2;
    console.log(foo); // => 2
  }

  // good
  const foo = 1;
  if (someCondition) {
    const bar = 2;
    console.log(bar); // => 2
    console.log(foo); // => 1
  }
  ```

## 重复声明变量和函数
- 【强制】不要重复声明变量和函数。eslint: [no-redeclare](https://eslint.org/docs/rules/no-redeclare)

  在 ES5 中，尽管使用 `var` 重复声明不会报错，但这样做会令人疑惑，降低程序的可维护性。同理，函数的声明也不要与已存在的变量和函数重名：

  ```javascript
  // bad
  var a = 'foo';
  var a = 'bar';
  function a() {}
  console.log(a); // => 'bar'

  // good
  var a = 'foo';
  var b = 'bar';
  function c() {}
  console.log(a); // => 'foo'

  // bad - arg 已作为函数参数声明
  function myFunc(arg) {
    var arg = 'foo';
    console.log(arg);
  }
  myFunc('bar'); // => 'foo'

  // good
  function myFunc(arg) {
    var otherName = 'foo';
    console.log(arg);
  }
  myFunc('bar'); // => 'bar'
  ```

  在 ES6 中，使用 `const` 或 `let` 重复声明变量会直接报错：

  ```javascript
  // bad
  const a = 'foo';
  function a() {} // => Uncaught SyntaxError: Identifier 'a' has already been declared

  // good
  const a = 'foo';
  function b() {}

  // bad - arg 已作为函数参数声明
  function myFunc(arg) {
    const arg = 'foo';
    console.log(arg);
  }
  myFunc('bar'); // => Uncaught SyntaxError: Identifier 'arg' has already been declared

  // good
  function myFunc(arg) {
    const otherName = 'foo';
    console.log(arg);
  }
  myFunc('bar'); // => 'bar'
  ```

## 禁止连续赋值
- 【强制】禁止连续赋值。eslint: [no-multi-assign](https://eslint.org/docs/rules/no-multi-assign)

  变量的连续赋值让人难以阅读和理解，并且可能导致意想不到的结果（如产生全局变量）。

  ```javascript
  // bad - 本例的结果是 let 仅对 a 起到了预想效果，b 和 c 都成了全局变量
  (function test() {
    let a = b = c = 1; // 相当于 let a = (b = (c = 1));
  })();

  console.log(a); // throws ReferenceError
  console.log(b); // 1
  console.log(c); // 1

  // good
  (function test() {
    let a = 1;
    let b = a;
    let c = a;
  })();

  console.log(a); // throws ReferenceError
  console.log(b); // throws ReferenceError
  console.log(c); // throws ReferenceError
  ```

## 变量归类
- 【参考】将 let 和 const 分别归类。
  将 `let` 和 `const` 归类写在一起，可以提高代码整洁性。此外，如果你想按变量的含义排序分组也是允许的。

  ```javascript
  // bad
  let a;
  const b = 2;
  let c;
  const d = 4;
  let e;

  // good
  const b = 2;
  const d = 4;
  let a;
  let c;
  let e;
  ```

