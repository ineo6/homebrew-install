import { IApi } from 'dumi';

export default (api: IApi) => {
  api.describe({
    key: 'valine',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
  const { valine = {} } = api.userConfig;
  const { appId, appKey, el = '#vcomments' } = valine || {};
  api.logger.log('insert Valine');

  const valineScript = () => {
    return `
    (function(){
        var script = document.createElement('script');
        var m = document.getElementsByTagName('script')[0];
        script.src = '//unpkg.com/valine/dist/Valine.min.js';
        script.async = 'async';

        script.addEventListener('load', function () {
          new Valine({
              el: '${el}',
              appId: '${appId}',
              appKey: '${appKey}'
          })
        }, false);
    
        m.parentNode.insertBefore(script, m)
    })();
  `;
  };

  api.addHTMLScripts(() => [
    {
      content: valineScript(),
    },
  ]);
};
