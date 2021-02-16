import type { Plugin, ResolvedConfig } from 'vite';
import fs from 'fs';
import { resolve } from 'path';
import { debug, normalizePath, genarateHeadElements, genrateLoading } from './utils';
import { Options } from './types';

export default function HtmlPlugin(userOptions: Options = {}): Plugin {
  let config: ResolvedConfig | undefined;
  let options: Options = userOptions;
  let title: string;

  return {
    name: 'vite-plugin-html',
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
      options.root = config.root;
      if (options.head && options.head.title) {
        title = options.head.title;
      } else {
        const packageJson = JSON.parse(
          fs.readFileSync(normalizePath(resolve(config.root, 'package.json')), 'utf-8')
        );
        title = packageJson.name;
        debug('title', title);
      }
    },
    transformIndexHtml(html) {
      return html
        .replace(/<!-- TITLE -->/, title)
        .replace(/<!-- HEAD -->/, genarateHeadElements(options))
        .replace(/<!-- APP -->/, genrateLoading(options));
    },
  };
}
