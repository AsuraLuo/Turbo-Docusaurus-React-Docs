---
sidebar_position: 3
---

# 原始类型

> JS的数据类型包括 7 种原始类型（primitive type），即 Boolean, Null, Undefined, Number, String, Symbol (ES6 新定义), BigInt（ES11新定义），以及 Object 类型，[了解更多](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)。这个章节主要介绍原始类型相关的规约。

- 2.2.1【强制】不要使用 new Number/String/Boolean。eslint: [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)

  使用 new Number/String//Boolean 声明不会有任何好处，还会导致变量成为 `object` 类型，可能引起 bug。

  ```javascript
  // bad
  const num = new Number(0);
  const str = new String('foo');
  const bool = new Boolean(false);
  console.log(typeof num, typeof str, typeof bool); // => object, object, object
  if (num) { // true（对象相当于 true）
  }
  if (bool) { // true（对象相当于 true）
  }

  // good
  const num = 0;
  const str = 'foo';
  const bool = false;
  console.log(typeof num, typeof str, typeof bool); // => number, string, boolean
  if (num) { // false（0 相当于 false）
  }
  if (bool) { // false
  }
  ```

- 2.2.2【推荐】类型转换。

  【数字】使用 `Number()` 或 `parseInt()` ：

    ```javascript
    const str = '1';

    // bad
    const num = +str;
    const num = str >> 0;
    const num = new Number(str);

    // good
    const num = Number(str);

    // good
    const num = parseInt(str, 10);
    ```

  【字符串】使用 `String()`：

    ```javascript
    const num = 1;

    // bad
    const str = new String(num); // typeof str is "object" not "string"
    const str = num + ''; // invokes num.valueOf()
    const str = num.toString(); // isn’t guaranteed to return a string

    // good
    const str = String(num);
    ```

  【布尔值】使用 `!!`：

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);
    const hasAge = Boolean(age);

    // good
    const hasAge = !!age;
    ```

- 2.2.3【推荐】使用 parseInt() 方法时总是带上基数。eslint: [radix](https://eslint.org/docs/rules/radix)

  `parseInt` 方法的第一个参数是待转换的字符串，第二个参数是转换基数。当第二个参数省略时，`parseInt` 会根据第一个参数自动判断基数：

  - 如果以 0x 开头，则使用 16 作基数
  - 如果以 0 开头，则使用 8 作基数。正是这条规则经常导致错误，ES5 规范中直接将这条规则移除，即 ES5 及之后的执行环境以 0 开头也会使用 10 作为基数
  - 其他情况则使用 10 作基数

  虽然从 ES5 开始就移除了自动以 8 作基数的规则，但有时难以保证所有的浏览器和 JS 执行环境都支持了这一特性。[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

  因此，推荐始终给 `parseInt()` 方法加上基数，除非可以保证代码的执行环境不受上述特性的影响。

  ```javascript
  // bad
  parseInt("071"); // => ES5 前的执行环境中得到的是 57

  // good
  parseInt("071", 10); // => 71
  ```

- 2.2.4【强制】避免不必要的布尔类型转换。eslint: [no-extra-boolean-cast](https://eslint.org/docs/rules/no-extra-boolean-cast)

  在 `if` 等条件语句中，将表达式的结果强制转换成布尔值是多余的：

  ```javascript
  // bad
  if (!!foo) {
    // ...
  }

  while (!!foo) {
    // ...
  }

  const a = !!flag ? b : c;

  // good
  if (foo) {
    // ...
  }

  while (foo) {
    // ...
  }

  const a = flag ? b : c;
  ```

#### 2.2.5 字符串

- 2.2.5.1【强制】字符串优先使用单引号。eslint: [quotes](https://eslint.org/docs/rules/quotes)

  ```javascript
  // bad
  const name = "tod";
  const name = `tod`; // 模板字符串中应包含变量或换行，否则需用单引号

  // good
  const name = 'tod';
  ```

- 2.2.5.2【推荐】使用模板字符串替代字符串拼接。eslint: [prefer-template](https://eslint.org/docs/rules/prefer-template)

  模板字符串让代码更简洁，可读性更强

  ```javascript
  // bad
  function getDisplayName({ nickName, realName }) {
    return nickName + ' (' + realName + ')';
  }

  // good
  function getDisplayName({ nickName, realName }) {
    return `${nickName} (${realName})`;
  }
  ```

- 2.2.5.3【强制】禁止不必要的转义字符。[no-useless-escape](https://eslint.org/docs/rules/no-useless-escape)

  转义字符会大大降低代码的可读性，因此尽量不要滥用它们。

  ```javascript
  // bad
  const foo = '\'this\' \i\s \"quoted\"';

  // good
  const foo = '\'this\' is "quoted"';
  const foo = `'this' is "quoted"`;
  ```
