import fg from 'fast-glob'
import { ResolvedOptions } from './types'
import { extensionsToGlob } from './utils'

/**
 * Resolves the files that are valid pages for the given context.
 */
export async function getPagesPath(options: ResolvedOptions): Promise<string[]> {
  const {
    pagesDirPath,
    extensions,
    exclude,
  } = options

  const ext = extensionsToGlob(extensions)

  const files = await fg(`**/*.${ext}`, {
    ignore: ['node_modules', '.git', '**/__*__/*', ...exclude],
    onlyFiles: true,
    cwd: pagesDirPath,
  })

  return files
}

/**
 * Resolves the files that are valid middles for the given context.
 */
export async function getMiddlesPath(options: ResolvedOptions): Promise<string[]> {
  const {
    middlewareDirPath,
    extensions,
    exclude,
  } = options

  const ext = extensionsToGlob(extensions)

  const files = await fg(`**/*.${ext}`, {
    ignore: ['node_modules', '.git', '**/__*__/*', ...exclude],
    onlyFiles: true,
    cwd: middlewareDirPath,
  })

  return files
}
