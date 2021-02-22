module.exports = {
  getEnGuideSidebar: function () {
    return [
      { text: 'Introduction', link: '/' },
      { text: 'Router', link: '/guide/router' },
      { text: 'Middleware', link: '/guide/middleware' },
      { text: 'Layout', link: '/guide/layouts' },
      { text: 'Global Components', link: '/guide/components' },
      { text: 'Global store', link: '/guide/store' },
      { text: 'Plugins', link: '/guide/plugins' },
      { text: 'Locales', link: '/guide/locales' },
      { text: 'Head Tag', link: '/guide/head' },
    ];
  },

  getEnConfigSidebar: function () {
    return [
      {
        text: 'Configuration',
        isGroup: true,
        children: [
          { text: 'page', link: '/config/page' },
          { text: 'layout', link: '/config/layout' },
          { text: 'component', link: '/config/component' },
          { text: 'store', link: '/config/store' },
          { text: 'plugin', link: '/config/plugin' },
          { text: 'locale', link: '/config/locale' },
          { text: 'head', link: '/config/head' },
        ],
      },
      {
        text: 'All Configuration',
        link: '/config/options',
      },
    ];
  },
};
