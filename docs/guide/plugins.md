# Plugin

By default, convue will automatically load the .js|.ts file in the /src/plugins directory.

For example, write a plugin file

```js
import Antd from'ant-design-vue';
import'ant-design-vue/dist/antd.css';

export default ({ app }, inject) => {
   app.use(Antd);

   inject('sayHello', (obj) => {
     console.log('Hello Convue!');
   });
};
```

Access the sayHello function

```js
const instance = getCurrentInstance();
const toString = instance?.appContext.config.globalProperties.$toString;
```

## Parameters

The function has two parameters, the first is the information about the component instance, and the second is the inject function (functions registered through the inject function will be automatically loaded into app.config.global.properties).

The first parameter description:

-app: current vue instance
-store: access to global status
-router: current routing object
-route: current route information
-env: list of environment variables

For other rules, please [refer to plugin configuration item](/convue/config/plugin).
