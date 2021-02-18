# convue
convue is a plugin for vite based on vite and vue3 that gives you a set of experiences for rapid development projects, similar to nuxt and umi.js.Reference documents:[https://ziping-li.github.io/convue/](https://ziping-li.github.io/convue/).

## Motivation and advantages

1. umi.js does not support vue at the moment, and nuxt does not yet have perfect support for vue3 and vite.
2. convue is a plugin for vite, which is closer to the official vue base ecosystem and can integrate perfectly with other base libraries.
3. convue is only a development dependency, compared to other frameworks, the size of the build is almost 0.

## Quick start

1. install convue.

```bash
yarn add convue -D
```

2. Use it in your project

Use it in vite.config.js

```js
import convue from 'convue';

export default defineConfig({
  plugins: [
    ... .convue({}),
  ],
});
```

3. Introduce the required packages in main.js, or leave them out if you don't need them

```js
import { createApp } from 'vue';
import App from '. /src/App.vue';
import router from 'pages-generated';
import globalComponent from 'components-generated';
import store from 'store-generated';
import plugin from 'plugin-generated';
import i18n from 'locale-generated';

const app = createApp(App);
window.__APP__ = app; // To allow middleware to get the component instance, remove the line if you don't need to use it

app.use(router);
app.use(globalComponent);
app.use(store);
app.use(plugin);
app.use(i18n);
app.mount('#app');
```

## Using convue-cli

convue provides a set of scaffolding tools for initializing projects, currently supporting both sfc (vue single file) and tsx development modes.

```bash
# step 1
yarn global add convue-cli
# step 2 - type convue on the command line, followed by a prompt to do
convue
# step 3 - enter the project file
npm run dev
```

## Project directory

convue uses an agreed-upon directory format, so we need to follow this development style. It is often an effective measure to achieve uniformity and efficiency in a project.

If you need to change the directory structure, you can [refer to the configuration item](https://ziping-li.github.io/convue/config/page).

Take the tsx form as an example.

```js
├── public
├── src
    ├─ components
    ├── layouts
        ├─ default.tsx
    ├─ locales
        ├─ en-US.ts
        ├── zh-CN.ts
    ├─ middleware
    ├── pages
        └── index.tsx
    ├─ plugins
    ├─ store
    └── App.tsx
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├─ .stylelintrc.json
├── index.html
├─ package.json
├─ shims.d.ts
├─ tsconfig.json
├─ vite.config.ts
├── yarn.lock
```
