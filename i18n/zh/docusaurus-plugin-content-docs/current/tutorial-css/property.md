---
sidebar_position: 3
---

# 属性

## 属性值

### 十六进制
- 【推荐】使用尽可能短的十六进制值。stylelint: [color-hex-length](https://stylelint.io/user-guide/rules/color-hex-length)

  ```css
  /* bad */
  .selector {
    color: #ffffff;
  }

  /* good */
  .selector {
    color: #fff;
  }
  ```

### important
- 1.3.2【推荐】不要使用 !important 重写样式。

### rgba字母
- 【推荐】十六进制值统一使用小写字母（小写字母更容易分辨）。stylelint: [color-hex-case](https://stylelint.io/user-guide/rules/color-hex-case)

  ```css
  /* bad */
  .selector {
    color: #FEFEFE;
  }

  /* good */
  .selector {
    color: #fefefe;
  }
  ```

### 长度单位
- 【推荐】长度值为 0 时，省略掉长度单位。stylelint: [length-zero-no-unit](https://stylelint.io/user-guide/rules/length-zero-no-unit)

  在 CSS 中，长度值为 0 时，它的单位是可选的（长度单位包括：em, ex, ch, vw, vh, cm, mm, in, pt, pc, px, rem, vmin, and vmax）。省略长度单位可以使代码更简洁：

  ```css
  /* bad */
  .selector {
    margin-top: 0px;
    font-size: 0em;
  }

  /* good */
  .selector {
    margin-top: 0;
    font-size: 0;
  }
  ```

### 保留小数
- 【参考】保留小数点前的 0。stylelint: [number-leading-zero](https://stylelint.io/user-guide/rules/number-leading-zero)

  在 CSS 中，大于 -1 小于 1 的小数，小数点前的 0 可以省略：

  ```css
  /* bad */
  .selector {
    opacity: .5;
    left: -.5px;
  }

  /* good */
  .selector {
    opacity: 0.5;
    left: -0.5px;
  }
  ```

  对于是否省略小数点前的 0，业界存在争议：

  - 省略 0 的好处是：代码更简洁，可以减少一个字符
  - 不省略的好处是：代码可读性更好、一致性更强

  你可选择自己倾向的风格，在代码中风格统一即可，要么都省略，要么都保留。

  我们推荐保留 0，因为当今很多 CSS 压缩工具会在压缩时帮我们去掉 0，不存在多占用一个字符的问题。保留 0 能增强代码的可读性和一致性。

### 属性声明顺序
- 【参考】属性声明的顺序。

  相关联的属性声明最好写成一组，并按如下顺序排序：

  1. **定位**：如 position、left、right、top、bottom、z-index
  2. **盒模型**：如 display、float、width、height、margin、padding、border
  3. **文字排版**：如 font、color、line-height、text-align
  4. **外观**：如  background
  5. **其他属性**

  「定位」和「盒模型」放在最前面，是因为它们决定了元素的布局、位置和尺寸。「定位」排在「盒模型」之前，是由于「定位」属性可以让元素脱离正常文本流，从而使「盒模型」属性失效。

  除了「定位」和「盒模型」，其他属性都只在元素内部起作用，不会对前两类属性的结果产生影响，因此放在后面。

  ```css
  .declaration-order {
    /* 定位 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    /* 盒模型 */
    display: block;
    float: right;
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;

    /* 排版 */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* 外观 */
    background-color: #f5f5f5;

    /* 其他 */
    opacity: 1;
  }
  ```

  更多 CSS 属性顺序参考如下列表：
  
  |第一组|第二组|第三组|第四组|第五组|第六组|第七组|
  |----|----|----|----|----|----|----|
  |content |box-sizing|background*         |font*|opacity       |unicode-bidi|transition*|
  |position|*width    |color               |src|visibility    |direction   |transform* |
  |top     |*height   |box-decoration-break|line-height|filter        |columns     |animation* |
  |right   |margin*   |box-shadow          |letter-spacing|resize        |column-*    ||
  |bottom  |padding*  |outline*            |quotes|cursor        |break-*     ||
  |left    |border*   |table-layout        |counter-*|pointer-events|page-break-*||
  |z-index |          |caption-side        |-ms-writing-mode|user-select   |orphans     ||
  |display |          |empty-cells         |text-*||widows||
  |vertical-align|    |list-style*         |white-space||*zoom||
  |flex*   |          |                    |word-*||orientation||
  |grid*   |          |                    |overflow-wrap||fill||
  |*gap    |          |                    |tab-size||stroke||
  |align-* |          |                    |hyphens||||
  |justify-*|         |                    |interpolation-mode||||
  |order|||||||
  |float|||||||
  |clear|||||||
  |object-fit|||||||
  |overflow*|||||||
  |clip|||||||

### 简写属性
- 【参考】适时使用简写属性。stylelint: [declaration-block-no-shorthand-property-overrides](https://stylelint.io/user-guide/rules/declaration-block-no-shorthand-property-overrides) [declaration-block-no-redundant-longhand-properties](https://stylelint.io/user-guide/rules/declaration-block-no-redundant-longhand-properties)


  常见的[简写属性](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)包括：

  - `font`
  - `background`
  - `padding`
  - `margin`
  - `border`
  - `border-radius`

  使用简写属性时，需要显式地设置所有值。我们应该在真正需要设置所有值或大多数值时才使用简写属性。
  
  如果只是想设置某一个属性，则不应该使用简写属性：

  ```css
  /* bad */
  .selector {
    margin: 0 0 10px;
  }

  /* good */
  .selector {
    margin-bottom: 10px;
  }
  ```

## 样式导入
- 【推荐】不要使用 CSS 的 @import。

  与 `<link>` 相比，`@import` 会在关键渲染路径上增加更多的往返（即关键路径的深度变长），这样会导致浏览器处理 CSS 文件速度变慢，因此我们应该避免使用 `@import`。

  ```css
  <!-- bad -->
  <style>
    @import url("more.css");
  </style>

  <!-- good -->
  <link rel="stylesheet" href="more.css">
  ```
