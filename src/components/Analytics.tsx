const setDomains = '*.zdbwc.scrlk.pl'
const setSiteId = 4

const html = `
  var _paq = window._paq = window._paq || [];
  _paq.push(["setDomains", ["${setDomains}"]]);
  _paq.push(["disableCookies"]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.scrlk.pl/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '${setSiteId}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
`

const Analytics: React.FC = () => (process.env.NODE_ENV !== 'production' ? null : (
	<>
		<script
			dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
		/>
		<noscript>
			<p>
				<img src="//analytics.scrlk.pl/matomo.php?idsite=4&amp;rec=1" style={{ border: 0 }} alt="" />
			</p>
		</noscript>
	</>
))

export default Analytics
