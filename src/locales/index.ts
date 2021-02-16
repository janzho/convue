import { resolve } from 'path';
import type { Plugin, ResolvedConfig, ModuleNode } from 'vite';
import { ResolvedOptions, UserOptions } from './types';
import { getStoresPath } from './files';
import {
  generateLocales,
  generateClientCode,
} from './generate';
import { debug, normalizePath } from './utils';

const ID = 'locale-generated';

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    dir = 'src/locales',
    defaultLocale = '',
    extensions = ['js', 'ts'],
    exclude = [],
  } = userOptions;

  const root = process.cwd();
  const localesDirPath = normalizePath(resolve(root, dir));

  return Object.assign(
    {},
    {
      root,
      dir,
      defaultLocale,
      localesDirPath,
      extensions,
      exclude,
    },
    userOptions
  );
}

function routePlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined;
  let filesPath: string[] = [];
  let generatedLocales: any[] | null | undefined;

  const options: ResolvedOptions = resolveOptions(userOptions);

  return {
    name: 'vite-plugin-store',
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
      options.root = config.root;
      options.localesDirPath = normalizePath(resolve(config.root, options.dir));
      debug('localesDirPath', options.localesDirPath);
    },
    resolveId(id) {
      if (id === ID) return ID;
    },
    async load(id) {
      if (id === ID) {
        debug('Loading files...');

        filesPath = await getStoresPath(options);

        debug('FilesPath: %O', filesPath);

        if (!generatedLocales) generatedLocales = generateLocales(filesPath, options);

        debug('Components: %O', generatedLocales);

        const clientCode = generateClientCode(generatedLocales, options);

        debug('Client code: %O', clientCode)

        return clientCode;
      }
    },
    async handleHotUpdate({ file, server }) {
      const extensionsRE = new RegExp(`\\.(${options.extensions.join('|')})$`);
      const storeDir = options.dir;
      const localesDirPath = options.localesDirPath;
      // Handle pages HMR
      if (
        (file.startsWith(localesDirPath) || file.startsWith(localesDirPath)) &&
        extensionsRE.test(file)
      ) {
        let needReload = false;

        // HMR on new file created
        // Otherwise, handle HMR from custom block
        if (file.includes(storeDir)) {
          if (
            !filesPath.includes(file.replace(`${localesDirPath}/`, ''))
          ) {
            generatedLocales = null;
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
