---
sidebar_position: 2
---

# HTML编码

Docusaurus creates a **page for each blog post**, but also a **blog index page**, a **tag system**, an **RSS** feed...


### 2.1 缩进

- 2.1.1【推荐】统一使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进。
  
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Page title</title>
    </head>
    <body>
      <img src="images/company-logo.png" alt="Company" />
      <h1 class="hello-world">Hello, world!</h1>
    </body>
  </html>
  ```

### 2.2 注释

- 2.2.1【强制】在 HTML 注释代码中，不允许出现任何敏感信息。

  常见的敏感信息包括：
  
  - 业务相关敏感信息，例如业务规则
  - 员工个人隐私信息，例如邮箱、手机、身份证号码
  - AK（accessKey id, accesskey secret）
  - 证书、密码
  - 内网 IP、URL
  - 其他公司、员工相关的内部信息、敏感信息

- 2.2.2【推荐】单行注释，需在注释内容和注释符之间需留有一个空格，以增强可读性。

  ```html
  <!-- 单行注释 -->
  ```

- 2.2.3【推荐】多行注释，注释符单独占一行，注释内容 2 个空格缩进。

  ```html
  <!--
    多行注释
    多行注释
  -->
  ```

### 2.3 标签

- 2.3.1【强制】标签名统一使用小写。

  ```html
  <!-- bad -->
  <H1>Hello, world!</H1>

  <!-- good -->
  <h1>Hello, world!</h1>
  ```

- 2.3.2【推荐】不要省略自闭合标签结尾处的斜线，且斜线前需留有一个空格。

  虽然 [HTML5 规范](https://dev.w3.org/html5/spec-author-view/syntax.html#syntax-start-tag) 中指出结尾的斜线是可选的，但保留它们可以明确表达该标签已闭合的语义，更易于维护和理解。

  同时，在 React 被广泛使用的今天，这与 [JSX 的规范](https://react-cn.github.io/react/tips/self-closing-tag.html) 相一致，JSX 中自闭合标签必须保留结尾的斜线。

  ```html
  <!-- bad -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <img src="images/foo.png" alt="foo">

  <!-- good -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <img src="images/foo.png" alt="foo" />
  ```

### 2.4 属性

- 2.4.1【强制】属性值使用双引号，不要使用单引号。

  ```html
  <!-- bad -->
  <link rel='stylesheet' href='example.css'>

  <!-- good -->
  <link rel="stylesheet" href="example.css" />
  ```

- 2.4.2【推荐】不要为 Boolean 属性添加取值。

  XHTML 需要每个属性声明取值，但是 HTML5 并不需要。一个元素中 Boolean 属性存在即表示取值 `true`，不存在则表示取值 `false`，[了解更多](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes)。

  ```html
  <!-- bad -->
  <input type="text" disabled="disabled" />
  <input type="checkbox" value="1" checked="checked" />
  <select>
    <option value="1" selected="selected">1</option>
  </select>

  <!-- good -->
  <input type="text" disabled />
  <input type="checkbox" value="1" checked />
  <select>
    <option value="1" selected>1</option>
  </select>
  ```

- 2.4.3【推荐】自定义属性的命名：以 data- 为前缀。

  建议自定义属性的命名都以 `data-` 为前缀，以便区分。

  ```html
  <!-- bad -->
  <a modal="toggle" href="#">
    Example link
  </a>

  <!-- good -->
  <a data-modal="toggle" href="#">
    Example link
  </a>
  ```

### 2.5 语义化

- 2.5.1【参考】尽量根据语义使用 HTML 标签。

  HTML 标签（更严谨的叫法是 HTML 元素）都有其语义，例如 `p` 标签即“paragraphs”用于章节，`a` 标签即“anchors”用于锚点链接，[了解更多](https://www.w3.org/TR/2018/WD-html53-20181018/fullindex.html#index-elements)。

  我们应优先选取符合当下所需语义的标签，这既有助于[可访问性（Accessibility）](https://developer.mozilla.org/zh-CN/docs/learn/Accessibility)，也可以在 CSS 加载失败时获得较好的展示效果。

  ```html
  <!-- bad -->
  <div class="list">
    <div class="list-item">1</div>
    <div class="list-item">2</div>
    <div class="list-item">3</div>
  </div>

  <!-- good -->
  <ul class="list">
    <li class="list-item">1</li>
    <li class="list-item">2</li>
    <li class="list-item">3</li>
  </ul>
  ```

### 2.6 可访问性

- 2.6.1【参考】注意 HTML 的可访问性（Accessibility）。

  网页可访问性使网页内容落实“无障碍”，让不同程度或需求的用户可以顺畅的获取网站上的信息。传统上我们认为这只与残疾人士有关，但提升网站的可访问性也可以让其他用户群体受益，比如使用移动设备的人群或低速网络的人群。

  例如，为 img 标签设置 alt 属性：

  ```html
  <!-- bad - 缺少 alt 属性，无法被无障碍阅读器识别 -->
  <img src="hello.jpg" />

  <!-- good -->
  <img src="hello.jpg" alt="Welcome to visit!" />

  <!-- good - 图片无需被无障碍阅读器识别时 -->
  <img src="logo.jpg" alt="" />

  <!-- good - 图片无需被无障碍阅读器识别时 -->
  <img src="logo.jpg" role="presentation" />
  ```

  了解更多 HTML 可访问性的知识，可以阅读[这篇 MDN 的文章](https://developer.mozilla.org/zh-CN/docs/learn/Accessibility)。
