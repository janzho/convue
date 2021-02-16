# 中间件

convue 默认会加载 /src/middleware 目录下的 .ts | .js 文件，并且在路由全局的前置钩子中执行。

比如编写一个 auth 的中间件

```js
export default ({ redirect, store }) => {
  if (!store.state.isLogined) {
    redirect('/login');
  }
};
```

## 参数

- query: 当前路由的 query 参数
- params: 当前路由的 params 参数
- route: 当前路由的信息
- redirect: 重定向函数，接受一个 url 作为参数
- store: 全局状态访问
- app: 当前 vue 实例
- env: 环境变量列表

其他规则请[参考 page 配置项](/config/page)。
