---
sidebar_position: 7
---

# 模块

## ES6 modules
- 【推荐】使用 ES6 modules 而非其他非标准的模块系统。eslint: [import/module-systems](https://github.com/benmosher/eslint-plugin-import#module-systems)

  使用 ES6 modules (`import`/`export`)，而不是其他非标准的模块系统，如 CommonJS、AMD、CMD。

  ES6 modules 作为标准代表着未来，让我们拥抱未来吧。

  ```javascript
  // bad
  const React = require('react');
  module.exports = React.Component;

  // good
  import React, { Component } from 'react';
  export default Component;
  ```

## 引入同一模块
- 【强制】不要用多个 import 引入同一模块。eslint: [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md)

  多条 `import` 语句引入了同一模块会降低可维护性，你需要将它们合成一条语句。

  ```javascript
  // bad
  import React from 'react';
  import { Component }  from 'react';

  // good
  import React, { Component } from 'react';
  ```

## 引入模块顺序
- 【强制】import 语句需要放到模块的最上方。eslint: [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

  由于 `import` 语句会被声明提升，将它们放到模块的最上方以防止异常行为。

  ```javascript
  // bad
  import foo from 'foo';
  foo.init();

  import bar from 'bar';
  bar.init();

  // good
  import foo from 'foo';
  import bar from 'bar';

  foo.init();
  bar.init();
  ```

## 禁止 default
- 【强制】禁止 default import 的名字跟文件内的其他 export 命名相同。eslint: [import/no-named-as-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md)

  ```javascript
  // foo.js
  export default 'foo';
  export const bar = 'bar';

  // bad
  import bar from './foo.js';

  // good
  import foo from './foo.js';
  ```

## 禁止引用自身
- 【强制】禁止引用自身。eslint: [import/no-self-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md)

## 禁止循环引用
- 【强制】禁止循环引用。eslint: [import/no-cycle](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md)

##  导出的名称作为属性
- 【推荐】不要在 default export 上使用一个已导出的名称作为属性。eslint: [import/no-named-as-default-member](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md)

  ```javascript
  // foo.js
  export default 'foo';
  export const bar = 'bar';

  // bad
  import foo from './foo.js';
  const bar = foo.bar; // or
  const { bar } = foo;

  // good
  import foo, { bar } from './foo.js';
  ```

- 2.7.8【推荐】在模块导入之后保留一个空行。eslint: [import/newline-after-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md)

  ```javascript
  // bad
  import foo from './foo.js';
  const FOO = 'FOO'

  // good
  import foo from './foo.js';

  const FOO = 'FOO'
  ```

## import 语句的排序
- 【参考】import 语句的排序。eslint: [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)

  `import` 语句建议按以下规则排序：

  - 先 `import` 第三方模块，再 `import` 自己工程里的模块
  - 先 `import` 绝对路径，再 `import` 相对路径

  ```javascript
  // bad
  import foo from 'components/foo';
  import './index.scss';
  import React from 'react';

  // good
  import React from 'react';
  import foo from 'components/foo';
  import './index.scss';
  ```

## default export
- 【参考】当模块内只有一个 export 时，使用 default export。eslint: [import/prefer-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

  我们也建议文件内只包含一个 export，这有利于代码的可维护性。

  ```javascript
  // bad
  export function foo() {}

  // good
  export default function foo() {}
  ```

## 直接 export
- 【参考】不要在 import 时直接 export。

  虽然一行代码更简洁，但这不利于代码的可读性和一致性。

  ```javascript
  // bad
  export { Com as Component } from 'react';

  // good
  import { Component } from 'react';

  export default Component;
  ```

## EMS和CJS
- 【参考】模块开发者选择EMS和CJS时，需要判断运行时环境：如果你的模块是只面向浏览器的则选择ESM；如果你的模块是只面向Node.js的则选择CJS，并且确定遵循[CJS命名空间规则](https://nodejs.org/api/esm.html#esm_commonjs_namespaces)；如果你的模块是2者都要兼容的，则ESM和CJS都要支持。

  Node.js的模块，历史上Node.js遵循的是CommonJS，因此ES6 Module会有比较严重的兼容性问题。暂时没有特别好的解法，只能在Node.js中跟进运行时环境，判断使用模块标准。[讨论issue](https://github.com/nodejs/node/issues/33954)
