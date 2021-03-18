import { useEffect } from 'react';
import Valine from 'valine';

export function ValineComment({ location }) {
    const { pathname } = location;

    useEffect(() => {
        import('valine').then(Valine => {
            console.log(Valine)
            new Valine.default({
                el: '{{{ el }}}',
                appId: '{{{ appId }}}',
                appKey: '{{{ appKey }}}'
            })
        })
    }, [pathname])

    return (
        <div id="vcomments"/>
    )
}
