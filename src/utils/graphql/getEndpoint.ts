const getEndpoint = (scope: typeof window | ServiceWorkerGlobalScope): string => {
	const isLocalhost = scope.location.hostname === 'localhost'
	return isLocalhost
		? `http://${scope.location.hostname}:8080/v1/graphql`
		: `https://api.${scope.location.hostname}/v1/graphql`
}

export default getEndpoint
