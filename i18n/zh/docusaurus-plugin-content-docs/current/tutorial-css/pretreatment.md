---
sidebar_position: 4
---

# 预处理语言

## Sass、Less、Stylus
> 对于 CSS 而言，可以在新项目中尝试放弃使用 Sass、Less、Stylus 这样的处理器语言，因为：
> 
>* 这些处理器语言是在一定历史条件下的产物，虽然这些产物在一定程度上提高开发者的开发效率，但不同的处理器语言也同时增加了项目的维护成本（特别是多人协作，多团队协作的时候）。
>* 更建议使用 PostCSS 处理器，它类似于 CSS 中的 Babel，不但具备 Sass 和 Less 的功能，而且社区繁荣，同时还可以根据自己的需求扩展相关的插件。
>* 随着 CSS 的一些新特性出现，Sass 和 Less 以往的优势也会慢慢消失。

### 运算符
- 【推荐】四则运算符两侧各保留一个空格：

  ```css
  /* bad */
  .selector {
    width: $default-width/2;
  }

  /* good */
  .selector {
    width: $default-width / 2;
  }
  ```

### Mixin
- 【推荐】Mixin 名称和括号 `()` 间无空格，在拥有多个参数的表达式中， `,` 之前无空格，`,` 之后保留一个空格：

  ```css
  /* bad */
  .selector {
    .size(30px,20px);
    .clearfix ();
  }

  /* good */
  .selector {
    .size(30px, 20px);
    .clearfix();
  }
  ```

### 顺序
- 【推荐】按如下顺序组织 Sass / Less 代码：

  - `@import` 语句
  - 全局变量声明
  - 样式声明

  ```css
  @import 'common/theme.scss';

  $color-red: #f0f0f0;

  .selector {
    color: $color-red;
  }
  ```

### 属性声明顺序
- 【推荐】对于 Sass 和 Less，块内的属性声明按如下顺序排序：

  - 标准属性声明：除了 mixin 调用、extend 子级选择器的声明，其他属性声明的顺序与「属性声明的顺序」章节的规则一致
  - mixin 调用：Sass 的 `@include` 声明、Less 的 mixin 调用
  - 嵌套的子级选择器：将嵌套的选择器放到块的末尾，并且在其上方保留一行空行

  ```css
  .btn {
    background: #ccc;
    font-weight: bold;
    @include transition(background 0.5s ease);

    .icon {
      margin-right: 10px;
    }
  }
  ```

### 嵌套选择器深度
- 【推荐】嵌套选择器的深度不要超过 3 层，否则可能带来一些副作用：

  - 与 HTML 结构强耦合，难以复用
  - 过高的[选择器优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

  ```css
  .container {
    .header {
      .user-name {
        // STOP！不要再嵌套更深选择器
      }
    }
  }
  ```

### 双斜杠注释
- 【推荐】可以使用双斜杠注释。但需要注意的是，编译为 CSS 后，代码中的双斜杠注释会被删除，而 `/* */` 会被保留。

  ```css
  // 单行注释
  .selector-a {
    padding-left: 15px;
  }

  /*
   * 多行注释
   * 多行注释
   */
  .selector-b {
    margin-left: 15px;
  }
  ```

  编译为 CSS 后，双斜杠注释会被删除：

  ```css
  .selector-a {
    padding-left: 15px;
  }

  /*
   * 多行注释
   * 多行注释
   */
  .selector-b {
    margin-left: 15px;
  }
  ```

### 指令
- 【推荐】使用 Mixin (@mixin 和 @include 指令) 来让代码遵循 DRY 原则（Don't Repeat Yourself）、增加抽象性和降低复杂度。

  应避免使用 @extend 指令，它不够直观且具有潜在风险，尤其是在嵌套选择器中。即使继承的是顶层选择器，如果选择器的顺序发生变化，也可能引起问题（比如，如果它们存在于其他文件，而加载顺序发生了变化）。

  Extend  相比 Mixin 的好处是，如果无参数的 mixin 被多处使用，编译后会输出多段重复的代码。这时如果使用 @extend，可以避免这个问题。但是 gzip 等压缩工具就可以解决重复代码的问题，因此大多数情况下，你只需要使用 mixin 来让代码符合 DRY 原则。

## 参考资料

- [Code Guide by @mdo](http://codeguide.co)
- [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- [spec css-style-guide](https://github.com/ecomfe/spec/blob/master/css-style-guide.md)
