---
sidebar_position: 4
---

# Hooks

Let's translate `docs/intro.md` to French.

- 4.1【强制】只在最顶层调用 Hooks，不要在循环、条件和嵌套函数中调用 Hooks。eslint: [rules of Hooks - only call Hooks at the top level](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level)

  ```jsx
  // bad - call Hooks inside conditions
  function ComponentWithConditionalHook() {
    if (cond) {
      useConditionalHook();
    }
  }

  // bad - call Hooks inside loops
  function ComponentWithHookInsideLoop() {
    while (cond) {
      useHookInsideLoop();
    }
  }

  // bad - call Hooks inside callback
  function ComponentWithHookInsideCallback() {
    useEffect(() => {
      useHookInsideCallback();
    });
  }

  // good
  function ComponentWithHook() {
    useHook();
  }
  ```

- 4.2【强制】Hooks 命名必须以 `use` 开头，小驼峰形式
  
  ```jsx
  // bad
  const customHook = () => {}

  // good
  const useCustomHook = () => {}
  ```

- 4.3【强制】只在 React 函数组件和自定义 Hooks 中调用 Hooks，不能在普通的 JavaScript 函数中调用 Hooks。eslint: [rules of Hooks - only call Hooks from React functions](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-from-react-functions)

  ``` jsx
  // bad - call Hooks inside class componennt
  class ClassComponentWithHook extends React.Component {
    render() {
      React.useState();
    }
  }

  // bad - call Hooks inside normal function
  function normalFunctionWithHook() {
    useHookInsideNormalFunction();
  }

  // good - call Hooks inside function component
  function ComponentWithHook() {
    useHook();
  }

  // good - call Hooks inside custom Hooks
  function useHookWithHook() {
    useHook();
  }
  ```

- 4.4【推荐】`useEffect` 及[类似 Hooks ](https://github.com/facebook/react/blob/3c1a7ac87c5b4903aa0de02d11bd9ec2590ad598/packages/eslint-plugin-react-hooks/src/ExhaustiveDeps.js#L1518)需要声明所有依赖。eslint: [exhaustive-deps](https://github.com/facebook/react/issues/14920)

  此规则在某些场景下可能过于严格，并且 ESLint autofix 可能会造成一些[问题](https://github.com/facebook/react/issues/16313)，因此需注意：
  - 升级 `eslint-plugin-react-hooks` 到 2.4.0 版本及以上，因为 [2.4.0 版本后该规则的 autofix 被默认禁用](https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/CHANGELOG.md#240)
  - 如果某些场景下此规则确实不适用，可以通过 ESLint 行注释手动禁用此规则，在行尾添加： `// eslint-disable-line react-hooks/exhaustive-deps`

  ```jsx
  // bad
  function MyComponent() {
    const local = {};
    useEffect(() => {
      console.log(local);
    }, []);
  }

  // good
  function MyComponent() {
    const local = {};
    useEffect(() => {
      console.log(local);
    }, [local]);
  }
  ```

