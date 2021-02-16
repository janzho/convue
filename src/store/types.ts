/**
 * Plugin options.
 */
interface Options {
  /**
   * Relative path to the directory to search for store.
   * @default 'src/store'
   */
  dir: string
  /**
   * Valid file extensions for store.
   * @default ['js', 'ts']
   */
  extensions: string[]
  /**
   * List of path globs to exclude when resolving pages.
   */
  exclude: string[]
}

export type UserOptions = Partial<Options>

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   * @default config.root
   */
  root: string
  /**
   * Resolves to the component path (root + storeDir).
   */
  storeDirPath: string
}
