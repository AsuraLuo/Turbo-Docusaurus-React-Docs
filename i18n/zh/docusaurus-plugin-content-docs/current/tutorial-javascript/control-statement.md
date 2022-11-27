---
sidebar_position: 9
---

# 逻辑控制
### 2.9 控制语句

- 2.9.1【强制】switch 语句中的 case 需要以 break 结尾。eslint: [no-fallthrough](https://eslint.org/docs/rules/no-fallthrough)

  ```javascript
  // bad
  switch(foo) {
    case 1:
      doSomething();
    case 2:
      doSomethingElse();
    default:
      doSomething();
  }

  // good
  switch(foo) {
    case 1:
      doSomething();
      break;
    case 2:
      doSomethingElse();
      break;
    default:
      doSomething();
  }
  ```

- 2.9.2【推荐】switch 语句需要始终包含 default 分支。eslint: [default-case](https://eslint.org/docs/rules/default-case)

  在使用 `switch` 语句时，有时会出现因开发者忘记设置 `default` 而导致错误，因此建议总是给出 `default`。如果有意省略 `default`，请在 `switch` 语句末尾用 `// no default` 注释指明：

  ```javascript
  // bad
  let foo;
  switch (bar) {
    case 1:
      foo = 2;
      break;
  }

  // good
  let foo;
  switch (bar) {
    case 1:
      foo = 2;
      break;
    default:
      foo = 0;
  }

  // good - 如果有意省略 default，请在 switch 语句末尾用 `// no default` 注释指明
  let foo = 0;
  switch (bar) {
    case 1:
      foo = 2;
      break;
    // no default
  }
  ```

- 2.9.3【参考】switch 语句应包含至少 3 个条件分支。

  `switch` 语句在有许多条件分支的情况下可以使代码结构更清晰。但对于只有一个或两个条件分支的情况，更适合使用 `if` 语句，`if` 语句更易于书写和阅读。

  ```javascript
  // bad
  let foo;
  switch (bar) {
    case 1:
      foo = 2;
      break;
    default:
      foo = 0;
  }

  // good
  let foo;
  if (bar === 1) {
    foo = 2;
  } else {
    foo = 0;
  }
  ```

- 2.9.4【参考】控制语句的嵌套层级不要过深。eslint: [max-depth](https://eslint.org/docs/rules/max-depth)

  控制语句的嵌套层级不要超过 **4** 级，否则将难以阅读和维护：

  ```javascript
  // bad
  if (condition1) {
    // depth = 1
    if (condition2) {
      // depth = 2
      for (let i = 0; i < 10; i++) {
        // depth = 3
        if (condition4) {
          // depth = 4
          if (condition5) {
            // bad - depth = 5
          }
          return;
        }
      }
    }
  }
  ```

- 2.9.5【强制】for 循环中的计数器应朝着正确方向移动。eslint: [for-direction](https://eslint.org/docs/rules/for-direction)

  当 `for` 循环中更新子句的计数器朝着错误的方向移动时，循环的终止条件将永远无法达到，这会导致死循环的出现。这时要么是程序出现了错误，要么应将 `for` 循环改为 `while` 循环。

  ```javascript
  // bad
  for (let i = 0; i < length; i--) {
    // do something
  }

  // good
  for (let i = 0; i < length; i++) {
    // do something
  }
  ```

- 2.9.6【推荐】for-in 循环中需要对 key 进行验证。eslint: [guard-for-in](https://eslint.org/docs/rules/guard-for-in)

  使用 `for-in` 循环时需要避免对象从原型链上继承来的属性也被遍历出来，因此保险的做法是对 key 是否是对象自身的属性进行验证：

  ```javascript
  // bad
  for (const key in foo) {
    doSomething(key);
  }

  // good
  for (const key in foo) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
      doSomething(key);
    }
  }
  ```

- 2.9.7【参考】如果一个 if 语句的结果总是返回一个 return 语句，那么最后的 else 是不必要的。eslint: [no-else-return](https://eslint.org/docs/rules/no-else-return)

  ```javascript
  // bad
  function foo() {
    if (x) {
      return x;
    } else {
      return y;
    }
  }

  // good
  function foo() {
    if (x) {
      return x;
    }

    return y;
  }
  ```

- 2.9.8【参考】条件表达式的计算结果。

  条件表达式（例如 `if` 语句的条件）的值为通过抽象方法 `ToBoolean` 进行强制转换所得，计算结果遵守下面的规则：

  - **对象**、**数组** 被计算为 **true**
  - **Undefined** 被计算为 **false**
  - **Null** 被计算为 **false**
  - **布尔值** 被计算为 **布尔的值**
  - **数字** 如果是 **+0、-0 或 NaN** 被计算为 **false**，否则为 **true**
  - **字符串** 如果是空字符串 `''` 被计算为 **false**，否则为 **true**  

  ```javascript
  if ({}) { // => true
  }

  if ([]) { // => true
  }

  if (0) { // => false
  }

  if ('0') { // => true
  }

  if ('') { // => false
  }
  ```

### 2.10 其他

- 2.10.1【强制】禁止使用 eval。eslint: [no-eval](https://eslint.org/docs/rules/no-eval)

  `eval` 语句存在安全风险，可能导致注入攻击。

  ```javascript
  // bad
  const obj = { x: 'foo' };
  const key = 'x';
  const value = eval('obj.' + key);

  // good
  const obj = { x: 'foo' };
  const key = 'x';
  const value = obj[key];
  ```

- 2.10.2【强制】禁止使用 debugger。eslint: [no-debugger](https://eslint.org/docs/rules/no-debugger)

  `debugger` 语句会让程序暂停，并在当前位置开启调试器。它通常在程序调试阶段使用，不应发布到线上。

  ```javascript
  // bad
  function isTruthy(x) {
    debugger;
    return Boolean(x);
  }
  ```


- 2.10.3【推荐】禁止使用 alert。eslint: [no-alert](https://eslint.org/docs/rules/no-alert)

  `alert` 语句会使浏览器弹出原生警告框，这可能让人感觉你的程序出错了。如果需要对用户弹出警告信息，好的做法是使用第三方的弹窗组件或自己定义警告框样式。同理，`confirm` 和 `prompt` 语句也不应被使用。

  ```javascript
  // bad
  alert('Oops!');

  // good - 使用自定义的 Alert 组件
  Alert('Oops!');
  ```

- 2.10.4【推荐】生产环境禁止使用 console。eslint: [no-console](https://eslint.org/docs/rules/no-console)

  `console` 语句通常在调试阶段使用，发布上线前，应该去掉代码里所有的 `console` 语句。

  ```javascript
  // bad
  console.log('Some debug messages..');

  // good - 如果你非要使用 console 语句，可以考虑自己进行封装以确保不要在生产环境暴露调试信息
  const utils = {
    log: (msg) => {
      if (window.env !== 'product') {
        console.log(msg);
      }
    },
  };

  utils.log('Some debug messages..');
  ```

- 2.10.5【强制】禁止对原生对象或只读的全局对象进行赋值。eslint: [no-global-assign](https://eslint.org/docs/rules/no-global-assign)

  JS 执行环境中会包含一些全局变量和原生对象，如浏览器环境中的 `window`，node 环境中的 `global` 、`process`，`Object`，`undefined` 等。除了像 `window` 这样的众所周知的对象，JS 还提供了数百个内置全局对象，你可能在定义全局变量时无意对它们进行了重新赋值，因此最好的做法是不要定义全局变量。

  ```javascript
  // bad
  window = {};
  Object = null;
  undefined = 1;
  ```
