# Middleware

By default, convue will load the .ts | .js file in the /src/middleware directory and execute it in the pre-hook of the routing global.

For example, write an auth middleware

```js
export default ({ redirect, store }) => {
   if (!store.state.isLogined) {
     redirect('/login');
   }
};
```

## Parameters

-query: query parameter of the current route
-params: params parameters of the current route
-route: current route information
-redirect: redirect function, accept a url as a parameter
-store: access to global status
-app: current vue instance
-env: list of environment variables

For other rules, please [refer to page configuration item](/convue/config/page).
