const getEndpoint = (hostname: string): string => {
	const isLocalhost = hostname === 'localhost' || hostname.startsWith('192.168.')

	return isLocalhost
		? `http://${hostname}:8080/v1/graphql`
		: 'https://api.zdbwc.scrlk.pl/v1/graphql'
}

export default getEndpoint
