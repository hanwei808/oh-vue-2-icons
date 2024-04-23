# Oh, Vue Icons!

![downloads](https://img.shields.io/npm/dw/oh-vue-icons.svg?style=flat-square) [![license](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[English](README.md) | **中文说明**

`oh-vue-2-icons` 是一个能让你在 [Vue](https://vuejs.org/) 中轻松从多个流行图标库中引入 SVG 图标的组件。

&nbsp;

## 特性

- 支持 Vue 2
- 支持 tree-shaking，因此你能够仅引入你需要的图标从而减小打包体积
- 支持来自 [21 个流行的图标库](#支持的图标库)的 30000+ 个图标

&nbsp;

## 支持的图标库

目前支持以下 21 个图标库：

| 图标库                                                                            | 前缀 | 协议                                                                                       | 图标数量 |
| --------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------ | -------- |
| [academicons](https://github.com/jpswalsh/academicons)                            | `ai` | [SIL OFL 1.1](http://scripts.sil.org/OFL)                                                  | 149      |
| [Bootstrap Icons](https://github.com/twbs/icons)                                  | `bi` | [MIT](https://github.com/twbs/icons/blob/main/LICENSE.md)                                  | 1668     |
| [CoreUI Icons Free](https://github.com/coreui/coreui-icons) (Colorful)            | `co` | [CC BY 4.0 License](https://github.com/coreui/coreui-icons/blob/master/LICENSE)            | 1575     |
| [Cryptocurrency Icons](https://github.com/spothq/cryptocurrency-icons) (Colorful) | `ci` | [CC0 1.0 Universal](https://github.com/spothq/cryptocurrency-icons/blob/master/LICENSE.md) | 942      |
| [Font Awesome 5 Free](https://github.com/FortAwesome/Font-Awesome)                | `fa` | [CC BY 4.0](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt)           | 1610     |
| [Flat Color Icons](https://github.com/icons8/flat-color-icons) (Colorful)         | `fc` | [MIT / Good Boy](https://github.com/icons8/flat-color-icons/blob/master/LICENSE.md)        | 329      |
| [Flag Icon](https://github.com/lipis/flag-icon-css) (Colorful)                    | `fi` | [MIT](https://github.com/lipis/flag-icon-css/blob/master/LICENSE)                          | 530      |
| [gameicons](https://github.com/game-icons/icons)                                  | `gi` | [CC BY 3.0](https://github.com/game-icons/icons/blob/master/license.txt)                   | 4052     |
| [Heroicons](https://github.com/tailwindlabs/heroicons)                            | `hi` | [MIT](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)                       | 460      |
| [Ionicons](https://github.com/ionic-team/ionicons)                                | `io` | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)                          | 1332     |
| [Line Awesome](https://github.com/icons8/line-awesome)                            | `la` | [MIT / Good Boy](https://github.com/icons8/line-awesome/blob/master/LICENSE.md)            | 1544     |
| [Material Design icons](https://github.com/google/material-design-icons)          | `md` | [Apache 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE)          | 10537    |
| [Octicons](https://github.com/primer/octicons)                                    | `oi` | [MIT](https://github.com/primer/octicons/blob/main/LICENSE)                                | 259      |
| [Pokemon Icons](https://github.com/TheArtificial/pokemon-icons) (Colorful)        | `pi` | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                  | 1453     |
| [PrimeIcons](https://github.com/primefaces/primeicons)                            | `pr` | [MIT](https://github.com/primefaces/primeicons/blob/master/LICENSE)                        | 238      |
| [Pixelarticons](https://github.com/halfmage/pixelarticons)                        | `px` | [MIT](https://github.com/halfmage/pixelarticons/blob/master/LICENSE)                       | 460      |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)                           | `ri` | [Apache 2.0](https://github.com/Remix-Design/RemixIcon/blob/master/License)                | 2271     |
| [Simple Icons](https://github.com/simple-icons/simple-icons)                      | `si` | [CC0 1.0 Universal](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md)  | 2233     |
| [VSCode Icons](https://github.com/vscode-icons/vscode-icons) (Colorful)           | `vi` | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)                            | 1125     |
| [Weather Icons](https://github.com/erikflowers/weather-icons)                     | `wi` | [SIL OFL 1.1](http://scripts.sil.org/OFL)                                                  | 219      |
| [Element Plus Icons](https://github.com/element-plus/element-plus-icons)          | `el` | [MIT](https://element-plus.gitee.io/zh-CN/component/icon.html)                             | 294      |

&nbsp;

## 文档

在[这里](https://oh-vue-icons.js.org/zh/)查找图标和查看文档。

&nbsp;

## 安装

```bash
yarn add oh-vue-2-icons
# 或
npm install oh-vue-2-icons
```

&nbsp;

## 引入

### 全局引入

首先需要在 `main.js` 中引入 `oh-vue-2-icons`。你可以只引入你需要的图标从而减小打包体积。

#### Vue 2

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

import { OhVueIcon, addIcons } from 'oh-vue-2-icons'
import { FaFlag, RiZhihuFill } from 'oh-vue-2-icons/icons'

addIcons(FaFlag, RiZhihuFill)

Vue.component('v-icon', OhVueIcon)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

&nbsp;

### 局部引入

```js
import OhVueIcon from 'oh-vue-2-icons'

export default {
  components: {
    'v-icon': OhVueIcon
  }
}
```

&nbsp;

## 用法

通过 `name` prop 来指定图标名，`name` prop 值需要使用**短横线隔开式**命名：

```html
<template>
  <div>
    <v-icon name="fa-flag" />
    <v-icon name="ri-zhihu-fill" />
  </div>
</template>
```

对于 [Font Awesome 5](https://fontawesome.com/)，来自 `regular` 包的图标的 `name` prop 值的前缀为 `fa-regular-` 而不是 `fa-`，如 `fa-regular-flag`。而 `solid` 和 `brands` 包的图标前缀均为 `fa-`，如 `fa-beer` 和 `fa-github`。

[文档](https://oh-vue-icons.js.org/zh/docs#基本用法)中有更多的用法。

&nbsp;

## Props

| 名称        | 描述                    | 类型      | 接受值                                                                  | 默认值         |
| ----------- | ----------------------- | --------- | ----------------------------------------------------------------------- | -------------- |
| `scale`     | 图标大小                | `number`  | /                                                                       | `1`            |
| `animation` | 动画类型                | `string`  | `wrench` / `ring` / `pulse` / `spin` / `spin-pulse` / `flash` / `float` | /              |
| `speed`     | 动画速度                | `string`  | `slow` / `fast`                                                         | /              |
| `hover`     | 仅在被 hover 时启用动画 | `boolean` | `true` / `false`                                                        | `false`        |
| `flip`      | 翻转类型                | `string`  | `vertical` / `horizontal` / `both`                                      | /              |
| `fill`      | 图标的填充颜色          | `string`  | 颜色名称或十六进制颜色代码                                              | `currentColor` |
| `label`     | 图标的 lable            | `string`  | /                                                                       | /              |
| `title`     | 图标的 title            | `string`  | /                                                                       | /              |
| `inverse`   | 把图标变成白色          | `boolean` | `true` / `false`                                                        | `false`        |

[文档](https://oh-vue-icons.js.org/zh/docs#示例)中有一些示例。

&nbsp;

## 致谢

- 本项目受到了 [vue-awesome](https://github.com/Justineo/vue-awesome) 和 [react-icons](https://github.com/react-icons/react-icons) 的启发并借鉴了它们的部分代码

&nbsp;

## 开源协议

本项目使用 [MIT](LICENSE) 开源协议。图标来自于[其他项目](#支持的图标库)，所以还需要参考这些项目的开源协议。
