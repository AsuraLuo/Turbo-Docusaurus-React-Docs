---
sidebar_position: 10
---

# 注释代码
## 3 注释

> 注释的目的：提高代码的可读性，从而提高代码的可维护性  
> 注释的原则：如无必要，勿增注释；如有必要，尽量详尽

- 3.1【推荐】单行注释使用 //。

  注释应单独一行写在被注释对象的上方，不要追加在某条语句的后面：

  ```javascript
  // bad
  const active = true;  // is current tab

  // good
  // is current tab
  const active = true;
  ```

  注释行上方需要有一个空行（除非注释行上方是一个块的顶部），以增加可读性：

  ```javascript
  // bad - 注释行上方需要一个空行
  function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // good
  function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // bad - 注释行上面是一个块的顶部时不需要空行
  function getType() {

    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // good
  function getType() {
    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }
  ```

- 3.2【推荐】多行注释使用 /** ... */，而不是多行的 //。

  ```javascript
  // bad
  // make() returns a new element
  // based on the passed in tag name
  function make(tag) {
    // ...

    return element;
  }

  // good
  /**
   * make() returns a new element
   * based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element;
  }
  ```

- 3.3【强制】注释内容和注释符之间需要有一个空格。eslint: [spaced-comment](https://eslint.org/docs/rules/spaced-comment)

  注释内容和注释符之间需要有一个空格，以增加可读性：

  ```javascript
  // bad
  //is current tab
  const active = true;

  // good
  // is current tab
  const active = true;

  // bad
  /**
   *make() returns a new element
   *based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element;
  }

  // good
  /**
   * make() returns a new element
   * based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element;
  }
  ```

- 3.4【参考】合理使用特殊注释标记。eslint: [no-warning-comments](https://eslint.org/docs/rules/no-warning-comments)

  有时我们发现某个可能的 bug，但因为一些原因还没法修复；或者某个地方还有一些待完成的功能，这时我们需要使用相应的特殊标记注释来告知未来的自己或合作者。最常用的特殊标记有两种：

  - `// FIXME: 说明问题是什么`
  - `// TODO: 说明还要做什么或者问题的解决方案`

  一个我们不愿看到却很普遍的情况是，我们给代码标记 `FIXME` 或 `TODO` 后却一直没找到时间处理。所以当你做了特殊标记，你应该为它负责，在某个时间把它解决。

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();

      // FIXME: shouldn’t use a global here
      total = 0;

      // TODO: total should be configurable by an options param
      this.total = 0;
    }
  }
  ```

- 3.5【参考】文档类注释使用 jsdoc 规范。

  文档类注释，如函数、类、文件、事件等，推荐使用 [jsdoc](http://usejsdoc.org/) 规范或类 jsdoc 的规范。

  例如：

  ```javascript
  /**
   * Book类，代表一个书本.
   * @constructor
   * @param {string} title - 书本的标题.
   * @param {string} author - 书本的作者.
   */
  function Book(title, author) {
    this.title = title;
    this.author = author;
  }

  Book.prototype = {
    /**
     * 获取书本的标题
     * @returns {string|*}
     */
    getTitle() {
      return this.title;
    },

    /**
     * 设置书本的页数
     * @param pageNum {number} 页数
     */
    setPageNum(pageNum) {
      this.pageNum = pageNum;
    },
  };
  ```

- 3.6【参考】无用的代码注释应被即时删除。

  无用的注释代码会使程序变得臃肿并降低可读性，应被即时删除。你可以通过版本控制系统找回被删除的代码。
