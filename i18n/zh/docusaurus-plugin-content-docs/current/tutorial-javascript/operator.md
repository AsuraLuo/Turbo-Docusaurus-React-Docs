---
sidebar_position: 8
---

# 操作符
### 2.8 操作符

- 2.8.1【推荐】使用严格相等运算符。eslint: [eqeqeq](https://eslint.org/docs/rules/eqeqeq)

  非严格相等运算符（`==` 和 `!=`）会在比较前将被比较值转换为相同类型，对于不熟悉 JS 语言特性的人来说，这可能造成不小的隐患。[了解更多](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

  因此，一般情况下我们应该使用严格比较运算符（ `===` 和 `!==`）进行比较。如果要比较的两个值类型不同，应该显性地将其转换成相同类型再进行严格比较，而不是依赖于 `==` 和 `!=` 的隐式类型转换。

  ```javascript
  const id = '83949';

  // bad - 为了兼容 id 可能是字符串的情况，而有意使用 == 与数字比较
  if (id == 83949) {
    // do something
  }

  // good - 如果 id 可能是字符串，应该先将其进行类型转换，再使用 === 进行比较
  if (Number(id) === 83949) {
    // do something
  }
  ```

- 2.8.2【强制】不要使用一元自增自减运算符。eslint: [no-plusplus](https://eslint.org/docs/rules/no-plusplus)

  不要使用一元自增自减运算符（`++` 和 `--`），除非在 `for` 循环条件中。

  `++` 和 `--` 会带来值是否会提前变化带来的理解成本，也可能因为自动添加分号机制导致一些错误，因此我们推荐使用 `num += 1` 来代替 `num++`。但出于习惯，在 `for` 循环的条件中依然可以使用自增自减运算符。

  ```javascript
  let num = 1;

  // bad
  num++;
  --num;

  // good
  num += 1;
  num -= 1;
  ```


- 2.8.3【强制】不要使用 void 运算符。eslint: [no-void](https://eslint.org/docs/rules/no-void)

  在很老版本的 JS 中，`undefined` 值是可变的，因此使用 `void` 语句一般是用来得到一个 `undefined` 值。而在新版本的 JS 中，上面的问题已不复存在。因此出于程序可读性的考虑，禁止使用 `void` 运算符。

  ```javascript
  // bad
  const foo = void 0;

  // good
  const foo = undefined;
  ```

- 2.8.4【强制】避免嵌套的三元表达式。eslint: [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary)

  嵌套的三元表达式会降低代码可读性。

  ```javascript
  // bad
  const foo = bar ? baz : qux === quxx ? bing : bam;

  // good
  const qu = qux === quxx ? bing : bam;
  const foo = bar ? baz : qu;
  ```

- 2.8.5【强制】避免不必要的三元表达式。eslint: [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary)

  ```javascript
  // bad
  const foo = a ? a : b;
  const bar = c ? true : false;
  const baz = c ? false : true;

  // good
  const foo = a || b;
  const bar = !!c;
  const baz = !c;
  ```

- 2.8.6【强制】混合使用多种操作符时，用小括号包裹分组。eslint: [no-mixed-operators](https://eslint.org/docs/rules/no-mixed-operators)

  这可以更清晰地表达代码意图，提高可读性。四则运算符（`+`, `-`, `*`, `/`）可以不包裹，因为大多数人熟知它们的优先级。

  ```javascript
  // bad
  const foo = a && b < 0 || c > 0 || d + 1 === 0;

  // good
  const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

  // bad
  const bar = a ** b - 5 % d;

  // good
  const bar = (a ** b) - (5 % d);

  // bad - 有人可能会误以为执行顺序是 (a || b) && c
  if (a || b && c) {
    return d;
  }

  // good
  if (a || (b && c)) {
    return d;
  }

  // good - 四则运算可以不用小括号包裹
  const bar = a + b / c * d;
  ```
