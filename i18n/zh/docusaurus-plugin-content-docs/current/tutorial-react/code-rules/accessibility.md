---
sidebar_position: 5
---

# 无障碍

Let's translate `docs/intro.md` to French.

[无障碍丰富互联网应用规范（WAI-ARIA，简称 ARIA）](https://www.w3.org/TR/wai-aria/)是 W3C 发布的技术规范，定义了一组可用于元素的 HTML 特性，作为对 HTML 语义化的补充，让残障人士能更加便利的访问 Web 内容和使用 Web 应用。

本章节会涉及到一些 WAI-ARIA 规范中的术语：
- 角色（role）：定义了元素的种类。如 `role="button"` 告诉屏幕阅读器这是一个按钮元素。
- 属性（property）：通过给元素定义一些属性，让他们具备更多的语义。例如 `aria-required="true"` 意味着该元素在表单上是必填的。
- 状态（state）：用于表达元素当前的条件的特殊属性，例如 `aria-disabled="true"`，屏幕阅读器就会禁止编辑这个表单元素。状态和属性的差异之处就是：属性在应用的生命周期中不会改变，而状态可以，通常我们用编程的方法改变它，例如 JavaScript。

[这篇文档](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility/WAI-ARIA_basics)对 WAI-ARIA 规范的内容和使用做了初步介绍。

- 5.1【推荐】img 标签应包含 alt 属性。eslint: [jsx-a11y/alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

  如果图片无需被无障碍阅读器识别(如作为 button 的 icon 使用)，你可以将 `alt` 属性写为空字符串
  
  ```jsx
  // bad
  <img src="hello.jpg" />
  
  // good
  <img src="hello.jpg" alt="Me waving hello" />
  
  // good - 图片无需被无障碍阅读器识别时
  <button>
    <img src="icon.png" alt="" />
    Save
  </button>
  ```

- 5.2【推荐】img 标签的 alt 属性不要使用 "image"，"photo"，"picture" 之类的关键词。eslint: [jsx-a11y/img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

  屏幕阅读器已会将 `img` 元素识别成图片，再在 alt 中包含这类关键词没有意义。
  
  ```jsx
  // bad
  <img src="hello.jpg" alt="Picture of me waving hello" />
  
  // good
  <img src="hello.jpg" alt="Me waving hello" />
  ```

- 5.3【推荐】锚元素(即 `<a>` 元素)必须含有内容，且内容必须对屏幕阅读器可见(这里指内容不能通过设置 `aria-hidden` 属性隐藏)。eslint: [jsx-a11y/anchor-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md)

  ```jsx
  // bad - empty content
  <a />

  // bad - content not accessible to screen readers
  <a><TextWrapper aria-hidden /></a>

  // good
  <a>Anchor Content!</a>
  <a><TextWrapper /><a>
  ```

- 5.4【推荐】禁止使用无效的 ARIA 属性，只能使用列在 [WAI-ARIA States and Properties spec](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) 中的 `aria-*` 属性。eslint: [jsx-a11y/aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md)
  
  ```jsx
  // bad - Labeled using incorrectly spelled aria-labeledby
  <div id="address_label">Enter your address</div>
  <input aria-labeledby="address_label">

  // good - Labeled using correctly spelled aria-labelledby 
  <div id="address_label">Enter your address</div>
  <input aria-labelledby="address_label">
  ```

- 5.5【推荐】ARIA 属性、状态的值必须为有效值。eslint: [jsx-a11y/aria-proptypes](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md)
  ```jsx
  // bad - the aria-hidden state is of type true/false
  <span aria-hidden="yes">foo</span>

  // good
  <span aria-hidden="true">foo</span>
  ```

- 5.6【推荐】禁止特定元素包含 `role` 和 `aria-*` 属性。一些保留的 DOM 元素不支持设置 ARIA 角色或者属性，通常是因为这些元素是不可见的，例如 `meta, html, script, style`。eslint: [jsx-a11y/aria-unsupported-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md)
  
  ```jsx
  // bad - the meta element should not be given any ARIA attributes
  <meta charset="UTF-8" aria-hidden="false" />

  // good
  <meta charset="UTF-8" />
  ```

- 5.7【推荐】仅使用有效的、非抽象的 ARIA roles，[了解更多](https://www.w3.org/TR/wai-aria/#roles_categorization)。eslint: [jsx-a11y/aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)
  
  ```jsx
  // bad - not an ARIA role
  <div role="datepicker" />
  
  // bad - abstract ARIA role
  <div role="range" />
  
  // good
  <div role="button" />
  ```

- 5.8【推荐】有 ARIA role 的元素必须也声明该 role 需要的属性，[了解更多](https://www.w3.org/TR/wai-aria/#requiredState)。eslint: [jsx-a11y/role-has-required-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md)
  
  ```jsx
  // bad - the checkbox role requires the aria-checked state
  <span role="checkbox" aria-labelledby="foo" tabindex="0"></span>

  // good - the checkbox role requires the aria-checked state
  <span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>
  ```

- 5.9【推荐】强制拥有显式或隐式 role 的元素，只能含有该 role 支持的 `aria-*` 属性。eslint: [jsx-a11y/role-supports-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md)

  一些元素会有隐式的 role ，譬如 `<a href="#">` ，会被解析为 `role="link"`。很多 ARIA 属性只能在具有特定 role 的元素上使用
  
  ```jsx
  // bad - the radio role does not support the aria-required property
  <ul role="radiogroup" aria-labelledby="foo">
    <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
    <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
    <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
  </ul> 

  // good - the radiogroup role does support the aria-required property
  <ul role="radiogroup" aria-required aria-labelledby="foo">
    <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
    <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
    <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
  </ul>
  ```

- 5.10【推荐】`<iframe>` 元素必须有一个唯一的 title 属性，表示其内容。eslint: [jsx-a11y/iframe-has-title](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md)
  
  ```jsx
  // bad
  <iframe />
  <iframe {...props} />
  <iframe title="" />
  <iframe title={undefined} />
  <iframe title={false} />
  <iframe title={true} />
  <iframe title={42} />

  // good
  <iframe title="This is a unique title" />
  ```

- 5.11【推荐】不要使用 accessKey 属性。accessKey 属性提供了为当前元素生成快捷键的方式，不过 accessKey 值可能与系统或浏览器键盘快捷键或辅助技术功能相冲突，所以不建议使用。eslint: [jsx-a11y/no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

  ```jsx
  // bad
  <div accessKey="h" />
  
  // good
  <div />
  ```

- 5.12【推荐】禁止使用会造成视觉分散的元素。一些会引起视觉注意力分散的元素对视觉障碍的用户会造成问题，例如 `<marquee>` 和 `<blink>`。eslint: [jsx-a11y/no-distracting-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md)
  
  ```jsx
  // bad
  <marquee />
  <blink />

  // good
  <div />
  ```

- 5.13【推荐】scope 属性只能在 `<th>` 元素上使用，[了解更多](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced#The_scope_attribute)。eslint: [jsx-a11y/scope](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md)

  ```jsx
  // bad 
  <div scope />

  // good
  <th scope="col" />
  ```
