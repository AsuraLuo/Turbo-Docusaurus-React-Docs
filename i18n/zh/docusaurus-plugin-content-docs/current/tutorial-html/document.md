---
sidebar_position: 1
---

# HTML文档

HTML基础文档介绍以及编写规则.

## 文档类型

- 【强制】使用 HTML5 DOCTYPE。

  在 HTML 文档的开头使用 `<!DOCTYPE html>` 来声明文档的 HTML 版本。

  ```html
  <!-- bad - 非 HTML 5 DOCTYPE -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html>
  </html>

  <!-- good -->
  <!DOCTYPE html>
  <html>
  </html>
  ```

## HTML语言属性

- 【推荐】指定 `html` 标签上的 `lang` 属性。

  [HTML5 规范](http://w3c.github.io/html/semantics.html#the-html-element)中提到：

  > 推荐开发者在 `html` 元素上指定 `lang` 属性，以指出文档的语言。这有助于读屏、翻译等工具的工作。

  `lang` 属性的值由 `language-subtags` 组成，在 [BCP47](http://www.ietf.org/rfc/bcp/bcp47.txt#) 中定义，[了解更多](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)。

  ```html
  <html lang="zh-CN">
    <!-- ... -->
  </html>
  ```

## 元数据Meta

### UTF-8编码
- 【推荐】使用 UTF-8 字符编码。

  声明一个明确的字符编码，可以让浏览器更快速高效地确定适合网页内容的渲染方式。
  
  由于历史原因，不同浏览器采用了不同的字符编码。但对于新业务，如无特殊要求，统一使用 UTF-8 字符编码，以便统一。

  在 HTML 中使用 `<meta charset="utf-8" />` 声明文档的编码方式：

  ```html
  <head>
    <meta charset="utf-8" />
  </head>
  ```

### 移动端Viewport
- 【推荐】页面提供给移动设备使用时，需要设置 [viewport](https://drafts.csswg.org/css-device-adapt/#viewport-meta)。
  
  设置 viewport-fit 设置为“cover”来兼容 iPhone X 的刘海屏，[了解更多](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) 。
  

  ```html
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, viewport-fit=cover" />
  ```

## 资源加载

### 资源引入类型
- 【推荐】引入 CSS 和 JavaScript 时无需指定 type。
  根据 HTML5 规范，引入 CSS 和 JavaScript 时通常不需要指明 type，因为 [text/css](https://html.spec.whatwg.org/multipage/obsolete.html#attr-style-type) 和 [text/javascript](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type) 分别是他们的默认值。

  ```html
  <!-- bad -->
  <link type="text/css" rel="stylesheet" href="example.css" />
  <style type="text/css">
    /* ... */
  </style>
  <script type="text/javascript" src="example.js"></script>

  <!-- good -->
  <link rel="stylesheet" href="example.css" />
  <style>
    /* ... */
  </style>
  <script src="example.js"></script>
  ```

### CSS引入
- 【推荐】在 head 标签内引入 CSS，在 body 结束标签前引入 JS。
  在 `<body></body>` 中指定外部样式表和嵌入式样式块可能会导致页面的重排和重绘，对页面的渲染造成影响。因此，一般情况下，CSS 应在 `<head></head>` 标签里引入，[了解更多](https://developer.yahoo.com/performance/rules.html#css_top)。

  > 在 HTTP2（Chrome 浏览器 69 版本之后，Firefox 和 Edge）中可以在 body 中使用 link 标签引入样式文件，但不推荐在 body 中使用 `<style>` 标签的内联样式。**`<link rel="stylesheet">` 将会阻止后续内容的渲染，而不是整个页面**。
  
  除了基础库等必须要在 DOM 加载之前运行的 JavaScript 脚本，其他都在靠近 `body` 结束标签前引入，以防止出现页面渲染的阻塞，[了解更多](https://developer.yahoo.com/performance/rules.html#js_bottom)。


  ```html
  <!-- bad -->
  <!DOCTYPE html>
  <html>
    <head>
      <script src="mod-a.js"></script>
      <script src="jquery.js"></script>
    </head>
    <body>
      <style>
        .mod-example {
          padding-left: 15px;
        }
      </style>
    </body>
  </html>

  <!-- good -->
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        .mod-example {
          padding-left: 15px;
        }
      </style>
    </head>
    <body>
      ...
      <script src="path/to/my/script.js"></script>
    </body>
  </html>
  ```

### 外部资源引入
- 【推荐】外部资源的引用地址跟随页面协议，省略协议部分。

  ```html
  <link rel="stylesheet" href="//g.alicdn.com/lib/style/index-min.css" />
  ```

### Preload预加载
- 【推荐】使用 preload 预加载关键资源，[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)。

  ```html
  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />
  ```

### DNS解析
- 【推荐】使用 dns-prefetch 和 preconnect 处理 DNS 解析延迟问题，提高网页加载性能，[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch)。

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
  ```

## 页面标题

- 【强制】页面需要指定 title 标签，有且仅有 1 个。

  ```html
  <head>
    <meta charset="utf-8" />
    <title>淘宝网 - 淘！我喜欢</title>
  </head>
  ```
