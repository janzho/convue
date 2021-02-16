import { resolve } from 'path';
import type { Plugin, ResolvedConfig, ModuleNode } from 'vite';
import { Route, ResolvedOptions, UserOptions } from './types';
import { getPagesPath, getMiddlesPath } from './files';
import {
  generateRoutes,
  generateMiddleware,
  generateClientCode,
  updateRouteFromHMR,
} from './generate';
import { debug, normalizePath } from './utils';
import { parseVueRequest } from './query';

const ID = 'pages-generated';

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    dir = 'src/pages',
    middleware = 'src/middleware',
    progress = true,
    extensions = ['vue', 'js', 'jsx', 'ts', 'tsx'],
    importMode = 'sync',
    routeBlockLang = 'yaml',
    router = {
      history: 'history',
    },
    exclude = [],
    syncIndex = true,
  } = userOptions;

  const root = process.cwd();
  const pagesDirPath = normalizePath(resolve(root, dir));
  const middlewareDirPath = normalizePath(resolve(root, middleware));

  return Object.assign(
    {},
    {
      routeBlockLang,
      root,
      dir,
      pagesDirPath,
      middleware,
      middlewareDirPath,
      progress,
      router,
      extensions,
      importMode,
      exclude,
      syncIndex,
    },
    userOptions
  );
}

function routePlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined;
  let filesPath: string[] = [];
  let generatedRoutes: Route[] | null | undefined;
  let middlewareFilesPath: string[] = [];
  let generatedMiddleware: any[] | null | undefined;

  const options: ResolvedOptions = resolveOptions(userOptions);

  return {
    name: 'vite-plugin-pages',
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
      options.root = config.root;
      options.pagesDirPath = normalizePath(resolve(config.root, options.dir));
      options.middlewareDirPath = normalizePath(resolve(config.root, options.middleware));
      debug('pagesDirPath', options.pagesDirPath);
      debug('middlewareDirPath', options.middlewareDirPath);
    },
    resolveId(id) {
      if (id === ID) return ID;
    },
    async load(id) {
      if (id === ID) {
        debug('Loading files...');

        filesPath = await getPagesPath(options);

        debug('FilesPath: %O', filesPath);

        if (!generatedRoutes) generatedRoutes = generateRoutes(filesPath, options);

        debug('Routes: %O', generatedRoutes);

        middlewareFilesPath = await getMiddlesPath(options);

        debug('MiddlewareFilesPath: %O', middlewareFilesPath);

        if (!generatedMiddleware)
          generatedMiddleware = generateMiddleware(middlewareFilesPath, options);

        const clientCode = generateClientCode(generatedRoutes, generatedMiddleware, options);

        // debug('Client code: %O', clientCode)

        return clientCode;
      }
    },
    async handleHotUpdate({ file, server, read }) {
      const extensionsRE = new RegExp(`\\.(${options.extensions.join('|')})$`);
      const pagesDir = options.dir;
      const pagesDirPath = options.pagesDirPath;
      const middlewareDir = options.middleware;
      const middlewareDirPath = options.middlewareDirPath;
      // Handle pages HMR
      if (
        (file.startsWith(pagesDirPath) || file.startsWith(middlewareDirPath)) &&
        extensionsRE.test(file)
      ) {
        let needReload = false;

        // HMR on new file created
        // Otherwise, handle HMR from custom block
        if (file.includes(pagesDir)) {
          if (!filesPath.includes(file.replace(`${pagesDirPath}/`, ''))) {
            generatedRoutes = null;
            needReload = true;
          } else if (generatedRoutes) {
            const content = await read();
            needReload = updateRouteFromHMR(content, file, generatedRoutes, options);
          }
        }

        if (file.includes(middlewareDir)) {
          if (!middlewareFilesPath.includes(file.replace(`${middlewareDirPath}/`, ''))) {
            generatedMiddleware = null;
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
