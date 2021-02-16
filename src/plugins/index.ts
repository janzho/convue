import { resolve } from 'path';
import type { Plugin, ResolvedConfig, ModuleNode } from 'vite';
import { ResolvedOptions, UserOptions } from './types';
import { getStoresPath } from './files';
import {
  generatePlugins,
  generateClientCode,
} from './generate';
import { debug, normalizePath } from './utils';

const ID = 'plugin-generated';

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    dir = 'src/plugins',
    extensions = ['js', 'ts'],
    exclude = [],
  } = userOptions;

  const root = process.cwd();
  const pluginsDirPath = normalizePath(resolve(root, dir));

  return Object.assign(
    {},
    {
      root,
      dir,
      pluginsDirPath,
      extensions,
      exclude,
    },
    userOptions
  );
}

function routePlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined;
  let filesPath: string[] = [];
  let generatedPlugins: any[] | null | undefined;

  const options: ResolvedOptions = resolveOptions(userOptions);

  return {
    name: 'vite-plugin-store',
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
      options.root = config.root;
      options.pluginsDirPath = normalizePath(resolve(config.root, options.dir));
      debug('pluginsDirPath', options.pluginsDirPath);
    },
    resolveId(id) {
      if (id === ID) return ID;
    },
    async load(id) {
      if (id === ID) {
        debug('Loading files...');

        filesPath = await getStoresPath(options);

        debug('FilesPath: %O', filesPath);

        if (!generatedPlugins) generatedPlugins = generatePlugins(filesPath, options);

        debug('Components: %O', generatedPlugins);

        const clientCode = generateClientCode(generatedPlugins);

        debug('Client code: %O', clientCode)

        return clientCode;
      }
    },
    async handleHotUpdate({ file, server }) {
      const extensionsRE = new RegExp(`\\.(${options.extensions.join('|')})$`);
      const storeDir = options.dir;
      const pluginsDirPath = options.pluginsDirPath;
      // Handle pages HMR
      if (
        (file.startsWith(pluginsDirPath) || file.startsWith(pluginsDirPath)) &&
        extensionsRE.test(file)
      ) {
        let needReload = false;

        // HMR on new file created
        // Otherwise, handle HMR from custom block
        if (file.includes(storeDir)) {
          if (
            !filesPath.includes(file.replace(`${pluginsDirPath}/`, ''))
          ) {
            generatedPlugins = null;
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
