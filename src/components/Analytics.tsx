/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'

const siteId = process.env.NEXT_PUBLIC_ANALYTICS_ID || '4'

const html = `
  var _paq = window._paq = window._paq || [];
  _paq.push(["setDomains", ["${process.env.NEXT_PUBLIC_ANALYTICS_DOMAINS || '*.zdbwc.scrlk.pl'}"]]);
  _paq.push(["disableCookies"]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.scrlk.pl/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '${siteId}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
`

const appendDisplayMode = () => {
	let displayMode = 'browser'

	if ((navigator as unknown as { standalone: boolean }).standalone) {
		displayMode = 'standalone-ios'
	}

	if (window.matchMedia('(display-mode: standalone)').matches) {
		displayMode = 'standalone'
	}

	if (!window._paq) window._paq = []
	window._paq.push(['setCustomVariable',
		1,
		'displayMode',
		displayMode,
		'visit',
	])
}

const Analytics: React.FC = () => {
	useEffect(() => {
		if (document.readyState === 'complete'
			|| (document.readyState as string) === 'loaded'
			|| document.readyState === 'interactive'
		) {
			appendDisplayMode()
		} else {
			window.addEventListener('DOMContentLoaded', appendDisplayMode, false)
		}
	}, [])

	return (process.env.NODE_ENV !== 'production' ? null : (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
			/>
			<noscript>
				<p>
					<img src={`//analytics.scrlk.pl/matomo.php?idsite=${siteId}&amp;rec=1`} style={{ border: 0 }} alt="" />
				</p>
			</noscript>
		</>
	))
}

export default Analytics
