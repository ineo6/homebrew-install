import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Homebrew',
  mode: 'site',
  logo: '/images/homebrew-256x256.png',
  favicon: '/favicon.ico',
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/ineo6/homebrew-install' },
  ],
  menus: {
    '/guide': [
      {
        title: '介 绍',
        children: ['/guide', '/guide/how-it-works', '/guide/start'],
      },
      {
        title: 'M1芯片 ',
        path: '/guide/m1/',
      },
      {
        title: 'FAQ',
        path: '/guide/faq/',
      },
    ],
  },
  analytics: {
    ga: 'G-K8PPBR74RE',
    baidu: 'be934bce3f81621badc0bb5b581ab622',
  },
  sitemap: {
    hostname: 'https://brew.idayer.com',
  },
  ssr: {
    // 更多配置
    // forceInitial: false,
    // removeWindowInitialProps: false
    // devServerRender: true,
    // mode: 'string',
    // staticMarkup: false,
  },
  exportStatic: {},
  // more config: https://d.umijs.org/config
});
