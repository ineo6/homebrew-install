import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Homebrew 中文网',
  mode: 'site',
  logo: '/images/homebrew-256x256.png',
  define: {
    'AVALON_SERVER': process.env.NODE_ENV === 'production' ? 'https://avalon.idayer.com' : 'http://localhost:8000',
  },
  favicon: '/favicon.ico',
  locales: [['zh-CN', '中文']],
  metas: [],
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/ineo6/homebrew-install' },
    { title: 'GitMaster', path: 'https://github.com/ineo6/git-master' },
    { title: '我的博客', path: 'https://idayer.com' },
  ],
  menus: {
    '/guide': [
      {
        title: '介 绍',
        children: ['/guide/index', '/guide/how-it-works', '/guide/start'],
      },
      {
        title: '相 关',
        children: ['/guide/github'],
      },
      {
        title: '工 具',
        children: ['/guide/change-source'],
      },
      {
        title: 'M1芯片',
        path: '/guide/m1/',
      },
      {
        title: 'FAQ',
        path: '/guide/faq/',
      },
    ],
    '/install': [
      {
        title: '快系列-你快了吗',
        children: ['/install/stable-diffusion-webui', '/install/nvm-for-nodejs', '/install/game-porting-toolkit'],
      }
    ],
    '/app': [
      {
        title: 'App',
        children: ['/app/homebrew'],
      },
      {
        title: 'Detail',
        children: ['/app/detail'],
      }
    ],
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  analytics: {
    ga: 'G-QHRH8YZXHT',
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
