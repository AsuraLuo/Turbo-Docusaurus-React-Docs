---
sidebar_position: 2
---

# 语言特性

React语言特性，受控组件和非受控组件

## 基本

- 2.1.1【参考】使用 `JSX` 语法时，防止 `React` 变量被标记为未使用，可以使用 `@jsx` 标注来指定 `React` 之外的变量。eslint: [react/jsx-uses-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md)

  ```jsx
  // bad
  var React = require('react');
  // nothing to do with React

  /** @jsx Foo */
  var React = require('react');
  var Hello = <div>Hello {this.props.name}</div>;
  
  // good
  var React = require('react');
  var Hello = <div>Hello {this.props.name}</div>;

  /** @jsx Foo */
  var Foo = require('foo');
  var Hello = <div>Hello {this.props.name}</div>;
  ```

- 2.1.2【强制】不要使用未声明的组件。eslint: [react/jsx-no-undef](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md) [react/jsx-uses-vars](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md)

  不允许没有引用组件就直接使用，也可能是组件名拼写错误。
  
  ```jsx
  // bad
  <Hello name="John" />;
  
  // good
  import Hello from './Hello';
  
  <Hello name="John" />;
  ```

- 2.1.3【强制】每个文件只包含一个 React 组件。eslint: [react/no-multi-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md)

  但是可以包含多个[函数组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components)。

- 2.1.4【强制】不要在函数组件中使用 this。eslint: [react/no-this-in-sfc](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md)

  ```jsx
  // bad
  function Foo(props, context) {
    return (
      <div>
        {this.context.foo ? this.props.bar : ''}
      </div>
    );
  }
  
  // good
  function Foo(props, context) {
    return (
      <div>
        {context.foo ? props.bar : ''}
      </div>
    );
  }
  ```

