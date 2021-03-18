import { IApi } from 'dumi';
import { join } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {
  const {
    paths,
    utils: { Mustache, winPath, lodash },
  } = api;

  api.describe({
    key: 'valine',
    config: {
      default: {
        el: '#vcomments',
        appId: '',
        appKey: '',
      },
      schema(joi) {
        return joi.object({
          el: joi.string(),
          appId: joi.string(),
          appKey: joi.string(),
        });
      },
    },
  });

  // 生成临时文件
  api.onGenerateFiles(async () => {
    // Comment.tsx
    const selectLang = readFileSync(join(__dirname, 'Comment.tpl'), 'utf-8');

    const { appId, appKey, el = '#vcomments' } = api.userConfig.valine;

    api.writeTmpFile({
      path: 'plugin-valine/Comment.tsx',
      content: Mustache.render(selectLang, {
        el: el,
        appId: appId,
        appKey: appKey,
      }),
    });
  });

  api.addUmiExports(() => {
    return {
      exportAll: true,
      source: `../plugin-valine/Comment`,
    };
  });
};
