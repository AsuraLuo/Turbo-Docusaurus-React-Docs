---
sidebar_position: 3
---

# 命名规范

React代码开发基本命名规范.

### 文件扩展名

- 使用 .jsx、.tsx、.js 或 .ts 作为 React 组件的文件扩展名。eslint: [react/jsx-filename-extension](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)

### 引用名
- 使用大驼峰风格命名引用的组件，使用小驼峰风格命名引用组件的实例。eslint: [react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

  ```jsx
  // bad
  import reservationCard from './reservation-card';
  
  // good
  import ReservationCard from './reservation-card';
  
  // bad
  const ReservationItem = <ReservationCard />;
  
  // good
  const reservationItem = <ReservationCard />;
  ```

### 高阶组件命名
- 将高阶组件名和传入组件名组合作为 displayName。

  例如，高阶组件 `withFoo()` ，当传入组件 `Bar` 时，应该产生一个组件，应使用 withFoo(Bar) 作为生成组件的  displayName。
  
  组件的 `displayName` 可被开发者工具和报错信息使用，这种组合的命名方式能清晰地表达高阶组件和被包裹组件的关系。
  
  ```jsx
  // bad
  export default function withFoo(WrappedComponent) {
    return function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }
  }
  
  // good
  export default function withFoo(WrappedComponent) {
    function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }
  
    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
  
    WithFoo.displayName = `withFoo(${wrappedComponentName})`;
    return WithFoo;
  }
  ```
