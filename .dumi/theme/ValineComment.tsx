import { useEffect } from 'react';

export default function ValineComment({ location }) {
  const { pathname } = location;

  useEffect(() => {
    import('valine').then(Valine => {
      new Valine.default({
        el: '#vcomments',
        appId: 'Ke6Uq74Gi6sdTxcDu4nJ6sdw-MdYXbMMI',
        appKey: 'VtFD26towQ1JQxB9tLHd8odg',
        path: pathname,
      });
    });
  }, [pathname]);

  return <div id="vcomments" />;
}
