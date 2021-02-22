# 什么是 convue？

convue 是一个基于 vite 和 vue3 开发的一个 vite 的插件，让你拥有一套快速开发项目的体验，类似于 nuxt 和 umi.js。

## 动机与优势

1. umi.js 暂时不支持 vue，而 nuxt 还没有完美支持 vue3 和 vite；
2. convue 因为只是 vite 的一个插件，更接近于 vue 官方的基础生态，能完美融合其他基础库；
3. convue 仅仅是一个开发依赖，相对于其他框架而言，构建之后的体积几乎为 0。

## 快速上手

1. 安装 convue.

```bash
yarn add convue -D
```

2. 在项目中使用

在 vite.config.js 中使用

```js
import convue from 'convue';

export default defineConfig({
  plugins: [
    ...convue({}),
  ],
});
```

3. 在 main.js 中引入需要的包，如果不需要的则可以不引入

```js
import { createApp } from 'vue';
import App from './src/App.vue';
import router from 'pages-generated';
import globalComponent from 'components-generated';
import store from 'store-generated';
import plugin from 'plugin-generated';
import i18n from 'locale-generated';

const app = createApp(App);
window.__APP__ = app; // 为了让 middleware 能获取到组件实例，如果不需要使用可以移除该行

app.use(router);
app.use(globalComponent);
app.use(store);
app.use(plugin);
app.use(i18n);
app.mount('#app');
```

## 使用脚手架

convue 提供了一套初始化项目的脚手架工具，目前支持 sfc (vue 单文件) 形式和 tsx 方式两种开发模式。

```bash
# step 1
yarn global add convue-cli
# step 2 - 在命令行中输入 convue, 后续会提示操作
convue
# step 3 - 进入项目文件
npm run dev
```

## 项目目录

convue 采用约定式的目录形式，因此我们需要遵守这一套开发方式.往往在项目中要做到统一规范，提高效率，这是一种有效的措施。

如果你需要改变目录结构，可以[参考配置项](/convue/zh/config/page)。

以 tsx 形式为例：

```js
.
├── public
├── src
    ├── components
    ├── layouts
        ├── default.tsx
    ├── locales
        ├── en-US.ts
        ├── zh-CN.ts
    ├── middleware
    ├── pages
        └── index.tsx
    ├── plugins
    ├── store
    └── App.tsx
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── .stylelintrc.json
├── index.html
├── package.json
├── shims.d.ts
├── tsconfig.json
├── vite.config.ts
├── yarn.lock
```
