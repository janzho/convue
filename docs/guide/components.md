# Global components

By default, convue will register the .vue|.js|.jsx|.ts|.tsx file in the /src/components directory as a global component.

For example, there is a Hello.tsx component under /src/components

```js
import {defineComponent} from'vue';

export default defineComponent({
   setup() {
     return () => <div>Hello Convue!</div>;
   },
});
```

Use in the page

```js
import {defineComponent} from'vue';
// import Hello from'/src/components/hello'; no need to load registration

export default defineComponent({
   setup() {
     return () => <hello></hello>;
   },
});
```

It is recommended to use lowercase for global components, and big hump for custom components.

## Multi-level directory

If there are multiple levels of directories under /src/components, then the naming of the components will be connected in the form of folder-file.

For example, src/components/app/navbar.tsx, then you need to add the prefix app (app-navbar) to use this component, and so on for more levels.

For other rules, please [refer to component configuration items](/convue/config/component).
