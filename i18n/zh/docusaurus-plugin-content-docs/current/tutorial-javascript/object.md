---
sidebar_position: 4
---

# 对象

## 创建对象
- 【强制】使用字面量创建对象。eslint: [no-new-object](https://eslint.org/docs/rules/no-new-object)

  ```javascript
  // bad
  const obj = new Object();

  // good
  const obj = {};
  ```

## 对象属性和方法
- 【强制】使用对象属性和方法的简写语法。eslint: [object-shorthand](https://eslint.org/docs/rules/object-shorthand)

  ES6 提供了对象属性和方法的简写语法，可以使代码更加简洁：

  ```javascript
  const value = 'foo';

  // bad
  const atom = {
    value: value,
    addValue: function (value) {
      return value + ' added';
    },
  };

  // good
  const atom = {
    value,
    addValue(value) {
      return value + ' added';
    },
  };
  ```

## 对象简写属性
- 【参考】将对象的简写属性写在一起。
  将简写的属性写在一起，置于对象的起始或末尾，可以提高代码整洁性。当然，如果你出于属性的含义或其他考虑进行排序也是允许的。

  ```javascript
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';

  // bad
  const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
  };

  // good
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

## 对象属性
- 【强制】对象的属性名不要用引号包裹，除非包含特殊字符。eslint: [quote-props](https://eslint.org/docs/rules/quote-props)

  这样更加简洁，也有助于语法高亮和一些 JS 引擎的优化。

  ```javascript
  // bad
  const bad = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
    'one two': 12,
  };

  // good
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
    'one two': 12,
  };
  ```

## 优先使用 . 访问对象属性
- 【强制】优先使用 . 访问对象的属性。eslint: [dot-notation](https://eslint.org/docs/rules/dot-notation)

  这样可以提高代码可读性。`[]` 仅应在访问动态属性名或包含特殊字符的属性名时被使用。

  ```javascript
  const obj = {
    active: true,
    [getDynamicKey()]: 'foo',
    'data-bar': 'bar',
  };

  // bad
  const isActive = obj['active'];

  // good
  const isActive = obj.active;
  const foo = obj[getDynamicKey()];
  const bar = obj['data-bar'];
  ```

## 扩展运算符
- 【推荐】使用扩展运算符 ... 处理对象。

  替代 `Object.assign` 方法，来进行对象的浅拷贝：

  ```javascript
  // very bad - original 会被影响
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }  original => { a: 1, b: 2, c: 3 }
  delete copy.a; // copy => { b: 2, c: 3 }  original => { b: 2, c: 3 }

  // bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

  // good
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
  ```

  获取排除某些属性的新对象：

  ```javascript
  // good
  const copy = { a: 1, b: 2, c: 3 };
  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

## 解构对象
- 【推荐】使用解构获取对象属性。eslint: [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)

  获取对象的同名属性、多个属性时，使用解构让代码更简洁，也可以减少为了使用属性而创建的临时引用。

  ```javascript
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  ```

## 对象的动态属性
- 【参考】对象的动态属性名应直接写在字面量定义中。
  ES6 允许在新建对象字面量时使用表达式作为属性名，这样可以将所有属性定义在一个地方。

  ```javascript
  function getKey(k) {
    return `a key named ${k}`;
  }

  // bad
  const obj = {
    id: 1,
    name: 'tod',
  };
  obj[getKey('foo')] = 'foo';

  // good
  const obj = {
    id: 1,
    name: 'tod',
    [getKey('foo')]: 'foo',
  };
  ```

## Object.prototypes
- 【强制】不要直接在对象上调用 Object.prototypes 上的方法。eslint: [no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins)

  不要直接在对象上调用 `Object.prototypes` 上的方法，例如 `hasOwnProperty`、`propertyIsEnumerable`、`isPrototypeOf`。

  这些方法可能会被对象上的属性覆盖，导致错误：

  ```javascript
  const obj = {
    foo: 'foo',
    hasOwnProperty: false,
  };
  const objNull = Object.create(null);

  // bad => Uncaught TypeError: obj.hasOwnProperty is not a function
  console.log(obj.hasOwnProperty('foo'));
  console.log(objNull.hasOwnProperty('foo'));

  // good
  console.log(Object.prototype.hasOwnProperty.call(obj, 'foo'));
  console.log(Object.prototype.hasOwnProperty.call(objNull, 'foo'));
  ```
