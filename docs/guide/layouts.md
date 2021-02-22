# Layout

Layout refers to the container component of a public area of the website.

By default, convue will load the .vue|.js|.jsx|.ts|.tsx file in the /src/layouts directory and import it into the routing table. The default loaded is default[.vue|.js|.jsx|. ts|.tsx].

The router-view component must be included in the file.

```js
import {defineComponent} from'vue';

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

## Change the layout of the current page

Add a route tag to the file and specify the layout in meta. The value of layout corresponds to the file name under /src/layouts.

```js
{
   /* <route>
   name:'test'
   meta:
     title: 111
     layout: empty
</route> */
}

import {defineComponent} from'vue';

export default defineComponent({
   setup() {
     return () => <div></div>;
   },
});
```

For other rules, please [refer to layout configuration items](/convue/config/layout).
