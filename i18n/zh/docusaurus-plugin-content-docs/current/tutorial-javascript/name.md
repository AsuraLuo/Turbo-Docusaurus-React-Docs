---
sidebar_position: 11
---

# 命名
## 4 命名

- 4.1【参考】文件名：使用小写字母命名。考虑到部分操作系统（如 Windows, MacOS）下文件系统大小写不敏感，推荐使用 `-` 连接。例如：hello-world.js。

- 4.2【参考】使用小驼峰（camelCase）命名原始类型、对象、函数、实例。[camelcase](https://eslint.org/docs/rules/camelcase)

  ```javascript
  // bad
  const this_is_my_string = 'foo';
  const this_is_my_object = {};
  function this_is_my_function() {}

  // good
  const thisIsMyString = 'foo';
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```

- 4.3【强制】使用大驼峰（PascalCase）命名类和构造函数。eslint: [new-cap](https://eslint.org/docs/rules/new-cap)

  ```javascript
  // bad
  function user(options) {
    this.name = options.name;
  }

  const bad = new user({
    name: 'nope',
  });

  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }

  const good = new User({
    name: 'yup',
  });
  ```

- 4.4【参考】全部大写字母&单词间用下划线分割的命名模式（UPPERCASE_VARIABLES）。

  全大写字母、单词间使用下划线分割的命名模式（UPPERCASE_VARIABLES），仅用于命名常量，且该常量需同时满足如下条件：

  - 使用 `const` 关键字声明
  - 用于 `export`，而不是本文件内

  ES6 后 `const` 关键字用于声明常量，被广泛使用，如果所有用 `const` 声明的值都用 UPPERCASE_VARIABLES 模式命名会使可读性变差，是没有必要的。因此我们约定 UPPERCASE_VARIABLES 命名模式只用于 export 给其他文件用的常量，如果只在同文件内使用，依然使用正常的命名风格。

  ```javascript
  // bad - 在本文件中使用的常量，不需使用 UPPERCASE_VARIABLES 风格
  const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

  // bad
  export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

  // good
  export const THIS_IS_CONSTANT = '一个常量';
  ```

  此外，如果 `export` 一个对象，只有对象本身需要使用 UPPERCASE_VARIABLES ，对象属性的 key 仍然使用正常命名风格：

  ```javascript
  // bad - unnecessarily uppercases key while adding no semantic value
  export const AN_OBJECT = {
    KEY: 'value',
  };

  // good
  export const AN_OBJECT = {
    key: 'value',
  };
  ```

- 4.5【参考】模块相关的命名规范。

  使用小驼峰（camelCase）命名 `export` 的函数：

  ```javascript
  function makeStyleGuide() {
    // ...
  }

  export default makeStyleGuide;
  ```

  使用大驼峰（PascalCase）命名 `export` 的 class、函数库、字面量对象：

  ```javascript
  const AnObject = {
    foo: {
      // ...
    },
  };

  export default AnObject;
  ```

- 4.6【参考】命名不要以下划线开头或结尾。eslint: [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)

  JS 没有私有属性或私有方法的概念，这样的命名可能会让人误解。

  ```javascript
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';
  this._firstName = 'Panda';

  // good
  this.firstName = 'Panda';
  ```
