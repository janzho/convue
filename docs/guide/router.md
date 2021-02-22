# Router

By default, convue will automatically load the .vue|.js|.jsx|.ts|.tsx file in the /src/pages directory and generate a route corresponding to the file name.

For example, the routing address corresponding to the index.tsx file in the /src/pages directory is /, and the routing address corresponding to the user.tsx file is /user.

## Dynamic routing

The naming rule for dynamic routing is: param[.vue|.js|.jsx|.ts|.tsx]

## Add routing information

Add a route tag in the /src/pages/index.tsx file.

```js
{
  /* <route>
  name:'test'
  meta:
    title: 111
</route> */
}

import {defineComponent} from'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

If it is sfc (vue single file), no comment is required.

The syntax supported by the route tag is'json5' |'json' |'yaml', the default is yaml, if it is json syntax, just specify the lang of the route.

```js
{
  /* <route lang="json">
  {
    name:'test',
    meta: {
      title: 111
    }
  }
</route> */
}

import {defineComponent} from'vue';

export default defineComponent({
  setup() {
    return () => <div></div>;
  },
});
```

## Route redirect

When the address of the website is not in the routing registry, if there is a 404 page under /src/pages, it will be redirected to the /404 address, otherwise it will be redirected to the / address.

For other rules, please [refer to page configuration item](/convue/config/page).
