---
sidebar_position: 1
---

# 编辑风格

React JSX开发编码语法规范.

## 缩进

- JSX语法使用 2 个空格缩进。eslint: [react/jsx-indent](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md) [react/jsx-indent-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md) [react/jsx-closing-tag-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

  对于 JSX 语法，遵循与 JS 规约和 HTML 规约一致的 2 个空格缩进，不要使用 4 空格或 tab 缩进：
  
  ```jsx
  // bad
  <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
  >
      <Quux />
  </Foo>
  
  // good
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  >
    <Quux />
  </Foo>
  ```

## 空格

### 自闭合标签
- 自闭合标签的斜线前有且仅有一个空格。eslint: [no-multi-spaces](https://eslint.org/docs/rules/no-multi-spaces) [react/jsx-tag-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

  ```jsx
  // bad
  <Foo/>
  
  // very bad
  <Foo                 />
  
  // bad
  <Foo
   />
  
  // good
  <Foo />
  ```

### 行内属性
- JSX 行内属性之间仅有一个空格。eslint: [react/jsx-props-no-multi-spaces](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md)

  同一行中标签和属性之间、属性之间只有一个空格。
  ```jsx
  // bad
  <App  spacy />
  <App too  spacy />
  
  // good
  <App cozy />
  <App very cozy />
  ```

### 大括号内部
- JSX 属性的大括号内部两侧无空格。eslint: [react/jsx-curly-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

  ```jsx
  // bad
  <Foo bar={ baz } />
  
  // good
  <Foo bar={baz} />
  ```

### 等号两边
- 不要在 JSX 属性的等号两边加空格。eslint: [jsx-equals-spacing](https://eslint.org/docs/rules/jsx-equals-spacing)

  ```jsx
  // bad
  <Hello name = {firstname} />;
  
  // good
  <Hello name={firstname} />;
  ```

## 引号

- JSX 属性使用双引号，不要使用单引号。eslint: [jsx-quotes](https://eslint.org/docs/rules/jsx-quotes)

  为什么？HTML 属性通常使用双引号而不是单引号，因此 JSX 属性沿用了这种约定。
  其他 JS 使用单引号。
  
  ```jsx
  // bad
  <Foo bar='bar' />
  
  // good
  <Foo bar="bar" />
  
  // bad
  <Foo style={{ left: "20px" }} />
  
  // good
  <Foo style={{ left: '20px' }} />
  ```

## 小括号

- 多行的 JSX 标签需用小括号包裹。eslint: [react/jsx-wrap-multilines](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

  ```jsx
  // bad
  render() {
    return <MyComponent variant="long body" foo="bar">
             <MyChild />
           </MyComponent>;
  }
  
  // good
  render() {
    return (
      <MyComponent variant="long body" foo="bar">
        <MyChild />
      </MyComponent>
    );
  }
  
  // good - 单行的 jsx 无需加圆括号
  render() {
    const body = <div>hello</div>;
    return <MyComponent>{body}</MyComponent>;
  }
  ```

## 标签

### 无子元素标签
- 无子元素的标签需写成自闭合标签。eslint: [react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

  ```jsx
  // bad
  <Foo variant="stuff"></Foo>
  
  // good
  <Foo variant="stuff" />
  ```

### 属性换行
- 标签属性的换行。eslint: [react/jsx-max-props-per-line](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md) [react/jsx-first-prop-new-line](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md)

  对 JSX 标签属性的换行，遵循以下规则：
  
  - 标签名和它的属性可以写在一行，前提是不超过单行最大 100 字符数的限制
  - 如果标签有多个属性，且存在换行，则每个属性都需要换行独占一行
  
  ```jsx
  // bad - 属性应全部换行，或全部跟组件名写在一行
  <Foo superLongParam="bar"
       anotherSuperLongParam="baz" />
  
  // good
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  />
  
  // good - 组件名和属性可以写在一行，前提是不超过单行最大字符限制
  <Foo bar="bar" />
  
  // bad
  <Hello foo={{
      }}
      bar />
  
  // good
  <Hello foo={{
  }} />
  
  <Hello
      foo={{
      }}
      bar
  />
  ```

### 属性多行换行
- 标签的属性有多行时，结束标签需另起一行。eslint: [react/jsx-closing-bracket-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

  ```jsx
  // bad
  <Foo
    bar="bar"
    baz="baz" />
  
  // good
  <Foo
    bar="bar"
    baz="baz"
  />
  ```

### dangerouslySetInnerHTML
- 禁止在有子节点的组件或 DOM 元素中使用 dangerouslySetInnerHTML 属性。eslint: [react/no-danger-with-children](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md)

  ```jsx
  // bad
  <div dangerouslySetInnerHTML={{ __html: "HTML" }}>
    Children
  </div>
  
  <Hello dangerouslySetInnerHTML={{ __html: "HTML" }}>
    Children
  </Hello>
  
  // good
  <div dangerouslySetInnerHTML={{ __html: "HTML" }} />
  
  <Hello dangerouslySetInnerHTML={{ __html: "HTML" }} />
  
  <div>
    Children
  </div>
  
  <Hello>
    Children
  </Hello>
  ```

### 自闭和标签
- HTML 自闭标签不能有子节点。eslint: [react/void-dom-elements-no-children](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md)

  HTML 自闭标签，比如 img，br，hr，被统称为空 DOM 元素，不能给他们定义子节点。
  
  ```jsx
  // bad
  <br>Children</br>
  <br dangerouslySetInnerHTML={{ __html: 'HTML' }} />
  
  // good
  <div>Children</div>
  <div dangerouslySetInnerHTML={{ __html: 'HTML' }} />
  ```

### 危险属性
- 不要使用危险属性。eslint: [react/no-danger](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md)

  React中的危险属性是指那些已知会引起应用程序漏洞的属性。这些属性命名为 `dangerouslyXyz` 已经清楚地表明它们是危险的，应该尽量避免使用。[详细文档](https://facebook.github.io/react/tips/dangerously-set-inner-html.html)
  
  ```jsx
  // bad
  <div dangerouslySetInnerHTML={{ __html: "Hello World" }}></div>;
  
  // good
  <div>Hello World</div>;
  ```

### 注释字符串
- JSX 语句的文本节点中不要使用注释字符串（例如，以//或/ *开头）。eslint: [react/jsx-no-comment-textnodes](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md)

  ```jsx
  // bad
  class Hello extends React.Component {
    render() {
      return (
        <div>// empty div</div>
      );
    }
  };
  
  class Hello extends React.Component {
    render() {
      return (
        <div>
          /* empty div */
        </div>
      );
    }
  };
  
  // good
  class Hello extends React.Component {
    render() {
      return <div>{/* empty div */}</div>;
    }
  };
  
  class Hello extends React.Component {
    render() {
      return <div /* empty div */></div>;
    }
  };
  
  class Hello extends React.Component {
    render() {
      return <div className={'foo' /* temp class */}</div>;
    }
  };
  ```

### 禁止无意义字符
- 标签中禁止出现无意义字符，比如 > " } '。eslint: [react/no-unescaped-entities](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md)

  
  `>` 可用 `&gt;` 替代
  
  `"` 可用 `&quot;`，`&ldquo;` ， `&#34; ` 或者  `&rdquo;`  替代
  
  `'` 可用 `&apos;`，`&lsquo;`，`&#39;` 或者 `&rsquo;` 替代
  
  `}` 可用 `&#125;` 替代
  
  或者写在表达式里，比如 ` <div>{'>'}</div>`
  
  ```jsx
  // bad
  <MyComponent
    a="b">  {/* oops! */}
    c="d"
    Intended body text
  </MyComponent>
  
  // good
  <div> &gt; </div>
  <div> {'>'} </div>
  ```
