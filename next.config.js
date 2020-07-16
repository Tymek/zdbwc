const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { version } = require('./package.json')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const options = {
	poweredByHeader: false,
	serverRuntimeConfig: {
		hasuraActionSecret: process.env.HASURA_ACTION_SECRET,
	},
	webpack(config, { isServer }) {
		config.devtool = process.env.NODE_ENV !== 'production' ? 'eval-source-map' : false

		config.plugins = config.plugins || []
		config.plugins.push(
			new MomentLocalesPlugin({
				localesToKeep: ['en', 'pl'],
			}),
			new MomentTimezoneDataPlugin({
				startYear: 2020,
				matchCountries: ['PL'],
			}),
			new DefinePlugin({
				'process.env.BUILD': Date.now(),
				'process.env.VERSION': version,
			})
		)

		if (!isServer) {
			config.plugins.push(
				new InjectManifest({
					swSrc: './src/service/sw.ts',
					swDest: '../public/generated/sw.js',
					modifyURLPrefix: {
						'/static/': '/_next/static/',
					},
					include: [
						/^static\//,
					],
					exclude: [
						/admin-panel/,
						new RegExp('^static/pages/panel(?:/|-)'),
					],
				})
			)
		}

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
