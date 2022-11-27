---
sidebar_position: 12
---

# 关于ES5





## 5 关于 ES5

这个章节是为还在使用 ES5 及之前版本 JS 的同学准备。因为本规约以 ES6 编写，你可以通过阅读本章节来了解 ES5 中有哪些需要额外注意的地方。

- 5.1【推荐】ES5 中的变量声明。

  使用 `var` 进行声明：

  ```javascript
  // good
  var foo = 'foo';
  ```

  需注意，`var` 声明的变量不是块作用域而是函数作用域：

  ```javascript
  // 将打印 2, 2, 2，而非 0, 1, 2
  for (var i = 0; i < 3; ++i) {
    var iteration = i;
    setTimeout(function() { console.log(iteration); }, i * 1000);
  }
  ```

  另外，`var` 声明的变量会被提升到其作用域顶部：

  ```javascript
  // 变量声明会被提升到函数顶部，但赋值不会被提升
  function example() {
    console.log(declaredButNotAssigned); // => undefined
    console.log(notDeclared); // => throws a ReferenceError
    var declaredButNotAssigned = true;
  }
  ```

  即便如此，我们还是推荐在变量使用前再进行声明，而不是统一在作用域开始处声明，以增强可读性。当然，如果你担心声明提升问题会带来隐患，也可以选择统一在作用域开始处进行声明。

  不要在声明前就使用变量，这样做可能给人带来疑惑和隐患。eslint: [`no-use-before-define`](https://eslint.org/docs/rules/no-use-before-define.html)

  ```javascript
  // bad
  console.log(foo); // => undefined
  var foo = 'foo';

  // good
  var foo = 'foo';
  console.log(foo); // => foo
  ```

- 5.2【强制】对于逗号分隔的多行结构，不要加上最后一个行末逗号。eslint: [comma-dangle](https://eslint.org/docs/rules/comma-dangle)

  这样做会在 IE6/7 和 IE9 怪异模式下引起问题。另外，多余的逗号在某些 ES3 的实现里会增加数组的长度。

  ```javascript
  // bad
  var hero = {
    firstName: 'Kevin',
    lastName: 'Flynn',
  };

  // good
  var hero = {
    firstName: 'Kevin',
    lastName: 'Flynn'
  };
  ```

- 5.3【参考】使用 Array 的 slice 方法进行数组复制和类数组对象转换。

  数组复制：

  ```javascript
  var items = [1, 2, 3];

  // bad
  var itemsCopy = [];
  for (var i = 0; i < items.length; i++) {
    itemsCopy[i] = items[i];
  }

  // good
  var itemsCopy = items.slice();
  ```

  将类数组对象转换成数组：

  ```javascript
  function trigger() {
    var args = Array.prototype.slice.call(arguments);
    // ...
  }
  ```

- 5.4【推荐】不要使用保留字作为对象的属性名。

  不要使用[保留字](http://es5.github.io/#x7.6.1)作为对象的属性名，它们在 IE8 中不工作

  ```javascript
  // bad
  var superman = {
    class: 'alien',
    default: { clark: 'kent' },
    private: true
  };

  // good
  var superman = {
    type: 'alien',
    defaults: { clark: 'kent' },
    hidden: true
  };
  ```

## 参考资料

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [ESLint rules](https://eslint.org/docs/rules/)
