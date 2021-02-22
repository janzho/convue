const sidebar = require('./sidebar/zh');
const sidebar_en = require('./sidebar/en');

const { getGuideSidebar, getConfigSidebar } = sidebar;
const { getEnGuideSidebar, getEnConfigSidebar } = sidebar_en;

module.exports = {
  base: '/convue/',
  title: 'Convue',
  editLinks: true,
  locales: {
    '/zh': {
      lang: 'zh-CN',
      title: 'Convue',
      description:
        'a plugin for vite based on vite and vue3 that gives you a set of experiences for rapid development projects',
    },
    '/': {
      lang: 'en-US',
      title: 'Convue',
      description:
        'a plugin for vite based on vite and vue3 that gives you a set of experiences for rapid development projects',
    },
  },
  themeConfig: {
    repo: 'ziping-li/convue',
    editLinks: true,
    locales: {
      '/zh': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/guide/': getGuideSidebar(),
          '/config/': getConfigSidebar(),
          '/': getGuideSidebar(),
        },
      },
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': getEnGuideSidebar(),
          '/config/': getEnConfigSidebar(),
          '/': getEnGuideSidebar(),
        },
      },
    },
  },
};
