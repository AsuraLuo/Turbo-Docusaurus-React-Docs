---
sidebar_position: 5
---

# 函数
### 2.5 函数

- 2.5.1【强制】不要用 Function 构造函数创建函数。eslint: [no-new-func](https://eslint.org/docs/rules/no-new-func)

  使用 `new Function` 创建函数会像 `eval()` 方法一样执行字符串，带来安全隐患

  ```javascript
  // bad
  const sum = new Function('a', 'b', 'return a + b');

  // good
  const sum = (a, b) => (a + b);
  ```

- 2.5.2【强制】不要在块中使用函数声明。eslint: [no-inner-declarations](https://eslint.org/docs/rules/no-inner-declarations)

  在非函数块（如 `if`、`while` 等）中，不要使用函数声明：

  ```javascript
  // bad - 函数声明不是块作用域而是函数作用域，因此在块外也能使用函数，容易引起误解
  if (true) {
    function test() {
      console.log('test');
    }
  }
  test(); // => test

  // good - 函数表达式可以清晰地说明函数能否在块外使用
  // 不能在块外使用
  if (true) {
    const test = function () {
      console.log('test');
    };
  }
  test(); // => Uncaught ReferenceError: test is not defined

  // 能在块外使用
  let test;
  if (true) {
    test = function () {
      console.log('test');
    };
  }
  test(); // => test
  ```

- 2.5.3【参考】使用函数表达式替代函数声明。

  这样可以保证函数不能在定义前被调用。

  函数声明会被提升到当前作用域的顶部，因此函数可以在声明语句前就被调用，这会影响代码的可读性与可维护性。

  ```javascript
  // bad
  function foo() {
    // ...
  }

  // good
  const foo = () => {
    // ...
  };

  const foo = function () {
    // ...
  };

  // 有些规范提出，应该给函数表达式起一个不同于被赋值变量名的名字，以达到易于调试、查看错误堆栈等目的
  // 事实上，代码在目前浏览器中或者经过 Babel 转码后，匿名函数表达式也能够方便地查看堆栈。所以除非你出于某些目的想给函数起一个不同于被赋值变量的名字，否则直接使用匿名函数表达式
  const foo = function foo_more_descriptive_name() {
    // ...
  };
  ```

- 2.5.4【强制】使用箭头函数代替匿名函数。eslint: [prefer-arrow-callback](https://eslint.org/docs/rules/prefer-arrow-callback)

  ES6 提供的箭头函数可以解决 `this` 指向的问题，而且语法更简洁。

  ```javascript
  // bad
  [1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```

- 2.5.5【推荐】箭头函数编码风格。eslint: [arrow-parens](https://eslint.org/docs/rules/arrow-parens) [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style)

  箭头函数参数的小括号、函数体的大括号在某些时候可以省略，这可能导致风格的不统一，因此需要规范其编码风格：

  - 函数体风格

    当函数体只包含一条 `return` 语句时，可以省略函数体大括号和 `return`，以使代码更简洁。

    我们推荐使用这个 ES6 提供的语法糖，它可以让书写和阅读更简洁。但你也可以选择始终加上大括号和 `return`，以方便后续在函数体内增加语句。

    ```javascript
    // good - 函数体包含多条语句时，始终加上大括号
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // good - 函数体只包含一条 `return` 语句时，可以也建议省略大括号和 `return`
    [1, 2, 3].map(number => `A string containing the ${number + 1}.`);

    // good - 也可以选择始终不省略大括号，不使用简写语法糖，以方便后续在函数体内增加语句
    [1, 2, 3].map((number) => {
      return `A string containing the ${number + 1}.`;
    });
    ```

    当 `return` 的内容为对象或者有多行时，需要用小括号包裹：

    ```javascript
    // bad - Uncaught SyntaxError: Unexpected token
    [1, 2, 3].map((item) => {
      foo: item,
      bar: item + 1,
    });

    // good
    [1, 2, 3].map((item) => ({
      foo: item,
      bar: item + 1,
    }));

    // bad
    ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    );

    // good
    ['get', 'post', 'put'].map(httpMethod => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    ));
    ```

  - 函数参数风格

    当函数只有一个参数，且函数体为 `return` 简写语法时，可以省略包裹参数的小括号以使代码更简洁。

    我们建议仅在这种情况下省略包裹参数的小括号，其余情况都不要省略小括号。但你也可以选择始终加上小括号，以方便后续可能要增加参数。

    ```javascript
    // good - 未使用 return 简写语法时，参数始终加上小括号
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // good - 使用 return 简写语法、且只有一个参数时，可以也建议省略参数的小括号
    [1, 2, 3].map(x => x * x);

    // good - 也可以选择始终不省略参数的小括号，以方便后续可能要增加参数
    [1, 2, 3].map((x) => x * x);
    ```

- 2.5.6【强制】不要将函数参数命名为 arguments。

  这会覆盖掉函数作用域中的 `arguments` 对象。

  ```javascript
  // bad
  function foo(name, options, arguments) {
    // ...
  }

  // good
  function foo(name, options, args) {
    // ...
  }
  ```

- 2.5.7【强制】不要使用 arguments 对象。eslint: [prefer-rest-params](https://eslint.org/docs/rules/prefer-rest-params)

  不要使用 `arguments` 对象，使用剩余参数操作符 `...` 代替。

  ES6 提供了 rest 操作符 `...`，与 `arguments` 相比可以更清晰地聚合函数的剩余参数。此外， `...` 得到的是一个真正的数组，而 `arguments` 得到的则是类数组结构。

  ```javascript
  // bad
  function foo(a, b) {
    const args = Array.prototype.slice.call(arguments, foo.length);
    console.log(args);
  }
  foo(1, 2, 3, 4); // => [3, 4]

  // good
  function foo(a, b, ...args) {
    console.log(args);
  }
  foo(1, 2, 3, 4); // => [3, 4]
  ```

- 2.5.8【推荐】使用默认参数语法。

  ES6 中引入了默认参数语法，相比之前为参数赋默认值的方法更加简洁、可读性更好。重新对参数赋值是不推荐的行为，且当参数的布尔类型转换结果是 `false` 时可能会错误地被赋予默认值。

  因此，当函数参数需要默认值时，使用默认参数语法，而不是去修改参数：

  ```javascript
  // bad
  const multiple = (a, b) => {
    a = a || 0;
    b = b || 0;
    return a * b;
  }

  // good
  const multiple = (a = 0, b = 0) => {
    return a * b;
  }
  ```

- 2.5.9【推荐】有默认值的函数参数需要放到参数列表的最后。

  否则你将无法享受到默认参数的便利，只能通过传 `undefined` 触发参数使用默认值。

  ```javascript
  // bad
  function multiply(a = 1, b) {
    return a * b;
  }
  const x = multiply(42); // => NaN
  const y = multiply(undefined, 42); // => 42

  // good
  function multiply(a, b = 1) {
    return a * b;
  }
  const x = multiply(42); // => 42
  ```

- 2.5.10【推荐】不要修改函数参数。eslint: [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)

  不要修改引用类型的参数，这可能导致作为入参的原变量发生变化：

  ```javascript
  // bad
  const f1 = function f1(obj) {
    obj.key = 1;
  }
  const originalObj = { key: 0 };
  f1(originalObj);
  console.log(originalObj); // => { key: 1 }

  // good
  const f2 = function f2(obj) {
    const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
  }
  ```

  更不要给参数重新赋值，这可能导致意外的行为和内核优化问题：

  ```javascript
  // bad
  function foo(bar, baz) {
    if (!baz) {
      bar = 1;
    }
  }

  // good
  function foo(bar, baz) {
    let qux = bar;
    if (!baz) {
      qux = 1;
    }
  }
  ```

- 2.5.11【强制】将立即执行函数表达式（IIFE）用小括号包裹。eslint: [wrap-iife](https://eslint.org/docs/rules/wrap-iife)

  IIFE 是一个独立的执行单元，将它用小括号包裹可以更清晰的体现这点。需要提醒的是，由于 ES6 模块语法的引入，你可能不再需要使用 IIFE 了。

  ```javascript
  (function () {
    console.log('Welcome to the Internet. Please follow me.');
  }());
  ```

- 2.5.12【参考】函数的复杂度不应过高。eslint: [complexity](https://eslint.org/docs/rules/complexity)

  过高的复杂度意味着代码难以维护和测试。我们推荐函数的复杂度不要超过以下阈值：

  - 圈复杂度不超过 **10**
  - 认知复杂度不超过 **15**

- 2.5.13【参考】函数的参数不应过多。eslint: [max-params](https://eslint.org/docs/rules/max-params)
  如果函数的参数过多，将不利于函数的维护和调用。这时你需要考虑是否函数做了太多的事情，是否有必要对其进行拆分。

  如果必须使用过多的参数，可以考虑用对象代替参数列表：

  ```javascript
  // bad
  function doSomething(param1, param2, param3, param4, param5, param6, param7, param8) {
    // ...
  }
  doSomething(1, 2, 3, 4, 5, 6, 7, 8);

  // good
  function doSomething({ param1, param2, param3, param4, param5, param6, param7, param8 }) {
    // ...
  }
  doSomething({ param1: 1, param2: 2, param3: 3, param4: 4, param5: 5, param6: 6, param7: 7, param8: 8 });
  ```

- 2.5.14【强制】generator 函数内必须有 yield 语句。eslint: [require-yield](https://eslint.org/docs/rules/require-yield)

  如果一个 `generator` 中没有 `yield` 语句，那么这个 `generator` 就不是必须的。

  ```javascript
  // bad
  function* foo() {
    return 10;
  }

  // good
  function* foo() {
    yield 5;
    return 10;
  }
  ```

- 2.5.15【参考】优先使用 JS 提供的高阶函数进行迭代运算。

  需要迭代运算时，应优先使用 JS 提供的高阶函数，减少直接使用 for 循环（包括 for-in 和 for-of）。

  如使用 map() / every() / filter() / find() / findIndex() / reduce() / some() / ... 来迭代数组，使用 Object.keys() / Object.values() / Object.entries() 方法来迭代对象

  ```javascript
  const numbers = [1, 2, 3, 4, 5];

  // bad
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }
  console.log(sum); // => 15;

  // good
  let sum = 0;
  numbers.forEach((num) => {
    sum += num;
  });
  console.log(sum); // => 15;

  // best
  const sum = numbers.reduce((total, num) => total + num, 0);
  console.log(sum); // => 15;

  // bad
  const increasedByOne = [];
  for (let i = 0; i < numbers.length; i++) {
    increasedByOne.push(numbers[i] + 1);
  }

  // good
  const increasedByOne = [];
  numbers.forEach((num) => {
    increasedByOne.push(num + 1);
  });

  // best
  const increasedByOne = numbers.map(num => num + 1);
  ```
