# 插件

convue 默认会自动加载 /src/plugins 目录下的 .js|.ts 文件。

比如编写一个的 plugin 文件

```js
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default ({ app }, inject) => {
  app.use(Antd);

  inject('sayHello', (obj) => {
    console.log('Hello Convue!');
  });
};
```

访问 sayHello 函数

```js
const instance = getCurrentInstance();
const toString = instance?.appContext.config.globalProperties.$toString;
```

## 参数

函数有两个参数，第一个为组件实例相关的信息，第二个为 inject 函数（通过 inject 函数注册的函数会自动加载进 app.config.global.properties 中）。

第一个参数说明：

- app: 当前 vue 实例
- store: 全局状态访问
- router: 当前路由对象
- route: 当前路由的信息
- env: 环境变量列表

其他规则请[参考 plugin 配置项](/convue/zh/config/plugin)。
