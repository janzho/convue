# 布局

布局指的是网站的一个公共区域的容器组件。

convue 默认会加载 /src/layouts 目录下的 .vue|.js|.jsx|.ts|.tsx 文件，并且在路由表中引入，默认加载的是 default[.vue|.js|.jsx|.ts|.tsx]。

文件中必须包含 router-view 组件。

```js
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => (
      <div>
        <span>default layout</span>
        <router-view></router-view>
      </div>
    );
  },
});
```

## 改变当前页面的 layout

在文件中添加一个 route 标签，并且在 meta 中指定 layout，layout 的值对应 /src/layouts 下的文件名。

```js
{
  /* <route>
  name: 'test'
  meta:
    title: 111
    layout: empty
</route> */
}

import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

其他规则请[参考 layout 配置项](/config/layout)。
