import { NextApiRequest, NextApiResponse } from 'next'
import nc, { NextConnect, RequestHandler } from 'next-connect'
import { pathOr } from 'ramda'
import middleware from './middleware'
import { ActionErrorType as OriginalActionErrorType } from './helpers/ActionError'

export * from 'next-connect'
export { default as ActionError } from './helpers/ActionError'
export type ActionErrorType = OriginalActionErrorType

export const onError = (err: ActionErrorType, req: NextApiRequest, res: NextApiResponse): void => {
	if (err.code && typeof err.code === 'number') {
		res.status(err.code)
		res.json(err)
	} else {
		res.status(400)
		res.json({ message: 'This request was bad 😦' })
	}
}

export const input = pathOr({}, ['body', 'input'])

export default <T, S>(handler?: RequestHandler<T, S>): NextConnect<NextApiRequest, NextApiResponse<T>> => {
	const connect = nc({
		onError,
	})

	connect.use(middleware)

	if (handler !== undefined) {
		connect.post(handler)
	}

	return connect
}
