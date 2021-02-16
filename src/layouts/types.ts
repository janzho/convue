/**
 * Plugin options.
 */
interface Options {
  /**
   * Relative path to the directory to search for page components.
   * @default 'src/layouts'
   */
  dir: string

  /**
   * Valid file extensions for page components.
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
}
