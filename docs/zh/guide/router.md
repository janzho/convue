# 路由

convue 默认会自动加载 /src/pages 目录下的 .vue|.js|.jsx|.ts|.tsx 文件，并且生成对应文件名称的路由。

比如 /src/pages 目录下的 index.tsx 文件对应的路由地址就是 /, user.tsx 文件对应的路由地址就是 /user。

## 动态路由

动态路由的命名规则为 :param[.vue|.js|.jsx|.ts|.tsx]

## 添加路由信息

在 /src/pages/index.tsx 文件中添加一个 route 标签。

```js
{
  /* <route>
  name: 'test'
  meta:
    title: 111
</route> */
}

import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

如果是 sfc (vue 单文件) 则不需要注释。

route 标签支持的语法有 'json5' | 'json' | 'yaml'，默认为 yaml，如果是 json 语法则指定 route 的 lang 即可。

```js
{
  /* <route lang="json">
  {
    name: 'test',
    meta: {
      title: 111
    }
  }
</route> */
}

import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

## 路由重定向

当网站的地址不在路由注册表中，如果 /src/pages 下存在 404 页面，则重定向到 /404 地址，否则就重定向到 / 地址。

其他规则请[参考 page 配置项](/convue/zh/config/page)。
