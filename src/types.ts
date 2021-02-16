export type ImportMode = 'sync' | 'async';
export type ImportModeResolveFn = (filepath: string) => ImportMode;
export type HistoryMode = 'hash' | 'history';

export interface Route {
  name?: string;
  path: string;
  props?: boolean;
  component: string;
  children?: Route[];
  meta?: Record<string, unknown>;
}

export interface RouterConfig {
  history?: HistoryMode;
  scrollBehavior?: Function;
}

export interface Progress {
  color?: string;
  size?: string;
}

/**
 * Plugin options.
 */
export interface Options {
  head?: {
    title?: string;
    meta?: Record<string, string>[];
    link?: Record<string, string>[];
  };
  ssr?: boolean;
  loading?: string;
  progress?: boolean | Progress;
  page?: {
    /**
     * Relative path to the directory to search for page components.
     * @default 'src/pages'
     */
    dir?: string;
    /**
     * Relative path to the directory to search for middleware.
     * @default 'src/middleware'
     */
    middleware?: string;
    /**
     * router config
     */
    router?: RouterConfig;
    /**
     * Valid file extensions for page components.
     * @default ['vue', 'js', 'ts', 'jsx', 'tsx']
     */
    extensions?: string[];
    /**
     * List of path globs to exclude when resolving pages.
     */
    exclude?: string[];
    /**
     * Import routes directly or as async components
     * @default 'async'
     */
    importMode?: ImportMode | ImportModeResolveFn;
    /**
     * Sync load top level index file
     * @default true
     */
    syncIndex?: boolean;
    /**
     * Set default route block parser, or use `<route lang=xxx>` in SFC route block
     * @default 'json5'
     */
    routeBlockLang?: 'json5' | 'json' | 'yaml';
    /**
     * Extend route records
     */
    extendRoute?: (route: Route, parent: Route | undefined) => Route | void;
  };

  store?: {
    /**
     * Relative path to the directory to search for store.
     * @default 'src/store'
     */
    dir?: string;
    /**
     * Valid file extensions for store.
     * @default ['js', 'ts']
     */
    extensions?: string[];
    /**
     * List of path globs to exclude when resolving pages.
     */
    exclude?: string[];
  };
  layout?: {
    /**
     * Relative path to the directory to search for page components.
     * @default 'src/layouts'
     */
    dir?: string;

    /**
     * Valid file extensions for page components.
     * @default ['vue', 'js', 'ts', 'jsx', 'tsx']
     */
    extensions?: string[];

    /**
     * List of path globs to exclude when resolving pages.
     */
    exclude?: string[];
  };
  component?: {
    /**
     * Relative path to the directory to search for global components.
     * @default 'src/components'
     */
    dir?: string;
    /**
     * Valid file extensions for global components.
     * @default ['vue', 'js', 'ts', 'jsx', 'tsx']
     */
    extensions?: string[];
    /**
     * List of path globs to exclude when resolving pages.
     */
    exclude?: string[];
  };
  plugin?: {
    /**
     * Relative path to the directory to search for plugins.
     * @default 'src/plugins'
     */
    dir?: string;
    /**
     * Valid file extensions for plugin.
     * @default ['js', 'ts']
     */
    extensions?: string[];
    /**
     * List of path globs to exclude when resolving pages.
     */
    exclude?: string[];
  };
  locale?: {
    /**
     * Relative path to the directory to search for locales.
     * @default 'src/locales'
     */
    dir?: string;
    defaultLocale?: string;
    /**
     * Valid file extensions for locale.
     * @default ['js', 'ts']
     */
    extensions?: string[];
    /**
     * List of path globs to exclude when resolving pages.
     */
    exclude?: string[];
  };
}
