---
sidebar_position: 1
---

# 编码风格

JavaScript 编码规约主要包含编码风格、语言特性、注释、命名、配套工具等几个部分。本规约面向的 ECMAScript 语言版本是 ES6+，并提供了「关于 ES5」章节供仍在使用 ES5 的开发者查阅。
 
![示例代码标注图](/img/javascript.svg)

上图是一张符合规约要求编码风格的速览图，详细规则如下：

## 缩进

### 空格缩进
- 【强制】使用 2 个空格缩进。eslint: [indent](https://eslint.org/docs/rules/indent)

  统一使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进：

  ```javascript
  // bad
  function foo() {
  ∙∙∙∙let name;
  }

  // good
  function foo() {
  ∙∙let name;
  }
  ```

## 分号
- 【参考】使用分号。eslint: [semi](https://eslint.org/docs/rules/semi)

  统一以分号结束语句，可以避免 JS 引擎自动分号插入机制的怪异行为，在语义上也更加明确。

  > 自动分号插入机制（即 [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)，简称 ASI） 是当 JS 遇到不带分号的语句时判断是否自动添加分号的机制，它在个别情况下的行为比较怪异，可能导致意想不到的效果。此外随着 JS 新特性的增加，异常的情况可能变得更加复杂。

  ```javascript
  // bad - 导致 Uncaught ReferenceError 报错
  const luke = {}
  const leia = {}
  [luke, leia].forEach((jedi) => {
    jedi.father = 'vader'
  })

  // good
  const luke = {};
  const leia = {};
  [luke, leia].forEach((jedi) => {
    jedi.father = 'vader';
  });

  // bad - 导致 Uncaught ReferenceError 报错
  const reaction = "No! That's impossible!"
  (async function meanwhileOnTheFalcon() {
  }())

  // good
  const reaction = "No! That's impossible!";
  (async function meanwhileOnTheFalcon() {
  }());

  // bad - 函数将返回 `undefined` 而不是换行后的值
  function foo() {
    return
      'Result want to be returned'
  }

  // good
  function foo() {
    return 'Result want to be returned';
  }
  ```

## 行首逗号

### 多行结构
- 【强制】对于逗号分隔的多行结构，不使用行首逗号。eslint: [comma-style](https://eslint.org/docs/rules/comma-style)

  ```javascript
  // bad
  const story = [
      once
    , upon
    , aTime
  ];

  // good
  const story = [
    once,
    upon,
    aTime,
  ];

  // bad
  const hero = {
      firstName: 'Ada'
    , lastName: 'Lovelace'
    , superPower: 'computers'
  };

  // good
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    superPower: 'computers',
  };
  ```

### 逗号多行结构
- 【参考】对于逗号分隔的多行结构，始终加上最后一个逗号。eslint: [comma-dangle](https://eslint.org/docs/rules/comma-dangle)

  这样可以使增删行更加容易，也会使 git diffs 更清晰。Babel 等编译器会在编译后的代码里帮我们去掉最后额外的逗号，因此不必担心在旧浏览器中的问题。

  ```diff
  // bad - 没有结尾逗号时，新增一行的 git diff 示例
  const hero = {
       firstName: 'Florence',
  -    lastName: 'Nightingale'
  +    lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing']
  };

  // good - 有结尾逗号时，新增一行的 git diff 示例
  const hero = {
       firstName: 'Florence',
       lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing'],
  };
  ```

  ```javascript
  // bad
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully'
  };

  const heroes = [
    'Batman',
    'Superman'
  ];

  function createHero(
    firstName,
    lastName,
    inventorOf
  ) {
    // ...
  }

  createHero(
    firstName,
    lastName,
    inventorOf
  );

  // good
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  };

  const heroes = [
    'Batman',
    'Superman',
  ];

  function createHero(
    firstName,
    lastName,
    inventorOf,
  ) {
    // ...
  }

  createHero(
    firstName,
    lastName,
    inventorOf,
  );

  // good - 需注意，使用扩展运算符的元素后面不能加逗号
  function createHero(
    firstName,
    lastName,
    inventorOf,
    ...heroArgs
  ) {
    // ...
  }
  ```

## 块

> 术语解释：**块（block）** 可以理解为类、函数、控制语句等由大括号 `{}` 分隔的代码块状结构，由一对大括号界定，用于组合若干条语句 [了解更多](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)

### 大括号包裹
- 【推荐】始终使用大括号包裹代码块。eslint: [curly](https://eslint.org/docs/rules/curly) [nonblock-statement-body-position](https://eslint.org/docs/rules/nonblock-statement-body-position)

  多行代码块必须用大括号包裹：

  ```javascript
  // bad
  if (foo)
    bar();
    baz(); // 这一行并不在 if 语句里

  // good
  if (foo) {
    bar();
    baz();
  }
  ```

  代码块只有一条语句时，可以省略大括号，并跟控制语句写在同一行。但出于一致性和可读性考虑，不推荐这样做：

  ```javascript
  // bad
  if (foo)
    return false;

  // bad - 允许但不推荐
  if (foo) return false;

  // good
  if (foo) {
    return false;
  }
  ```

### 大括号换行风格

#### 非空代码块
- 【强制】对于非空代码块，采用 Egyptian Brackets 风格。eslint: [brace-style](https://eslint.org/docs/rules/brace-style)

  对于非空的代码块，大括号的换行方式采用 [Egyptian Brackets](https://blog.codinghorror.com/new-programming-jargon/) 风格，具体规则如下：

  - 左大括号 `{` 前面不换行，后面换行
  - 右大括号 `}` 前面换行
  - 右大括号 `}` 后面是否换行有两种情况：
    - 如果 `}` 终结了整个语句，如条件语句、函数或类的主体，则需要换行
    - 如果 `}` 后面存在 `else`、`catch`、`while` 等语句，或存在逗号、分号、右小括号（`)`），则不需要换行

  ```javascript
  // bad - else 应与 if 的 } 放在同一行
  if (foo) {
    thing1();
  }
  else
    thing2();
  }

  // good
  if (foo) {
    thing1();
  } else {
    thing2();
  }
  ```

#### 大括号闭合
- 【参考】对于空代码块，可以将大括号直接闭合。

  对于空的代码块，且不在类似 `if..else..` 或 `try..catch..finally..` 的多块结构中时，可以立即将大括号闭合：

  ```javascript
  // good
  function doNothing() {}
  ```

  但如果空代码块在多块结构中，仍建议按上一条非空块的 Egyptian Brackets 风格换行：

  ```javascript
  // bad
  if (condition) {
    // …
  } else if (otherCondition) {} else {
    // …
  }

  // good
  if (condition) {
    // …
  } else if (otherCondition) {
  } else {
    // …
  }

  // bad
  try {
    // …
  } catch (e) {}

  // good
  try {
    // …
  } catch (e) {
  }
  ```

#### 空代码块
- 【强制】不要使用空代码块。eslint: [no-empty](https://eslint.org/docs/rules/no-empty)

  不要让代码中出现空代码块，这会使阅读者感到困惑。如果必须使用空块，需在块内写明注释。

  ```javascript
  // bad
  if (condition) {
    thing1();
  } else {
  }

  // good
  if (condition) {
    thing1();
  } else {
    // TODO I haven’t determined what to do.
  }
  ```

## 空格

合理并一致地使用空格有助于提升代码的可读性和可维护性。具体来说，我们采用如下的空格风格：

- 【强制】空格风格。eslint: [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks) [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing) [space-in-parens](https://eslint.org/docs/rules/space-in-parens) [array-bracket-spacing](https://eslint.org/docs/rules/array-bracket-spacing) [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing) [space-infix-ops](https://eslint.org/docs/rules/space-infix-ops) [key-spacing](https://eslint.org/docs/rules/key-spacing)

  块的左大括号 `{` 前有一个空格：

  ```javascript
  // bad
  function test(){
    console.log('test');
  }

  // good
  function test() {
    console.log('test');
  }

  // bad
  dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });

  // good
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });
  ```

  控制语句（`if`、`while` 等）的左小括号 `(` 前有一个空格：

  ```javascript
  // bad
  if(isJedi) {
    fight ();
  }

  // good
  if (isJedi) {
    fight();
  }
  ```

  声明函数时，函数名和参数列表之间无空格：

  ```javascript
  // bad
  function fight () {
    console.log ('Swooosh!');
  }

  // good
  function fight() {
    console.log('Swooosh!');
  }
  ```

  小括号内部两侧无空格：

  ```javascript
  // bad
  function bar( foo ) {
    return foo;
  }

  // good
  function bar(foo) {
    return foo;
  }

  // bad
  if ( foo ) {
    console.log( foo );
  }

  // good
  if (foo) {
    console.log(foo);
  }
  ```

  方括号内部两侧无空格：

  ```javascript
  // bad
  const foo = [ 1, 2, 3 ];
  console.log(foo[ 0 ]);

  // good
  const foo = [1, 2, 3];
  console.log(foo[0]);
  ```

  大括号内部两侧有空格：

  ```javascript
  // bad
  const foo = {clark: 'kent'};

  // good
  const foo = { clark: 'kent' };
  ```

  运算符两侧有空格，除了一元运算符：

  ```javascript
  // bad
  const x=y+5;

  // good
  const x = y + 5;

  // bad
  const isRight = result === 0? false: true;

  // good
  const isRight = result === 0 ? false : true;

  // bad - 一元运算符与操作对象间不应有空格
  const x = ! y;

  // good
  const x = !y;
  ```

  定义对象字面量时， key, value 之间有且只有一个空格，不允许所谓的「水平对齐」：

  ```javascript
  // bad
  {
    a:            'short',
    looooongname: 'long',
  }

  // bad
  {
    a           : 'short',
    looooongname: 'long',
  }

  // good
  {
    a: 'short',
    looooongname: 'long',
  }
  ```



## 空行

### 末尾保留空行
- 【推荐】在文件末尾保留一行空行。eslint: [eol-last](https://eslint.org/docs/rules/eol-last)

  在非空文件中保留拖尾换行是一种常见的 UNIX 风格。它的好处同输出文件到终端一样，方便在串联和追加文件时不会打断 shell 的提示。

  我们统一在文件末尾保留一行空行，即用一个换行符结束文件：

  ```javascript
  // bad - 文件末尾未保留换行符
  import { foo } from './Foo';
  // ...
  export default foo;

  // bad - 文件末尾保留了2个换行符
  import { foo } from './Foo';
  // ...
  export default foo;↵
  ↵

  // good
  import { foo } from './Foo';
  // ...
  export default foo;↵
  ```


### 开始和结束不能空行
- 【强制】块的开始和结束不能是空行。eslint: [padded-blocks](https://eslint.org/docs/rules/padded-blocks)

  ```javascript
  // bad
  function bar() {

    console.log(foo);

  }

  // good
  function bar() {
    console.log(foo);
  }

  // bad
  if (baz) {

    console.log(qux);
  } else {
    console.log(foo);

  }

  // good
  if (baz) {
    console.log(qux);
  } else {
    console.log(foo);
  }
  ```

### 块末和新语句空行
- 【参考】在块末和新语句间插入一个空行。
  ```javascript
  // bad
  if (foo) {
    return bar;
  }
  return baz;

  // good
  if (foo) {
    return bar;
  }

  return baz;

  // bad
  const obj = {
    foo() {
    },
    bar() {
    },
  };
  return obj;

  // good
  const obj = {
    foo() {
    },

    bar() {
    },
  };

  return obj;
  ```

## 最大字符数和最大行数

### 单行最大字符数
- 【推荐】单行最大字符数：100。eslint: [max-len](https://eslint.org/docs/rules/max-len)

  过长的单行代码不易阅读和维护，需要进行合理换行。

  我们推荐单行代码最多不要超过 100 个字符，除了以下两种情况：

  - 字符串和模板字符串
  - 正则表达式

  ```javascript
  // bad
  const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

  // good
  const foo = jsonData
    && jsonData.foo
    && jsonData.foo.bar
    && jsonData.foo.bar.baz
    && jsonData.foo.bar.baz.quux
    && jsonData.foo.bar.baz.quux.xyzzy;

  // bad
  $.ajax({ method: 'POST', url: 'https://foo.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

  // good
  $.ajax({
    method: 'POST',
    url: 'https://foo.com/',
    data: { name: 'John' },
  })
    .done(() => console.log('Congratulations!'))
    .fail(() => console.log('You have failed this city.'));
  ```

### 文件最大行数
- 【参考】文件最大行数：1000。eslint: [max-lines](https://eslint.org/docs/rules/max-lines)

  过长的文件不易阅读和维护，最好对其进行拆分。

### 函数最大行数
- 【参考】函数最大行数：80。eslint: [max-lines-per-function](https://eslint.org/docs/rules/max-lines-per-function)

  过长的函数不易阅读和维护，最好对其进行拆分。

