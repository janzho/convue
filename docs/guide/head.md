# head tag

Under normal circumstances, the head tag contains title, meta and link tags, and the srcript tag is usually written at the end of the body.

Meta tags are also an important part of SEO.

## Placeholder

-Pass <!-- TITLE --> placeholder title tag content
-The meta and link tags that need to be loaded through the <!-- HEAD --> placeholder head tag
-Via <!-- APP --> placeholder elements mounted by the vue instance and loading

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

## Global Settings

Passed in in the convue configuration item in vite.config.js is the global configuration

```js
import {defineConfig} from'vite';
import convue from'convue';

export default defineConfig({
  plugins: [
    ...convue({
      head: {
        title:'Convue',
        meta: [
          {name:'language', content:'en-US' },
          {name:'author', content:'ziping' },
        ],
        link: [
          {
            rel:'dns-prefetch',
            href:'https://www.googletagmanager.com',
            crossorigin:'crossorigin',
          },
          {
            rel:'dns-prefetch',
            href:'https://www.google-analytics.com/analytics.js',
            crossorigin:'crossorigin',
          },
        ],
      },
    }),
  ],
});
```

If the title is not passed, the name field in packgae.json will be taken by default.

## Page individually set

We can also set the head separately for a certain page, and finally the head of the page will contain the content of the global settings plus the individual settings of the page.

The meta object is also used in the route tag.

```js
{
  /* <route>
  name:'test'
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

import {defineComponent} from'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

For other rules, please [refer to the head configuration item](/convue/config/head).
