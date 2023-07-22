import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Homebrew',
  mode: 'site',
  logo: '/images/homebrew-256x256.png',
  favicon: '/favicon.ico',
  locales: [['zh-CN', '中文']],
  metas: [
    {
      name: 'keywords',
      content: 'Mac,Homebrew,macOS',
    },
    {
      name: 'description',
      content:
        'Homebrew是一款包管理工具，目前支持macOS和linux系统。主要有四个部分组成: brew、homebrew-core 、homebrew-cask、homebrew-bottles。本文主要介绍 Homebrew安装方式以及如何加速访问，顺便普及一些必要的知识。…',
    },
    {
      property: 'og:title',
      content: '镜像快速安装Homebrew教程',
    },
    {
      property: 'og:url',
      content: 'https://brew.idayer.com/',
    },
    {
      property: 'og:description',
      content:
        'Homebrew是一款包管理工具，目前支持macOS和linux系统。主要有四个部分组成: brew、homebrew-core 、homebrew-cask、homebrew-bottles。本文主要介绍 Homebrew安装方式以及如何加速访问，顺便普及一些必要的知识。…',
    },
    {
      property: 'og:image',
      content: 'https://brew.idayer.com/images/homebrew-256x256.png',
    },
    {
      property: 'og:site_name',
      content: 'Homebrew安装教程 - 镜像',
    },
  ],
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/ineo6/homebrew-install' },
    { title: 'GitMaster', path: 'https://github.com/ineo6/git-master' },
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
