# 组件

convue 默认会注册 /src/components 目录下的 .vue|.js|.jsx|.ts|.tsx 文件为全局组件。

比如在 /src/components 下有一个 Hello.tsx 组件

```js
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => <div>Hello Convue!</div>;
  },
});
```

在页面中使用

```js
import { defineComponent } from 'vue';
// import Hello from '/src/components/hello'; 不需要加载注册

export default defineComponent({
  setup() {
    return () => <hello></hello>;
  },
});
```

全局组件推荐用 lowercase 的写法，自定义组件用 大驼峰 的写法。

## 多级目录

如果 /src/components 下还存在多级目录，那么组件的的命名会以 folder-file 的形式连接。

比如 src/components/app/navbar.tsx, 那么使用该组件的话需要加上 app 的前缀（app-navbar），更多层级以此类推。

其他规则请[参考 component 配置项](/convue/config/component)。
