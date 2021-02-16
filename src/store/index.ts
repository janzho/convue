import { resolve } from 'path';
import type { Plugin, ResolvedConfig, ModuleNode } from 'vite';
import { ResolvedOptions, UserOptions } from './types';
import { getStoresPath } from './files';
import {
  generateStores,
  generateClientCode,
} from './generate';
import { debug, normalizePath } from './utils';

const ID = 'store-generated';

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    dir = 'src/store',
    extensions = ['js', 'ts'],
    exclude = [],
  } = userOptions;

  const root = process.cwd();
  const storeDirPath = normalizePath(resolve(root, dir));

  return Object.assign(
    {},
    {
      root,
      dir,
      storeDirPath,
      extensions,
      exclude,
    },
    userOptions
  );
}

function routePlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined;
  let filesPath: string[] = [];
  let generatedStores: any[] | null | undefined;

  const options: ResolvedOptions = resolveOptions(userOptions);

  return {
    name: 'vite-plugin-store',
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
      options.root = config.root;
      options.storeDirPath = normalizePath(resolve(config.root, options.dir));
      debug('storeDirPath', options.storeDirPath);
    },
    resolveId(id) {
      if (id === ID) return ID;
    },
    async load(id) {
      if (id === ID) {
        debug('Loading files...');

        filesPath = await getStoresPath(options);

        debug('FilesPath: %O', filesPath);

        if (!generatedStores) generatedStores = generateStores(filesPath, options);

        debug('Components: %O', generatedStores);

        const clientCode = generateClientCode(generatedStores);

        debug('Client code: %O', clientCode)

        return clientCode;
      }
    },
    async handleHotUpdate({ file, server }) {
      const extensionsRE = new RegExp(`\\.(${options.extensions.join('|')})$`);
      const storeDir = options.dir;
      const storeDirPath = options.storeDirPath;
      // Handle pages HMR
      if (
        (file.startsWith(storeDirPath) || file.startsWith(storeDirPath)) &&
        extensionsRE.test(file)
      ) {
        let needReload = false;

        // HMR on new file created
        // Otherwise, handle HMR from custom block
        if (file.includes(storeDir)) {
          if (
            !filesPath.includes(file.replace(`${storeDirPath}/`, ''))
          ) {
            generatedStores = null;
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
