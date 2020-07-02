import { NextApiRequest, NextApiResponse } from 'next'
import nc, { NextConnect, NextHandler } from 'next-connect'
import middleware from './middleware'
import { ActionErrorType as OriginalActionErrorType } from './helpers/ActionError'
import { pathOr } from 'ramda'

export const onError = (err: ActionErrorType, req: NextApiRequest, res: NextApiResponse): void => {
	if (err.code && typeof err.code === 'number') {
		res.status(err.code)
		res.json(err)
	} else {
		res.status(400)
		res.json({ message: 'unknown error'})
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionHandler = (input: any, req?: NextApiRequest) => Promise<any>

/**
 * Adapter for a handler serving Hasura action to Next API
 */
export const action = (handler: ActionHandler) => async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const input = pathOr({}, ['body', 'input'], req)
	res.json(await handler(input, req))
}

type RequestHandler<T, S> = (req: T, res: S, next: NextHandler) => void | Promise<void>
export default <T, S>(handler?: RequestHandler<T, S>): NextConnect<NextApiRequest, NextApiResponse> => {
	const connect = nc({
		onError,
	})

	connect.use(middleware)

	if (handler !== undefined) {
		connect.get(handler)
	}

	return connect
}

export { default as ActionError } from './helpers/ActionError'
export type ActionErrorType = OriginalActionErrorType
