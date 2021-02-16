module.exports = {
  title: 'Convue',
  description: 'Convue docs website.',
  themeConfig: {
    nav: [
      { text: '指南', link: '/', activeMatch: '^/$|^/guide/' },
      { text: '配置', link: '/config/page', activeMatch: '^/config/' },
    ],
    sidebar: {
      '/guide/': getGuideSidebar(),
      '/config/': getConfigSidebar(),
      '/': getGuideSidebar()
    },
  },
};

function getGuideSidebar() {
  return [
    { text: '介绍', link: '/' },
    { text: '路由', link: '/guide/router' },
    { text: '中间件', link: '/guide/middleware' },
    { text: '布局', link: '/guide/layouts' },
    { text: '组件', link: '/guide/components' },
    { text: '状态', link: '/guide/store' },
    { text: '插件', link: '/guide/plugins' },
    { text: '多语言', link: '/guide/locales' },
    { text: 'head 标签', link: '/guide/head' },
  ]
}

function getConfigSidebar() {
  return [
    { text: '页面配置', link: '/config/page' },
    { text: '布局', link: '/config/layout' },
    { text: '组件', link: '/config/component' },
    { text: '状态', link: '/config/store' },
    { text: '插件', link: '/config/plugin' },
    { text: '多语言', link: '/config/locale' },
    { text: 'head 标签', link: '/config/head' },
    { text: '其他配置', link: '/config/basics' },
  ]
}
