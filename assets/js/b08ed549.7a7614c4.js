"use strict";(self.webpackChunkolight_turbo_docusaurus_docs=self.webpackChunkolight_turbo_docusaurus_docs||[]).push([[71],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(u,".").concat(m)]||d[m]||s[m]||o;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6565:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:1},l="\u524d\u7aef\u89c4\u7ea6",i={unversionedId:"intro",id:"intro",title:"\u524d\u7aef\u89c4\u7ea6",description:"\u524d\u8a00",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/intro.md",sourceDirName:".",slug:"/intro",permalink:"/Olight-Turbo-Docusaurus-Frontend-Docs/docs/intro",draft:!1,editUrl:"https://github.com/Olight-Headless/Olight-Turbo-Docusaurus-Frontend-Docs/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Tutorial HTML",permalink:"/Olight-Turbo-Docusaurus-Frontend-Docs/docs/category/tutorial-html"}},u={},c=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"\u89c4\u7ea6\u7ea7\u522b\u548c\u5bf9\u5e94\u7684 Lint \u89c4\u5219",id:"\u89c4\u7ea6\u7ea7\u522b\u548c\u5bf9\u5e94\u7684-lint-\u89c4\u5219",level:2},{value:"\u4ee3\u7801\u793a\u4f8b",id:"\u4ee3\u7801\u793a\u4f8b",level:3}],p={toc:c};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u524d\u7aef\u89c4\u7ea6"},"\u524d\u7aef\u89c4\u7ea6"),(0,a.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,a.kt)("p",null,"\u300cOlight\u524d\u7aef\u89c4\u7ea6\u300d\u662f\u603b\u7ed3\u76ee\u524d\u5e7f\u6cdb\u4f7f\u7528\u7684\u4e00\u5957\u524d\u7aef\u7f16\u7801\u548c\u5de5\u7a0b\u89c4\u8303\uff0c\u81f4\u529b\u4e8e\u901a\u8fc7\u7edf\u4e00\u7f16\u7801\u98ce\u683c\u3001\u666e\u53ca\u6700\u4f73\u5b9e\u8df5\u548c\u4ee3\u7801\u7f3a\u9677\u68c0\u67e5\u5e2e\u52a9\u56e2\u961f\u964d\u4f4e\u534f\u4f5c\u6210\u672c\u3001\u63d0\u5347\u524d\u7aef\u9879\u76ee\u7684\u53ef\u7ef4\u62a4\u6027\u548c\u7a33\u5b9a\u6027\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7f16\u7801\u89c4\u7ea6",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/category/tutorial-html"},"HTML \u7f16\u7801\u89c4\u7ea6")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/category/tutorial-css"},"CSS \u7f16\u7801\u89c4\u7ea6")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/category/tutorial-javascript"},"JavaScript \u7f16\u7801\u89c4\u7ea6")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/category/tutorial-typescript"},"TypeScript \u7f16\u7801\u89c4\u7ea6")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/category/tutorial-react"},"React \u7f16\u7801\u89c4\u7ea6"))))),(0,a.kt)("h2",{id:"\u89c4\u7ea6\u7ea7\u522b\u548c\u5bf9\u5e94\u7684-lint-\u89c4\u5219"},"\u89c4\u7ea6\u7ea7\u522b\u548c\u5bf9\u5e94\u7684 Lint \u89c4\u5219"),(0,a.kt)("p",null,"\u6839\u636e\u7ea6\u675f\u529b\u5f3a\u5f31\uff0c\u4e00\u6761\u89c4\u7ea6\u4f9d\u6b21\u5206\u4e3a\u5f3a\u5236\u3001\u63a8\u8350\u3001\u53c2\u8003\u4e09\u4e2a\u7ea7\u522b\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u3010\u5f3a\u5236\u3011\u5fc5\u987b\u9075\u5b88\u3002\u662f\u4e0d\u5f97\u4e0d\u9075\u5b88\u7684\u7ea6\u5b9a\uff0c\u8fdd\u53cd\u672c\u7ea6\u5b9a\u6216\u5c06\u4f1a\u5f15\u8d77\u4e25\u91cd\u7684\u540e\u679c\u3002\u5982\u6709\u5bf9\u5e94 Lint \u89c4\u5219\uff0c\u914d\u5957\u89c4\u5219\u5305\u4e2d\u7ea7\u522b\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"error"),"\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u3010\u63a8\u8350\u3011\u5c3d\u91cf\u9075\u5b88\u3002\u957f\u671f\u9075\u5b88\u8fd9\u6837\u7684\u89c4\u5b9a\uff0c\u6709\u52a9\u4e8e\u7cfb\u7edf\u7a33\u5b9a\u6027\u548c\u5408\u4f5c\u6548\u7387\u7684\u63d0\u5347\u3002\u5982\u6709\u5bf9\u5e94 Lint \u89c4\u5219\uff0c\u914d\u5957\u89c4\u5219\u5305\u4e2d\u7ea7\u522b\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"warn"),"\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u3010\u53c2\u8003\u3011\u5145\u5206\u7406\u89e3\u3002\u6280\u672f\u610f\u8bc6\u7684\u5f15\u5bfc\uff0c\u662f\u4e2a\u4eba\u5b66\u4e60\u3001\u56e2\u961f\u6c9f\u901a\u3001\u9879\u76ee\u5408\u4f5c\u7684\u65b9\u5411\u3002\u5982\u6709\u5bf9\u5e94 Lint \u89c4\u5219\uff0c\u914d\u5957\u89c4\u5219\u5305\u4e2d\u9ed8\u8ba4\u4e0d\u5f00\u542f\uff0c\u5f00\u53d1\u8005\u53ef\u6839\u636e\u9700\u8981\u81ea\u884c\u5f00\u542f\u3002")),(0,a.kt)("p",null,"\u4e00\u6761\u89c4\u7ea6\u7684\u7ea7\u522b\u4f1a\u5728\u89c4\u7ea6\u63cf\u8ff0\u7684\u5f00\u5934\u6807\u6ce8\uff0c\u5982\u6709\u5bf9\u5e94\u7684 Lint \u89c4\u5219\u4f1a\u5728\u7ed3\u5c3e\u6807\u6ce8\uff0c\u4f8b\u5982\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"1.1.1\u3010\u5f3a\u5236\u3011\u4f7f\u7528 2 \u4e2a\u7a7a\u683c\u7f29\u8fdb\u3002eslint: ",(0,a.kt)("a",{parentName:"li",href:"https://eslint.org/docs/rules/indent"},"indent"))),(0,a.kt)("h3",{id:"\u4ee3\u7801\u793a\u4f8b"},"\u4ee3\u7801\u793a\u4f8b"),(0,a.kt)("p",null,"\u4e3a\u4e86\u66f4\u52a0\u76f4\u89c2\uff0c\u89c4\u7ea6\u63cf\u8ff0\u4e4b\u540e\u901a\u5e38\u4f1a\u914d\u4e0a\u4ee3\u7801\u793a\u4f8b\uff0c\u4f8b\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// bad\nfunction foo() {\n\u2219\u2219\u2219\u2219let name;\n}\n\n// good\nfunction foo() {\n\u2219\u2219let name;\n}\n")),(0,a.kt)("p",null,"\u6211\u4eec\u7ea6\u5b9a\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"bad")," \u6ce8\u91ca\u8868\u793a\u53cd\u4f8b\uff0c\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"good")," \u6ce8\u91ca\u8868\u793a\u6b63\u4f8b\u3002"),(0,a.kt)("p",null,"\u9664\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"bad")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"good"),"\uff0c\u6709\u65f6\u4f60\u8fd8\u4f1a\u770b\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"disallowed"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"allowed"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"best")," \u8fd9\u51e0\u79cd\u6ce8\u91ca\uff0c\u5b83\u4eec\u7684\u542b\u4e49\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// disallowed - \u7981\u6b62\uff08\u7528\u4e8e\u90e8\u5206\u660e\u4ee4\u7981\u6b62\u7684\u7528\u6cd5\uff09\n// bad - \u53cd\u4f8b\n// allowed - \u4e2d\u4f8b\uff08\u7528\u4e8e\u5141\u8bb8\u4f46\u4e0d\u63a8\u8350\u7684\u7528\u6cd5\uff09\n// good - \u6b63\u4f8b\n// best - \u6700\u4f73\u6b63\u4f8b\uff08\u591a\u4e2a\u6b63\u4f8b\u4e2d\u6700\u597d\u7684\u5b9e\u73b0\uff09\n")))}s.isMDXComponent=!0}}]);