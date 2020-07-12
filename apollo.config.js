module.exports = {
	client: {
		includes: ['./src/**/*.{js,jsx,ts,tsx,gql,graphql}'],
		service: {
			name: 'zdbwc',
			url: 'http://localhost:8080/v1/graphql',
			headers: {
				'x-hasura-admin-secret': '0',
			},
			skipSSLValidation: true,
		},
	},
}
