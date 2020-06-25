module.exports = {
	client: {
		includes: ['./pages/**/*.{js,jsx,gql,graphql}'],
		service: {
			name: 'refest',
			url: 'http://localhost:8080/v1/graphql',
			headers: {
				'x-hasura-admin-secret': '0',
			},
		},
	},
}
