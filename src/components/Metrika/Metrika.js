'use client';

import { useEffect } from 'react';
import Router from 'next/router';
import Script from 'next/script';


const YM_COUNTER_ID = 103842330 ;

export const Metrika = () => {

	const hit = (url) => {
		window.ym(YM_COUNTER_ID, 'hit', url);
	}

	useEffect(() => {
		hit(`${window.location.pathname}${window.location.search}`);
		Router.events.on('routeChangeComplete', hit);

		return () => Router.events.off('routeChangeComplete', hit);
	}, []);

	return (
		<Script id="yandex-metrika">
			{`
                (function(m,e,t,r,i,k,a){
                    m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}', 'ym');

                ym(${YM_COUNTER_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
			`}
		</Script>
	);
}