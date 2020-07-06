module.exports = {
	poweredByHeader: false,
	serverRuntimeConfig: {
		hasuraActionSecret: process.env.HASURA_ACTION_SECRET,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.[jt]sx?$/,
			},
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						titleProp: true,
						ref: true,
						memo: true,
					},
				},
			],
		})

		return config
	},
}
