import nc, { NextConnect, RequestHandler } from 'next-connect'
import middleware from './middleware'

export default (handler?: RequestHandler): NextConnect => {
	const connect = nc()

	connect.use(middleware)

	if (handler !== undefined) {
		connect.get(handler)
	}

	return connect
}
