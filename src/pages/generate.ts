import * as fs from 'fs';
import deepEqual from 'deep-equal';
import { Route, ResolvedOptions } from './types';
import { debug, isDynamicRoute } from './utils';
import { stringifyRoutes } from './stringify';
import { tryParseCustomBlock, parseSFC } from './parseSfc';

function prepareRoutes(routes: Route[], options: ResolvedOptions, parent?: Route) {
  for (const route of routes) {
    if (route.name) route.name = route.name.replace(/-index$/, '');

    if (parent) route.path = route.path.replace(/^\//, '').replace(/\?$/, '');

    route.props = true;

    if (route.children) {
      delete route.name;
      route.children = prepareRoutes(route.children, options, route);
    }

    if (typeof options.extendRoute === 'function')
      Object.assign(route, options.extendRoute(route, parent) || {});
  }
  return routes;
}

function findRouteByFilename(routes: Route[], filename: string): Route | undefined {
  let result = routes.find((x) => filename.endsWith(x.component));
  if (result === undefined) {
    for (const route of routes) {
      if (route.children !== undefined) result = findRouteByFilename(route.children, filename);
      if (result) break;
    }
  }
  return result;
}

export function generateRoutes(filesPath: string[], options: ResolvedOptions): Route[] {
  const { dir, pagesDirPath, extensions } = options;
  const extensionsRE = new RegExp(`\\.(${extensions.join('|')})$`);

  const routes: Route[] = [];

  for (const filePath of filesPath) {
    const resolvedPath = filePath.replace(extensionsRE, '');
    const pathNodes = resolvedPath.split('/');

    const component = `/${dir}/${filePath}`;

    const route: Route = {
      name: '',
      path: '',
      component,
    };

    let parentRoutes = routes;

    for (let i = 0; i < pathNodes.length; i++) {
      const node = pathNodes[i];
      const isDynamic = isDynamicRoute(node);
      const isLastOne = i === pathNodes.length - 1;
      const normalizedPart = (isDynamic
        ? node.replace(/^\[(\.{3})?/, '').replace(/\]$/, '')
        : node
      ).toLowerCase();

      route.name += route.name ? `-${normalizedPart}` : normalizedPart;

      // Check nested route
      const parent = parentRoutes.find((node) => node.name === route.name);

      if (parent) {
        parent.children = parent.children || [];
        parentRoutes = parent.children;
        route.path = '';
      } else if (normalizedPart === 'index' && !route.path) {
        route.path += '/';
      } else if (normalizedPart !== 'index') {
        if (isDynamic) {
          route.path += `/:${normalizedPart}`;
          // Catch-all route
          if (/^\[\.{3}/.test(node)) route.path += '(.*)';
          else if (isLastOne) route.path += '?';
        } else {
          route.path += `/${normalizedPart}`;
        }
      }
    }

    const content = fs.readFileSync(`${pagesDirPath}/${filePath}`, 'utf8');
    const parsed = parseSFC(content);
    const routeBlock = parsed.customBlocks.find((b) => b.type === 'route');

    if (routeBlock) Object.assign(route, tryParseCustomBlock(routeBlock, filePath, options));

    parentRoutes.push(route);
  }

  // const notFount: Route = {
  //   name: '',
  //   path: '',
  //   component: `/${pagesDir}/404`,
  // };

  // routes.push(notFount);

  const preparedRoutes = prepareRoutes(routes, options);

  return preparedRoutes;
}

export function generateMiddleware(filesPath: string[], options: ResolvedOptions) {
  const { middlewareDirPath } = options;

  const middlewares: any[] = [];

  for (const filePath of filesPath) {
    const filePaths = filePath.split('/');
    let name = 'middleware_';

    for (const path of filePaths) {
      name += path;
    }

    name = name.split('.')[0];

    middlewares.push({
      imports: `import ${name} from '${middlewareDirPath}/${filePath}'`,
      name,
    });
  }

  return middlewares;
}

export function genarateHeadElements(head: any) {
  let headElements: string[] = [];
  if (head && head.meta) {
    const metaTags = head.meta.map((item: Record<string, string>) => {
      const meta: any = document.createElement('meta');
      Object.keys(item).forEach(key => {
        meta[key] = item[key];
      });
      return meta;
    });
    headElements = [...headElements, ...metaTags];
  }
  if (head && head.link) {
    const linkTags = head.link.map((item: Record<string, string>) => {
      const link: any = document.createElement('link');
      Object.keys(item).forEach(key => {
        link[key] = item[key];
      });
      return link;
    });
    headElements = [...headElements, ...linkTags];
  }
  return headElements;
}

export function generateClientCode(routes: Route[], middlewares: any[], options: ResolvedOptions) {
  const { imports, stringRoutes } = stringifyRoutes(routes, options);
  const { router, progress } = options;

  return `
    import { createRouter, ${
      router.history === 'hash' ? 'createWebHashHistory' : 'createWebHistory'
    } } from 'vue-router';
    ${progress && `import NProgress from 'nprogress';\nimport 'nprogress/nprogress.css';`}

    ${imports.join('\n')}
    ${middlewares.map((n) => n.imports).join('\n')}
    import { setupLayouts } from 'layouts-generated';
    import store from 'store-generated';

    const routes = setupLayouts(${stringRoutes});
    const router = createRouter({
      history: ${router.history === 'hash' ? 'createWebHashHistory' : 'createWebHistory'}(),
      ${router.scrollBehavior},
      routes,
    });

    router.beforeEach((to, from, next) => {
      ${progress && 'NProgress.start();'}
      const redirect = (path) => {
        next({ path });
      }
      const allPaths = routes.map(n => n.path);
      if (!allPaths.includes(to.path)) {
        if (allPaths.includes('/404')) {
          redirect('/404');
        } else {
          redirect('/');
        }
      }
      if (to.path !== '/404') {
        ${middlewares
          .map((n) => n.name)
          .join(
            '({ query: to.query, params: to.params, route: to, redirect, store, app: window.__APP__, env: import.meta.env });'
          )}({ query: to.query, params: to.params, route: to, redirect, store, app: window.__APP__, env: import.meta.env });
      }

      const head = to.meta.head;
      if (head && head.meta) {
        const metaTags = head.meta.forEach((item) => {
          const meta = document.createElement('meta');
          Object.keys(item).forEach(key => {
            meta[key] = item[key];
          });
          document.head.appendChild(meta);
        });
      }
      if (head && head.link) {
        const linkTags = head.link.forEach((item) => {
          const link = document.createElement('link');
          Object.keys(item).forEach(key => {
            link[key] = item[key];
          });
          document.head.appendChild(link);
        });
      }
      next();
    });

    router.afterEach((to, from) => {
      ${progress && 'NProgress.done();'}
    });

    export default router;
  `;
}

export function updateRouteFromHMR(
  content: string,
  filename: string,
  routes: Route[],
  options: ResolvedOptions
): boolean {
  const parsed = parseSFC(content);
  const routeBlock = parsed.customBlocks.find((b) => b.type === 'route');
  if (routeBlock) {
    const route = findRouteByFilename(routes, filename);

    if (route) {
      const before = Object.assign({}, route);
      const customBlockContent = tryParseCustomBlock(routeBlock, filename, options);
      debug('Custom Block: %O', customBlockContent);
      Object.assign(route, customBlockContent);
      return !deepEqual(before, route);
    }
  }
  return false;
}
