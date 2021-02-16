import Debug from 'debug';
import { Options } from './types';

export function normalizePath(str: string): string {
  return str.replace(/\\/g, '/');
}

export const debug = Debug('vite-plugin-html');

export function genarateHeadElements(options: Options): string {
  let headElements: string[] = [];
  if (options.head && options.head.meta) {
    const metaTags = options.head.meta.map((item: Record<string, string>) => {
      return `<meta ${Object.keys(item)
        .map((key: string) => {
          return `${key}="${item[key]}"`;
        })
        .join(' ')}>`;
    });
    headElements = [...headElements, ...metaTags];
  }
  if (options.head && options.head.link) {
    const linkTags = options.head.link.map((item: Record<string, string>) => {
      return `<link ${Object.keys(item)
        .map((key: string) => {
          return `${key}="${item[key]}"`;
        })
        .join(' ')}>`;
    });
    headElements = [...headElements, ...linkTags];
  }
  let styleTag = '';
  if (options.progress) {
    styleTag = `\n<style>
        #nprogress .bar {
          background: ${
            typeof options.progress !== 'boolean' && options.progress.color
              ? options.progress.color
              : '#1890ff'
          } !important;
          height: ${
            typeof options.progress !== 'boolean' && options.progress.size
              ? options.progress.size
              : '2px'
          } !important;
        }
        #nprogress .spinner-icon {
          border-top-color: ${
            typeof options.progress !== 'boolean' && options.progress.color
              ? options.progress.color
              : '#1890ff'
          } !important;
          border-left-color: ${
            typeof options.progress !== 'boolean' && options.progress.color
              ? options.progress.color
              : '#1890ff'
          } !important;
        }
      </style>`;
  }
  return headElements.join('\n') + styleTag;
}

export function genrateLoading(options: Options): string {
  return `
    <div id="app">
      <style>
        .loader,
        .loader:after {
          border-radius: 50%;
          width: 10em;
          height: 10em;
        }
        .loader {
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -5em;
          margin-left: -5em;
          font-size: 10px;
          text-indent: -9999em;
          border-top: 10px solid rgba(33,102,192, 0.2);
          border-right: 10px solid rgba(33,102,192, 0.2);
          border-bottom: 10px solid rgba(33,102,192, 0.2);
          border-left: 10px solid ${options.loading || '#1890ff'};
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 1.1s infinite linear;
          animation: load8 1.1s infinite linear;
        }
        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="loader"></div>
    </div>
  `;
}
