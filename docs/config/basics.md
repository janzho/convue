# Other configuration

## loading

-Type: `string`
-Default: `undefined`

The loading color setting before the vue instance of the page is created

Please refer to head](/convue/guide/head) for the usage guide.

## progress

-Type: `boolean | Progress`
-Default: `true`

Progress bar setting during route switching

If set to false, it will not be displayed and the code will not be introduced.

Progress type
```ts
export interface Progress {
   color?: string;
   size?: string;
}
```

If you pass in an object, you can set the color and size of the progress bar.
