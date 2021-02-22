# page

## dir

-Type: `string`
-Default: `src/pages`

Directory settings for pages

## middleware

-Type: `string`
-Default: `src/middleware`

Middleware directory settings

## router

-Type: `RouterConfig`
-Default: `undefined`

Other configuration items of routing include two commonly used history and scrollBehavior.

```ts
export interface RouterConfig {
  history?:'hash' |'history';
  scrollBehavior?: Function;
}
```

## extensions

-Type: `string[]`
-Default: `['vue','js','ts','jsx','tsx']`

Files that will be loaded by default.

## exclude

-Type: `string[]`
-Default: `[]`

The list of files that need to be excluded in the file will be loaded by default.

## importMode

-Type: `ImportMode | ImportModeResolveFn`
-Default: `async`

The way to import files.

```ts
export type ImportMode ='sync' |'async';
export type ImportModeResolveFn = (filepath: string) => ImportMode;
```

## syncIndex

-Type: `boolean`
-Default: `true`

Whether the index page is loaded synchronously.

## routeBlockLang

-Type: `'json5' |'json' |'yaml'`
-Default: `yaml`

Languages ​​supported by route tags.

## extendRoute

-Type: `(route: Route, parent: Route | undefined) => Route | void`
-Default: `undefined`

The routing information object can be extended through this function.

For the usage guide, please [reference routing](/convue/guide/router).
