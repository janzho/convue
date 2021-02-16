import vue from '@vitejs/plugin-vue';
import Pages from './pages';
import Layouts from './layouts';
import Components from './components';
import Store from './store';
import Html from './html';
import Plugin from './plugins';
import Locale from './locales';
import { Options } from './types';

const convue = (options: Options) => {
  return [
    vue({
      ssr: options.ssr,
    }),
    Pages({
      ...options.page,
      progress: options.progress || options.progress === false ? options.progress : true,
    }),
    Layouts(options.layout),
    Components(options.component),
    Store(options.store),
    Html({
      head: options.head,
      loading: options.loading,
      progress: options.progress || options.progress === false ? options.progress : true,
    }),
    Plugin(options.plugin),
    Locale(options.locale),
  ];
};

export default convue;
