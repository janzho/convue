export type ImportMode = 'sync' | 'async'
export type ImportModeResolveFn = (filepath: string) => ImportMode
export type HistoryMode = 'hash' | 'history'

export interface Route {
  name?: string
  path: string
  props?: boolean
  component: string
  children?: Route[]
  meta?: Record<string, unknown>
}

export interface RouterConfig {
  history?: HistoryMode,
  scrollBehavior?: Function
}

export interface Progress {
  color?: string;
  size?: string;
}
/**
 * Plugin options.
 */
interface Options {
  /**
   * Relative path to the directory to search for page components.
   * @default 'src/pages'
   */
  dir: string
  /**
   * Relative path to the directory to search for middleware.
   * @default 'src/middleware'
   */
  middleware: string
  progress: boolean | Progress;
  /**
   * router config
   */
  router: RouterConfig
  /**
   * Valid file extensions for page components.
   * @default ['vue', 'js', 'ts', 'jsx', 'tsx']
   */
  extensions: string[]
  /**
   * List of path globs to exclude when resolving pages.
   */
  exclude: string[]
  /**
   * Import routes directly or as async components
   * @default 'async'
   */
  importMode: ImportMode | ImportModeResolveFn
  /**
   * Sync load top level index file
   * @default true
   */
  syncIndex: boolean
  /**
   * Set default route block parser, or use `<route lang=xxx>` in SFC route block
   * @default 'yaml'
   */
  routeBlockLang: 'json5' | 'json' | 'yaml'
  /**
   * Extend route records
   */
  extendRoute?: (route: Route, parent: Route | undefined) => Route | void
}

export type UserOptions = Partial<Options>

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   * @default config.root
   */
  root: string
  /**
   * Resolves to the pages path (root + pagesDir).
   */
  pagesDirPath: string

  /**
   * Resolves to the pages path (root + middlewareDir).
   */
  middlewareDirPath: string
}
