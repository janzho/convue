import { ResolvedOptions } from './types'

export function getImportCode(files: string[], options: ResolvedOptions) {
  const imports: string[] = []

  for (const file of files) {
    const path = `/${options.dir}/${file.slice(0, file.lastIndexOf('.'))}`
    imports.push(`'${path}': () => import('${path}'),`)
  }

  const importsCode = `const layouts = {
${imports.join('\n')}
}`
  return importsCode
}
