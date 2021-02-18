# head 标签

通常情况下，head 标签内包含了 title、meta 和 link 标签， srcript 标签我们通常写在 body 的最后面。

meta 标签同时也是 SEO 中重要的一环。

## 占位符

- 通过 <!-- TITLE --> 占位 title 标签的内容
- 通过 <!-- HEAD --> 占位 head 标签需要加载的 meta 和 link 标签
- 通过 <!-- APP --> 占位 vue 实例挂载的元素以及 loading

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><!-- TITLE --></title>
    <!-- HEAD -->
  </head>
  <body>
    <!-- APP -->
    <script type="module">
      // ...
    </script>
  </body>
</html>
```

## 全局设置

在 vite.config.js 中的 convue 配置项中传入的为全局配置

```js
import { defineConfig } from 'vite';
import convue from 'convue';

export default defineConfig({
  plugins: [
    ...convue({
      head: {
        title: 'Convue',
        meta: [
          { name: 'language', content: 'en-US' },
          { name: 'author', content: 'ziping' },
        ],
        link: [
          {
            rel: 'dns-prefetch',
            href: 'https://www.googletagmanager.com',
            crossorigin: 'crossorigin',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://www.google-analytics.com/analytics.js',
            crossorigin: 'crossorigin',
          },
        ],
      },
    }),
  ],
});
```

如果 title 不传的话，默认会取 packgae.json 中的 name 字段。

## 页面单独设置

我们也可以为某一个页面单独设置 head，最终该页面的 head 会包含全局设置的加上页面单独设置的内容。

同样是在 route 标签中使用 meta 对象。

```js
{
  /* <route>
  name: 'test'
  meta:
    head:
      title: Convue
      meta:
        -
          name: language
          content: en-US
        -
          name: author
          content: ziping
</route> */
}

import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

其他规则请[参考 head 配置项](/convue/config/head)。
