module.exports = {
  getGuideSidebar: function () {
    return [
      { text: '介绍', link: '/zh/' },
      { text: '路由', link: '/zh/guide/router' },
      { text: '中间件', link: '/zh/guide/middleware' },
      { text: '布局', link: '/zh/guide/layouts' },
      { text: '全局组件', link: '/zh/guide/components' },
      { text: '全局 store', link: '/zh/guide/store' },
      { text: '插件', link: '/zh/guide/plugins' },
      { text: '多语言', link: '/zh/guide/locales' },
      { text: 'head 标签', link: '/zh/guide/head' },
    ];
  },

  getConfigSidebar: function () {
    return [
      {
        text: '配置',
        isGroup: true,
        children: [
          { text: 'page', link: '/zh/config/page' },
          { text: 'layout', link: '/zh/config/layout' },
          { text: 'component', link: '/zh/config/component' },
          { text: 'store', link: '/zh/config/store' },
          { text: 'plugin', link: '/zh/config/plugin' },
          { text: 'locale', link: '/zh/config/locale' },
          { text: 'head', link: '/zh/config/head' },
        ],
      },
      {
        text: '所有配置',
        link: '/zh/config/options',
      },
    ];
  },
};
