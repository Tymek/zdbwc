declare module 'ra-data-hasura-graphql' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const buildHasuraProvider: (options: any) => Promise<any>
	export default buildHasuraProvider
}
