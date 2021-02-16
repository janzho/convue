import { resolve } from 'path';
import type { Plugin, ResolvedConfig, ModuleNode } from 'vite';
import { ResolvedOptions, UserOptions } from './types';
import { getComponentsPath } from './files';
import {
  generateComponents,
  generateClientCode,
} from './generate';
import { debug, normalizePath } from './utils';

const ID = 'components-generated';

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    dir = 'src/components',
    extensions = ['vue', 'js', 'jsx', 'ts', 'tsx'],
    exclude = [],
  } = userOptions;

  const root = process.cwd();
  const componentsDirPath = normalizePath(resolve(root, dir));

  return Object.assign(
    {},
    {
      root,
      dir,
      componentsDirPath,
      extensions,
      exclude,
    },
    userOptions
  );
}

function routePlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined;
  let filesPath: string[] = [];
  let generatedComponents: any[] | null | undefined;

  const options: ResolvedOptions = resolveOptions(userOptions);

  return {
    name: 'vite-plugin-components',
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
      options.root = config.root;
      options.componentsDirPath = normalizePath(resolve(config.root, options.dir));
      debug('componentsDirPath', options.componentsDirPath);
    },
    resolveId(id) {
      if (id === ID) return ID;
    },
    async load(id) {
      if (id === ID) {
        debug('Loading files...');

        filesPath = await getComponentsPath(options);

        debug('FilesPath: %O', filesPath);

        if (!generatedComponents) generatedComponents = generateComponents(filesPath, options);

        debug('Components: %O', generatedComponents);

        const clientCode = generateClientCode(generatedComponents);

        debug('Client code: %O', clientCode)

        return clientCode;
      }
    },
    async handleHotUpdate({ file, server }) {
      const extensionsRE = new RegExp(`\\.(${options.extensions.join('|')})$`);
      const componentsDir = options.dir;
      const componentsDirPath = options.componentsDirPath;
      // Handle pages HMR
      if (
        (file.startsWith(componentsDirPath) || file.startsWith(componentsDirPath)) &&
        extensionsRE.test(file)
      ) {
        let needReload = false;

        // HMR on new file created
        // Otherwise, handle HMR from custom block
        if (file.includes(componentsDir)) {
          if (
            !filesPath.includes(file.replace(`${componentsDirPath}/`, ''))
          ) {
            generatedComponents = null;
            needReload = true;
          }
        }

        if (needReload) {
          const { moduleGraph } = server;
          const module = moduleGraph.getModuleById(ID);

          debug('Reload for file: %s', file.replace(options.root, ''));

          return [module] as ModuleNode[];
        }
      }
    },
  };
}

export * from './types';
export default routePlugin;
