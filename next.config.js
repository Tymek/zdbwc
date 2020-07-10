module.exports = {
	poweredByHeader: false,
	serverRuntimeConfig: {
		hasuraActionSecret: process.env.HASURA_ACTION_SECRET,
	},
	webpack(config) {
		// config.output = config.output || {}
		// config.devtool = 'eval-source-map'
		// config.output.devtoolModuleFilenameTemplate = function(info){
		// 	return 'file:///'+encodeURI(info.absoluteResourcePath)
		// }

		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		})

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
