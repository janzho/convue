export interface Progress {
  color?: string;
  size?: string;
}

/**
 * Plugin options.
 */
export interface Options {
  /**
   * Resolves to the `root` value from Vite config.
   * @default config.root
   */
  root?: string
  head?: {
    title?: string;
    meta?: Record<string, string>[];
    link?: Record<string, string>[];
    style?: string;
  };
  loading?: string;
  progress?: Progress | boolean;
}
