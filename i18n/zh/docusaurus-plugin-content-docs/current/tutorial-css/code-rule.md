---
sidebar_position: 1
---

# 编码风格

## CSS编码

![示例代码标注图](/img/css.svg)

上图是一张符合规约要求编码风格的速览图，详细规则如下：

### 分号结尾
- 【强制】所有声明都应该以分号结尾，不能省略。stylelint: [declaration-block-trailing-semicolon](https://stylelint.io/user-guide/rules/declaration-block-trailing-semicolon)
  
  虽然 CSS 语法中最后一条声明的分号是可选的，但是使用分号可以增加代码的一致性和易用性。

  ```css
  /* bad */
  .selector {
    margin-top: 10px;
    padding-left: 15px
  }

  /* good */
  .selector {
    margin-top: 10px;
    padding-left: 15px;
  }
  ```

### 空格缩进
- 【推荐】使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进。stylelint: [indentation](https://stylelint.io/user-guide/rules/indentation)

  ```css
  /* bad */
  .selector {
      padding-left: 15px;
  }

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

### 选择器空格
- 【推荐】选择器和 `{` 之间保留一个空格。stylelint: [block-opening-brace-space-before](https://stylelint.io/user-guide/rules/block-opening-brace-space-before) 

  ```css
  /* bad */
  .selector{
    padding-left: 15px;
  }

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

### 属性名和冒号之间
- 【推荐】属性名和 `:` 之前无空格，`:` 和属性值之间保留一个空格。stylelint: [declaration-colon-space-after](https://stylelint.io/user-guide/rules/declaration-colon-space-after) [declaration-colon-space-before](https://stylelint.io/user-guide/rules/declaration-colon-space-before) 

  ```css
  /* bad */
  .selector {
    margin-top : 10px;
    padding-left:15px;
  }

  /* good */
  .selector {
    margin-top: 10px;
    padding-left: 15px;
  }
  ```

### 组合器前后空格
- 【推荐】`>`、`+`、`~` 、`||` 等组合器前后各保留一个空格。stylelint: [selector-combinator-space-before](https://stylelint.io/user-guide/rules/selector-combinator-space-before) [selector-combinator-space-after](https://stylelint.io/user-guide/rules/selector-combinator-space-after)

  ```css
  /* bad */
  .selector>.children {
    padding-left: 15px;
  }
  .selector+.brother {
    padding-left: 15px;
  }

  /* good */
  .selector > .children {
    padding-left: 15px;
  }
  .selector + .brother {
    padding-left: 15px;
  }
  ```

### 属性逗号分割
- 【推荐】在使用 `,` 分隔的属性值中，`,` 之后保留一个空格。stylelint: [value-list-comma-space-after](https://stylelint.io/user-guide/rules/value-list-comma-space-after)

  ```css
  /* bad */
  .selector {
    background-color: rgba(0,0,0,0.5);
    box-shadow: 0px 1px 2px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.5);
  }

  /* good */
  .selector {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  ```

### 注释内容和注释符
- 【推荐】注释内容和注释符之间留有一个空格。stylelint: [comment-whitespace-inside](https://stylelint.io/user-guide/rules/comment-whitespace-inside)

  ```css
  /* bad */
  .selector {
    /*comment*/
    /*  comment  */
    /**
     *comment
     */
    padding-left: 15px;
  }

  /* good */
  .selector {
    /* comment */
    /**
     * comment
     */
    padding-left: 15px;
  }
  ```

### 声明块的右大括号
- 【推荐】声明块的右大括号 `}` 应单独成行。

  ```css
  /* bad */
  .selector {
    padding-left: 15px;}

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

### 属性声明
- 【推荐】属性声明应单独成行。stylelint: [declaration-block-single-line-max-declarations](https://stylelint.io/user-guide/rules/declaration-block-single-line-max-declarations)

  ```css
  /* bad */
  .selector {
    padding-left: 15px;  margin-left: 10px;
  }

  /* good */
  .selector {
    padding-left: 15px;
    margin-left: 10px;
  }
  ```

### 单行代码字符限制
- 【推荐】单行代码最多不要超过 100 个字符。 stylelint: [max-line-length](https://stylelint.io/user-guide/rules/max-line-length) 除了以下两种情况：

  - 使用 [`url()`](https://developer.mozilla.org/en-US/docs/Web/CSS/url) 函数时
  - CSS 属性值本身无法换行时，即属性值内无空格或逗号时

  ```css
  /* bad */
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.04, rgb(88, 94, 124)), color-stop(0.52, rgb(115, 123, 162)));

  /* good */
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.04, rgb(88, 94, 124)),
    color-stop(0.52, rgb(115, 123, 162))
  );
  ```

### 多个选择器
- 【参考】使用多个选择器时，每个选择器应该单独成行。stylelint: [selector-list-comma-newline-after](https://stylelint.io/user-guide/rules/selector-list-comma-newline-after)
  
  ```css
  /* bad */
  .selector, .selector-secondary, .selector-third {
    padding: 15px;
    margin-bottom: 15px;
  }

  /* good */
  .selector,
  .selector-secondary,
  .selector-third {
    padding: 15px;
    margin-bottom: 15px;
  }
  ```

### 多个选择器
- 【参考】声明块内只有一条语句时，也应该写成多行。
  ```css
  /* bad */
  .selector { padding-left: 15px; }

  /* good */
  .selector {
    padding-left: 15px;
  }
  ```

### 注释行空格
- 【参考】注释行上方需留有一行空行，除非上一行是注释或块的顶部。stylelint: [comment-empty-line-before](https://stylelint.io/user-guide/rules/comment-empty-line-before)

  ```css
  /* bad */
  .selector {

    /* comment */
    padding-left: 15px;
    /* comment */
    padding-right: 15px;
  }

  /* good */
  .selector {
    /* comment */
    padding-left: 15px;

    /* comment */
    padding-right: 15px;
  }
  ```
