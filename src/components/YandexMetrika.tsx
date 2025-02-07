'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

export default function YandexMetrika() {
	const pathname = usePathname()

	useEffect(() => {
		if ((window as any).ym) {
			(window as any).ym('99804159', 'hit', pathname)
		}
	}, [pathname])

	return (
		<>
			<Script
				id='yandex-metrika'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
						(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
						m[i].l=1*new Date();
						for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
						k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
						(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

						ym(99804159, "init", {
									clickmap:true,
									trackLinks:true,
									accurateTrackBounce:true,
									webvisor:true
						});
					`
				}}
			/>
			<noscript>
				<div>
					<img
						src={`https://mc.yandex.ru/watch/99804159`}
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript>
		</>
	)
}
