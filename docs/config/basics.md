# 其他配置

## ssr

- Type: `boolean`
- Default: `undefined`

是否开启 ssr

## loading

- Type: `string`
- Default: `undefined`

页面的 vue 实例创建完成前的 loading 颜色设置

使用指南请[参考head](/convue/guide/head)。

## progress

- Type: `boolean | Progress`
- Default: `true`

路由切换时的进度条设置

如果设置为 false, 则不会显示，同时也不会引入该段代码。

Progress 的类型
```ts
export interface Progress {
  color?: string;
  size?: string;
}
```

传入对象的话，可以设置进度条的颜色和尺寸。
