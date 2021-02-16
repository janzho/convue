/**
 * Plugin options.
 */
interface Options {
  /**
   * Relative path to the directory to search for global components.
   * @default 'src/components'
   */
  dir: string
  /**
   * Valid file extensions for global components.
   * @default ['vue', 'js', 'ts', 'jsx', 'tsx']
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
   * Resolves to the component path (root + componentsDir).
   */
  componentsDirPath: string
}
