---
sidebar_position: 6
---

# 类

## class 声明类
- 【推荐】使用 class 语句声明类，而不是使用 prototype。

  `class` 语句是 ES6 中引入的用于声明类的语法糖，更加简洁易维护。

  ```javascript
  // bad
  function Person() {
    this.age = 1;
  }
  Person.prototype.growOld = function () {
    this.age += 1;
  }

  // good
  class Person {
    constructor() {
      this.age = 1;
    }
    growOld() {
      this.age += 1;
    }
  }
  ```

## extends 类的继承
- 【推荐】使用 extends 语句进行类的继承。

  `extends` 是用于原型继承的内建方法，不会破坏 `instanceof`。

  ```javascript
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this.queue[0];
  };

  // good
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
  ```

## 避免不必要 constructor
- 【强制】避免不必要的 constructor。

  ES6 class 会提供一个默认的 `constructor`，空 `constructor` 或者只调用父类的  `constructor` 是不必要的。eslint: [no-useless-constructor](https://eslint.org/docs/rules/no-useless-constructor)

  ```javascript
  // bad - 以下两种 constructor 可以省略
  class Parent {
    constructor() {
    }

    method() {
      // ...
    }
  }

  class Child extends Parent {
    constructor (value) {
      super(value);
    }

    method() {
      // ...
    }
  }

  // good
  class Parent {
    method() {
      // ...
    }
  }

  class Child extends Parent {
    method() {
      // ...
    }
  }
  ```

## super 方法
- 【强制】正确地使用 super 方法。eslint: [constructor-super](https://eslint.org/docs/rules/constructor-super) [no-this-before-super](https://eslint.org/docs/rules/no-this-before-super)

  - 子类的 `constructor` 中必须使用 `super()`，且必须在 `this` 和 `super` 关键词前调用
  - 非子类的 `constructor` 中不能使用 `super()`

  ```javascript
  // bad - 非子类不能使用 super
  class Parent {
    constructor() {
      super();
      this.name = 'parent';
    }
  }

  // good
  class Parent {
    constructor() {
      this.name = 'parent';
    }
  }

  // bad - 子类必须使用 super
  class Child extends Parent {
    constructor() {
      this.name = 'child';
    }
  }

  // bad - this 必须在调用 super 后使用
  class Child extends Parent {
    constructor() {
      this.name = 'foo';
      super();
    }
  }

  // good
  class Child extends Parent {
    constructor (value) {
      super(value);
      this.name = 'foo';
    }
  }
  ```

## 避免重复命名
- 【强制】避免重复的类成员命名。eslint: [no-dupe-class-members](https://eslint.org/docs/rules/no-dupe-class-members)

  重复的类成员声明最终生效的将是最后一个：

  ```javascript
  // bad
  class Foo {
    bar() { console.log('bar'); }
    bar() { console.log('baz'); }
  }
  const foo = new Foo();
  foo.bar(); // => baz

  // good
  class Foo {
    bar() { console.log('bar'); }
  }
  ```
