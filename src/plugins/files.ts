import fg from 'fast-glob'
import { ResolvedOptions } from './types'
import { extensionsToGlob } from './utils'

/**
 * Resolves the files that are valid pages for the given context.
 */
export async function getStoresPath(options: ResolvedOptions): Promise<string[]> {
  const {
    pluginsDirPath,
    extensions,
    exclude,
  } = options

  const ext = extensionsToGlob(extensions)

  const files = await fg(`**/*.${ext}`, {
    ignore: ['node_modules', '.git', '**/__*__/*', ...exclude],
    onlyFiles: true,
    cwd: pluginsDirPath,
  })

  return files
}
