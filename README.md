# com-element

com-element 是一个基于 element-ui 进行二次封装的组件库，主要为自己业务封装的一些组件和对 element-ui 进行新的主题定制。


## 安装

```
npm install com-element -S
```

## 使用

在 main.js 文件中引入插件并注册

```
import Vue from 'vue'
import comElement from 'com-element'
import 'com-element/lib/comElement.css'

Vue.use(comElement)
```

## 特点

1. 基于 element-ui 进行的二次封装，支持 element-ui 版本升级
2. 提供以 npm 的形式安装提供全局组件
3. 支持按需加载指定的组件（暂未实现）
4. 支持主题定制（暂未实现）
5. 支持md文档输出

## 浏览器兼容

与 element-ui 保持一致：现代浏览器和 IE10+


https://github.com/xaboy/form-create