- 2.1.5【强制】使用 ES6 class 创建组件 ，而不是 [createReactClass](https://reactjs.org/docs/react-without-es6.html) 。eslint: [react/prefer-es6-class](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)

  ```jsx
  // bad
  const Listing = createReactClass({
   // ...
   render() {
     return <div>{this.state.hello}</div>;
   }
  });
  
  // good
  class Listing extends React.Component {
   // ...
   render() {
     return <div>{this.state.hello}</div>;
   }
  }
  ```

- 2.1.6【参考】如果组件没有内部状态或 refs ，应使用函数组件，而不是类组件。eslint: [react/prefer-stateless-function](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

  ```jsx
  // bad
  class Listing extends React.Component {  
    render() {
      return <div>{this.props.hello}</div>;
    }
  }
  
  // bad
  const Listing = ({ hello }) => (
    <div>{hello}</div>
  );
  
  // good
  function Listing({ hello }) {
    return <div>{hello}</div>;
  }
  ```

- 2.1.7【强制】不要使用 React.createElement，除非你不是用 JSX 文件初始化应用程序。

## 方法

- 2.2.1【推荐】不要在 JSX 属性中使用 .bind()。eslint: [react/jsx-no-bind](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  这不利于组件性能，每次 render 都会创建一个新的函数。
  
  有 2 种替代方案：
  
  - 在 `constructor` 中绑定事件处理函数
  - 使用 react 的 [property initializers](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding) 特性或 [ES7 autobind decorator ](https://www.npmjs.com/package/core-decorators#autobind)
  
  ```jsx
  // bad
  class extends React.Component {
    onClickDiv() {
      // ...
    }
  
    render() {
      return <div onClick={this.onClickDiv.bind(this)} />;
    }
  }
  
  // good - 在 constructor 中绑定事件处理函数
  class extends React.Component {
    constructor(props) {
      super(props);
  
      this.onClickDiv = this.onClickDiv.bind(this);
    }
  
    onClickDiv() {
      // ...
    }
  
    render() {
      return <div onClick={this.onClickDiv} />;
    }
  }
  
  // good - 使用 react 的 property initializers 特性
  class extends React.Component {
    constructor(props) {
      super(props);
    }
  
    onClickDiv = () => {
      // ...
    }
  
    render() {
      return <div onClick={this.onClickDiv} />;
    }
  }
  ```

- 2.2.2【强制】render 方法必须要有返回值。eslint: [react/require-render-return](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

  ```jsx
  // bad
  render() {
    (<div />);
  }
  
  // good
  render() {
    return (<div />);
  }
  ```

- 2.2.3【强制】禁止使用 ReactDOM.render 的返回值。eslint: [react/no-render-return-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md)

  render()返回 ReactComponent 实例的引用。然而，应该避免使用这个返回值，因为在某些情况下，React 的未来版本中 render 方法可能会异步执行。如果需要引用 ReactComponent 实例，根元素需要增加 ref 回调。
  
  ```jsx
  // bad
  const inst = ReactDOM.render(<App />, document.body);
  doSomethingWithInst(inst);
  
  // good
  ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);
  
  ReactDOM.render(<App />, document.body, doSomethingWithInst);
  ```

- 2.2.4【强制】在扩展 React.PureComponent 时禁止使用 shouldComponentUpdate。eslint: [react/no-redundant-should-component-update](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md)

  定义 React.PureComponent 扩展组件时使用 shouldComponentUpdate 虽然有效，但是扩展 PureComponent 变得毫无意义。
  
  ```jsx
  // bad
  class Foo extends React.PureComponent {
    shouldComponentUpdate() {
      // do check
    }
  
    render() {
      return <div>Radical!</div>
    }
  }
  
  function Bar() {
    return class Baz extends React.PureComponent {
      shouldComponentUpdate() {
        // do check
      }
  
      render() {
        return <div>Groovy!</div>
      }
    }
  }
  
  // good
  class Foo extends React.Component {
    shouldComponentUpdate() {
      // do check
    }
  
    render() {
      return <div>Radical!</div>
    }
  }
  
  function Bar() {
    return class Baz extends React.Component {
      shouldComponentUpdate() {
        // do check
      }
  
      render() {
        return <div>Groovy!</div>
      }
    }
  }
  
  class Qux extends React.PureComponent {
    render() {
      return <div>Tubular!</div>
    }
  }
  ```

- 2.2.5【强制】禁止使用已经废弃的方法。eslint: [react/no-deprecated](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md)

  随着React版本升级，有些方法逐渐被弃用。
  
  ```jsx
  // bad
  React.render(<MyComponent />, root);
  
  React.unmountComponentAtNode(root);
  
  React.findDOMNode(this.refs.foo);
  
  React.renderToString(<MyComponent />);
  
  React.renderToStaticMarkup(<MyComponent />);
  
  React.createClass({ /* Class object */ });
  
  const propTypes = {
    foo: PropTypes.bar,
  };
  
  //Any factories under React.DOM
  React.DOM.div();
  
  import React, { PropTypes } from 'react';
  
  class Foo extends React.Component {
    componentWillMount() { }
    componentWillReceiveProps() { }
    componentWillUpdate() { }
    // ...
  }
  
  class Foo extends React.PureComponent {
    componentWillMount() { }
    componentWillReceiveProps() { }
    componentWillUpdate() { }
    // ...
  }
  
  var Foo = createReactClass({
    componentWillMount: function() {},
    componentWillReceiveProps: function() {},
    componentWillUpdate: function() {},
    // ...
  })
  
  // good
  ReactDOM.render(<MyComponent />, root);
  
  // When [1, {"react": "0.13.0"}]
  ReactDOM.findDOMNode(this.refs.foo);
  
  import { PropTypes } from 'prop-types';
  
  class Foo {
    componentWillMount() { }
    componentWillReceiveProps() { }
    componentWillUpdate() { }
  }
  ```

- 2.2.6【强制】不要使用 findDOMNode。eslint: [react/no-find-dom-node](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md)

  [严格模式下已经弃用 findDOMNode](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)。
  
  ```jsx
  // bad
  class MyComponent extends Component {
    componentDidMount() {
      findDOMNode(this).scrollIntoView();
    }

    render() {
      return <div />
    }
  }
  
  // good
  class MyComponent extends Component {
    componentDidMount() {
      this.node.scrollIntoView();
    }

    render() {
      return <div ref={node => this.node = node} />
    }
  }
  ```

- 2.2.7【强制】不要使用 componentWillMount、componentWillReceiveProps、componentWillUpdate。

  不要再使用 [componentWillMount](https://reactjs.org/docs/react-component.html#unsafe_componentwillmount) 、[componentWillReceiveProps](https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)、[componentWillUpdate](https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate)。使用这些生命周期方法通常会导致错误和不一致，因此React 计划在17版本删掉这些方法。
  
  - componentWillMount() 可以用 constructor() 或 componentDidMount() 替代；
  - componentWillReceiveProps() 可以用 componentDidUpdate() 或其他方式替换；
  - componentWillUpdate() 可以用 componentDidUpdate() 替换或者把逻辑写在 getSnapshotBeforeUpdate() 中。
  
  使用[rename-unsafe-lifecycles codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)自动为不推荐使用的生命周期钩子添加“UNSAFE_”前缀。转化为
  - UNSAFE_componentWillMount()
  - UNSAFE_componentWillReceiveProps()
  - UNSAFE_componentWillUpdate()

- 2.2.8【强制】不要在 componentWillUpdate 内改变 state 值。eslint: [react/no-will-update-set-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md)

  首先，不要再使用 componentWillUpdate，[React 未来在17版本计划删掉 componentWillUpdate](https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate)。通常可以用 componentDidUpdate() 替代。使用[rename-unsafe-lifecycles codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)自动更新组件。
  
  不要在 componentWillUpdate 调用 this.setState()。若你需要更新状态响应属性的变更，使用 [getDerivedStateFromProps()](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops) 代替。在 componentWillUpdate 中改变 state 的值可能会引起组件的不确定状态。
  
  ```jsx
  // bad
  class Hello extends React.Component {
    componentWillUpdate() {
      this.setState({
        name: this.props.name.toUpperCase()
      });
    }

    render() {
      return <div>Hello {this.state.name}</div>;
    }
  };
  
  // good
  class Hello extends React.Component {
    componentWillUpdate() {
      this.props.prepareHandler();
    }

    render() {
      return <div>Hello {this.props.name}</div>;
    }
  };
  
  class Hello extends React.Component {
    componentWillUpdate() {
      this.prepareHandler(function callback(newName) {
        this.setState({
          name: newName
        });
      });
    }

    render() {
      return <div>Hello {this.props.name}</div>;
    }
  };
  ```

## Props

- 2.3.1【强制】采用小驼峰风格命名 prop 。eslint: [react/no-unknown-property](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md)

  ```jsx
  // bad
  <Foo
    UserName="hello"
    phone_number={12345678}
  />
  
  // good
  <Foo
    userName="hello"
    phoneNumber={12345678}
  />
  ```

- 2.3.2【强制】声明的 prop 必须被使用。eslint: [react/no-unused-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md)

  声明而未使用的 prop 可能带来潜在的问题，也会给维护者造成困扰，应将它们删除。
  
  ```jsx
  // bad
  var Hello = createReactClass({
    propTypes: {
      name: PropTypes.string
    },
    render: function() {
      return <div>Hello Bob</div>;
    }
  });
  
  var Hello = createReactClass({
    propTypes: {
      firstname: PropTypes.string.isRequired,
      middlename: PropTypes.string.isRequired, // middlename is never used below
      lastname: PropTypes.string.isRequired
    },
    render: function() {
      return <div>Hello {this.props.firstname} {this.props.lastname}</div>;
    }
  });
  
  // good
  var Hello = createReactClass({
    propTypes: {
      name: PropTypes.string
    },
    render: function() {
      return <div>Hello {this.props.name}</div>;
    }
  });
  ```

- 2.3.3【参考】 props，state 优先使用解构赋值。eslint: [react/destructuring-assignment](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md)

  ```jsx
  // bad
  const MyComponent = (props) => {
    return (<div id={props.id} />)
  };
  
  // good
  const MyComponent = ({id}) => {
    return (<div id={id} />)
  };
  
  const MyComponent = (props, context) => {
    const { id } = props;
    return (<div id={id} />)
  };
  ```

- 2.3.4【强制】prop 值为 true 时，可以省略它的值。eslint: [react/jsx-boolean-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

  ```jsx
  // bad
  <Foo
    hidden={true}
  />
  
  // good
  <Foo
    hidden
  />
  ```

- 2.3.5【推荐】prop 需要 propTypes 验证。eslint: [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)

  PropTypes 验证接收到的数据从而提高组件的可重用性。如果其他开发传入了不正确数据类型，可以及时警告。
  
  ```jsx
  // bad
  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  
  // good
  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  
  Greeting.propTypes = {
    name: PropTypes.string
  };
  ```

- 2.3.6【推荐】不要使用模糊的类型检查器。eslint: [react/forbid-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md)

  不要使用模糊的类型验证，比如 any, array, object。它们可以用其他明确的类型代替。any可以替换为任意类型，array 和 object 可以分别替换为 arrayOf 和 shape。
  
  ```jsx
  // bad
  class MyComponent extends React.Component {
    ...
  }
  
  MyComponent.propTypes = {
    // 任意类型的数据
    optionalAny: PropTypes.any,
    // 一个未指定元素类型的数组
    optionalArray: PropTypes.array,
    // 一个未指定属性类型的对象
    optionalObject: PropTypes.object
  };
  
  // good
  class MyComponent extends React.Component {
    ...
  }
  
  MyComponent.propTypes = {
    // 指明待验证数据的特性类型，确保接收的数据是有效的
    optionalAny: PropTypes.string,
    requiredAny: PropTypes.any.isRequired,
    // 一个指定了元素类型的数组
    optionalArray: PropTypes.arrayOf(PropTypes.number),
    // 一个指定了属性类型的对象
    optionalObject: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),
  };
  ```

- 2.3.7【参考】属性需要指定 defaultProps，除了 isRequired 的属性。eslint: [react/require-default-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md)

  ```jsx
  // bad
  function MyStatelessComponent({ foo, bar }) {
    return <div>{foo}{bar}</div>;
  }
  MyStatelessComponent.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
  };
  
  // good
  function MyStatelessComponent({ foo, bar }) {
    return <div>{foo}{bar}</div>;
  }
  MyStatelessComponent.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
  };
  MyStatelessComponent.defaultProps = {
    bar: '',
  };
  ```

- 2.3.8【强制】如果属性有 isRequired 类型检查，不要在 defaultProps 内对其赋值。eslint: [react/default-props-match-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md)

  propTypes 类型检查发生在 defaultProps 解析之后，如果在 defaultProps 赋值，isRequired 类型检查没有实际意义。
  
  ```jsx
  // bad
  MyStatelessComponent.propTypes = {
    foo: React.PropTypes.string.isRequired,
    bar: React.PropTypes.string
  };
  
  MyStatelessComponent.defaultProps = {
    foo: "foo"
  };
  
  // good
  MyStatelessComponent.propTypes = {
    foo: React.PropTypes.string.isRequired,
    bar: React.PropTypes.string
  };
  
  MyStatelessComponent.defaultProps = {
      bar: 'some default'
  };
  ```

- 2.3.9【推荐】不要用数组的索引值作为 map 生成元素的 key。eslint: [react/no-array-index-key](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

  为什么？React 使用 key 来标识哪些项已更改，已添加或已删除， [key 应该始终稳定](https://reactjs.org/docs/lists-and-keys.html#keys)。使用不稳定的 ID 是一种[反模式](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)，因为它不能唯一标识元素。如果数组重新排序或将元素添加到数组的开头，可能会更改索引导致不必要的渲染，对性能产生负面影响。
  
  如果数组的顺序可能发生变化，我们不建议使用索引值作为 key。
  
  ```jsx
  // bad
  {todos.map((todo, index) =>
    <Todo
      {...todo}
      key={index}
    />
  )}
  
  // good
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```

- 2.3.10【强制】禁止将 children 作为属性名。eslint: [react/no-children-prop](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md)

  使用 JSX 时，`children` 应嵌套在开始和结束标签之间。不使用JSX时，应将 `children` 作为附加参数传递给 `React.createElement`。
  
  ```jsx
  // bad
  <div children='Children' />
  
  <MyComponent children={<AnotherComponent />} />
  <MyComponent children={['Child 1', 'Child 2']} />
  
  React.createElement("div", { children: 'Children' })
  
  // good
  <div>Children</div>
  
  <MyComponent>Children</MyComponent>
  
  <MyComponent>
    <span>Child 1</span>
    <span>Child 2</span>
  </MyComponent>
  
  React.createElement("div", {}, 'Children')
  React.createElement("div", 'Child 1', 'Child 2')
  ```

- 2.3.11【强制】不要声明重复的属性名。eslint: [react/jsx-no-duplicate-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md)

  ```jsx
  // bad
  <Hello name="John" name="John" />;
  
  // good
  <Hello firstname="John" lastname="Doe" />;
  ```

- 2.3.12【强制】style 的属性值必须是一个对象。eslint: [react/style-prop-object](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md)

  ```jsx
  // bad
  <div style="color: 'red'" />
  <div style={true} />
  <Hello style={true} />
  
  const styles = true;
  <div style={styles} />
  
  React.createElement("div", { style: "color: 'red'" });
  React.createElement("div", { style: true });
  React.createElement("Hello", { style: true });
  
  const styles = true;
  React.createElement("div", { style: styles });
  
  // good
  <div style={{ color: "red" }} />
  <Hello style={{ color: "red" }} />
  
  const styles = { color: "red" };
  <div style={styles} />
  
  React.createElement("div", { style: { color: 'red' }});
  React.createElement("Hello", { style: { color: 'red' }});
  
  const styles = { height: '100px' };
  React.createElement("div", { style: styles });
  ```

- 2.3.13【推荐】不要单独使用 target='_blank'。eslint: [react/jsx-no-target-blank](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md)

  `target='_blank'` 常用于在新标签页打开。使用这个属性可能造成严重的安全问题。建议和 `rel='noreferrer noopener'` 一起使用。[详见](https://mathiasbynens.github.io/rel-noopener/)
  ```jsx
  // bad
  const Hello = <a target='_blank' href="http://example.com/"></a>
  const Hello = <a target='_blank' href={ dynamicLink }></a>
  
  // good
  const Hello = <p target='_blank'></p>
  const Hello = <a target='_blank' rel='noopener noreferrer' href="http://example.com"></a>
  const Hello = <a target='_blank' href="relative/path/in/the/host"></a>
  const Hello = <a target='_blank' href="/absolute/path/in/the/host"></a>
  const Hello = <a></a>
  ```

## State

- 2.4.1【强制】不要在 setState 中使用 this.state。eslint: [react/no-access-state-in-setstate](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md)

  在 setState 中使用 this.state 可能导致错误，当两个 state 在同一个批处理中时，引用的是旧状态而不是新状态。
  为避免这种情况，请在回调中使用 preState 作为第一个参数。
  ```jsx
  // bad
  function increment() {
    this.setState({ value: this.state.value + 1 });
  }
  
  // good
  function increment() {
    this.setState(prevState => ({ value: prevState.value + 1 }));
  }
  ```
  
  bad case 中假设 value 为1，有两个 setState 操作在同一个批处理中执行，实际执行的是：
  ```
  setState({ value: 1 + 1 })
  setState({ value: 1 + 1 })
  ```
  good case 中 react 会以正确的更新后的状态调用参数。实际执行的是：
  ```
  setState({ value: 1 + 1 })
  setState({ value: 2 + 1 })
  ```

- 2.4.2【强制】声明的 state 必须被使用。eslint: [react/no-unused-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md)

  声明而未使用的 state 可能带来潜在的问题，也会给维护者造成困扰，应将它们删除。
  
  ```jsx
  // bad
  class MyComponent extends React.Component {
    state = { foo: 0 };

    render() {
      return <SomeComponent />;
    }
  }
  
  var UnusedGetInitialStateTest = createReactClass({
    getInitialState: function() {
      return { foo: 0 };
    },
    render: function() {
      return <SomeComponent />;
    }
  })
  
  // good
  class MyComponent extends React.Component {
    state = { foo: 0 };

    render() {
      return <SomeComponent foo={this.state.foo} />;
    }
  }
  
  var UnusedGetInitialStateTest = createReactClass({
    getInitialState: function() {
      return { foo: 0 };
    },
    render: function() {
      return <SomeComponent foo={this.state.foo} />;
    }
  })
  ```

## Refs

- 2.5.1【强制】使用 ref 回调函数或 React.createRef()，不要使用字符串。eslint: [react/no-string-refs](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

  ```jsx
  // bad - 使用字符串
  class MyComponent extends React.Component {
    componentDidMount() {
      this.refs.inputRef.focus();
    }
  
    render() {
      return <input type="text" ref="inputRef" />;
    }
  }
  
  // good - 使用回调函数
  class MyComponent extends React.Component {
    componentDidMount() {
      this.inputRef.focus();
    }
  
    render() {
      return <input type="text" ref={(ele) => { this.inputRef = ele; }} />;
    }
  }
  
  // good - 使用 React.createRef()，React V16 后版本支持
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.inputRef = React.createRef();
    }
  
    componentDidMount() {
      this.inputRef.current.focus();
    }
  
    render() {
      return <input type="text" ref={this.inputRef} />;
    }
  }
  ```

## 顺序

- 2.6.1【参考】组件方法的排序规则。eslint: [react/sort-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

  React 组件内有声明周期方法、事件处理方法、render 方法等几类方法，指定这些方法按固定的顺序排序可以增强代码的一致性，方便查找和阅读。
  
  我们推荐的方法排序如下：
  
    - 可选的 `static` 方法
    - `constructor`
    - `getChildContext`
    - `componentWillMount`
    - `componentDidMount`
    - `componentWillReceiveProps`
    - `shouldComponentUpdate`
    - `componentWillUpdate`
    - `componentDidUpdate`
    - `componentWillUnmount`
    - *clickHandlers 或 eventHandlers* 比如 `onClickSubmit()` 或 `onChangeDescription()`
    - *`render` 的 getter 方法* 比如 `getSelectReason()` 或 `getFooterContent()`
    - *可选的 render 方法* 比如 `renderNavigation()` 或 `renderProfilePicture()`
    - `render`

## Mixins

- 2.7.1【强制】不要使用 mixins。

  Mixins 引入了隐式依赖，可能导致命名冲突，并导致滚雪球式的复杂度。大多数使用 mixin 的场景都可以通过组件、高阶组件或工具模块以更好的方式完成。
