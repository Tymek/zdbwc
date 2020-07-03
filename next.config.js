module.exports = {
	poweredByHeader: false,
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
