# 状态管理

convue 默认会加载 /src/store 目录下的 .js|.ts 文件，并且在 vuex 中自动配置。

文件的内容结构与 vuex 统一，如下

```js
export default {
  state: () => ({}),
  mutations: {},
  actions: {},
  getters: {},
};
```

## 说明

/src/store 下的 index[.js|.ts] 会直接加载 vuex 项，其他文件会以模块的形式配置。

比如存在 index.js 和 user.js 两个文件。

index.js

```js
export default {
  state: () => ({
    text: 'hello',
  }),
};
```

user.js

```js
export default {
  state: () => ({
    name: 'convue',
  }),
};
```

那么 vuex store 实际上是这种结构

```js
export default {
  state: () => ({
    text: 'hello',
  }),
  modules: {
    user: {
      state: () => ({
        text: 'convue',
      }),
    },
  },
};
```

其他规则请[参考 store 配置项](/convue/config/store)。
