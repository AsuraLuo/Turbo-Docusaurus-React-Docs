---
sidebar_position: 2
---

# 选择器

## id 选择器
- 【参考】不要使用 id 选择器。stylelint: [selector-max-id](https://stylelint.io/user-guide/rules/selector-max-id)
  
  id 会带来过高的[选择器优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)，使得后续很难进行样式覆盖（继而引发使用 `!important` 覆盖样式的恶性循环）。

  ```css
  /* bad */
  .normal {
    padding: 10px;
  }
  #special {
    padding: 15px;
  }

  /* good */
  .normal {
    padding: 10px;
  }
  .normal.special {
    padding: 15px;
  }
  ```

## 属性选择器
- 【参考】属性选择器的值始终用双引号包裹。stylelint: [selector-attribute-quotes](https://stylelint.io/user-guide/rules/selector-attribute-quotes)

  属性选择器的值的引号只有在[某些情况下](https://mathiasbynens.be/notes/unquoted-attribute-values#css)可以省略。

  ```css
  /* bad */
  input[type=text] {
    height: 20px;
  }

  /* good */
  input[type="text"] {
    height: 20px;
  }
  ```

## 选择器性能
- 【参考】使用 CSS 选择器时，应注意以下性能问题：
  - 使用 class 而不是原生元素标签
  - 减少在经常出现的组件中使用个别属性选择器（如 `[class^="..."]`）
  - 控制选择器的长度，每个组合选择器内的条目尽量不超过 3 个

  > 只从效率的角度来看，CSS 选择器从高（高效率）到低（低效率）的顺序是：
  >
  > - ID 选择器， 比如 `#header`
  > - 类选择器，比如 `.header`
  > - 标签（元素）选择器，比如 `div`
  > - 相邻兄弟选择器，比如 `h2 + p`
  > - 子选择器，比如 `ul > li`
  > - 后代选择器，比如 `ul a`
  > - 通配符选择器，比如 `*`
  > - 属性选择器，比如 `[class^="grid-"]`
  > - 伪类（伪元素）选择器，比如 `a:hover`、`a::before`
