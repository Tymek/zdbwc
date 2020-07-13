const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const options = {
	poweredByHeader: false,
	serverRuntimeConfig: {
		hasuraActionSecret: process.env.HASURA_ACTION_SECRET,
	},
	webpack(config) {
		config.devtool = 'eval-source-map'

		config.plugins = config.plugins || []
		config.plugins.push(
			new MomentLocalesPlugin({
				localesToKeep: ['en', 'pl'],
			}),
			new MomentTimezoneDataPlugin({
				startYear: 2020,
				matchCountries: ['PL'],
			})
		)

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

module.exports = withBundleAnalyzer(options)
