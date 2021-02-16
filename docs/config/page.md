# page

## dir

- Type: `string`
- Default: `src/pages`

页面的目录设置

## middleware

- Type: `string`
- Default: `src/middleware`

中间件的目录设置

## router

- Type: `RouterConfig`
- Default: `undefined`

路由的其他配置项，包含了常用的两种 history 和 scrollBehavior.

```ts
export interface RouterConfig {
  history?: 'hash' | 'history';
  scrollBehavior?: Function;
}
```

## extensions

- Type: `string[]`
- Default: `['vue', 'js', 'ts', 'jsx', 'tsx']`

默认会加载的文件.

## exclude

- Type: `string[]`
- Default: `[]`

默认会加载文件中需要排除的文件列表.

## importMode

- Type: `ImportMode | ImportModeResolveFn`
- Default: `async`

导入文件的方式.

```ts
export type ImportMode = 'sync' | 'async';
export type ImportModeResolveFn = (filepath: string) => ImportMode;
```

## syncIndex

- Type: `boolean`
- Default: `true`

index 页面是否以同步的方式加载.

## routeBlockLang

- Type: `'json5' | 'json' | 'yaml'`
- Default: `yaml`

route 标签支持的语言.

## extendRoute

- Type: `(route: Route, parent: Route | undefined) => Route | void`
- Default: `undefined`

通过该函数可以扩展路由信息对象.

使用指南请[参考路由](/guide/router)。
