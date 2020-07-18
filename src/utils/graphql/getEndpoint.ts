const getEndpoint = (hostname: string): string => {
	const isLocalhost = hostname === 'localhost'
	return isLocalhost
		? `http://${hostname}:8080/v1/graphql`
		: `https://api.${hostname}/v1/graphql`
}

export default getEndpoint
