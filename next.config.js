const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { version } = require('./package.json')

const options = {
	poweredByHeader: false,
	serverRuntimeConfig: {
		hasuraActionSecret: process.env.HASURA_ACTION_SECRET,
		analyticsSecret: process.env.ANALYTICS_SECRET,
	},
	webpack(config, { isServer }) {
		const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
		const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
		const { InjectManifest } = require('workbox-webpack-plugin')
		const { DefinePlugin } = require('webpack')

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
				'process.env.BUILD': JSON.stringify(Date.now()),
				'process.env.VERSION': JSON.stringify(version),
				'process.env.DEBUG': JSON.stringify(process.env.DEBUG), // verbose
			})
		)

		if (!isServer && process.env.NODE_ENV === 'production') {
			const additionalManifestEntries = []
			const revision = file => crypto
				.createHash('md5')
				.update(fs.readFileSync(
					path.resolve('./public' + file),
					'utf8'
				))
				.digest('hex')

			const files = [
				'/static/config/pwa.webmanifest',
				'/static/images/logo.svg',
				...fs.readdirSync('./public/static/fonts', 'utf-8').map(file => '/static/fonts/' + file),
			]

			files.forEach(url => {
				additionalManifestEntries.push({
					url,
					revision: revision(url),
				})
			})

			config.plugins.push(
				new InjectManifest({
					mode: process.env.DEBUG === 'true' ? 'development' : 'production',
					swSrc: './src/service/worker.ts',
					swDest: '../public/sw.js',
					modifyURLPrefix: {
						'static/': '/_next/static/',
					},
					include: [
						/^static\//,
					],
					exclude: [
						/admin-panel/,
						new RegExp('^static/pages/panel(?:/|-)'),
					],
					additionalManifestEntries,
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

module.exports = process.env.ANALYZE === 'true' ? (() => {
	const withBundleAnalyzer = require('@next/bundle-analyzer')({})
	return withBundleAnalyzer(options)
})() : options
