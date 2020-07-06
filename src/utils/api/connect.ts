import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import nc, { NextConnect, RequestHandler, Middleware } from 'next-connect'
import { timingSafeEqual } from 'crypto'

import middleware from './middleware'
import ActionError, { ActionErrorType as OriginalActionErrorType } from './helpers/ActionError'

export * from 'next-connect'
export { default as ActionError } from './helpers/ActionError'
export type ActionErrorType = OriginalActionErrorType

const actionSecret: string | undefined = (
	getConfig() as Record<string, Record<string, string>>
)?.serverRuntimeConfig?.hasuraActionSecret

export const onError = (err: ActionErrorType, req: NextApiRequest, res: NextApiResponse): void => {
	if (err.code && typeof err.code === 'number') {
		res.status(err.code)
		res.json(err)
	} else {
		res.status(400)
		res.json({ message: 'Bad request' })
	}
}

export const verifyActionSecret: Middleware<NextApiRequest, NextApiResponse> = (req, res, next) => {
	if (actionSecret && req.headers['x-hasura-action-secret'] && timingSafeEqual(
		Buffer.from(req.headers['x-hasura-action-secret']),
		Buffer.from(actionSecret)
	)) {
		next()
	} else {
		throw new ActionError('Forbidden', 403)
	}
}

const connect = <T, S>(
	handler?: RequestHandler<T, S>,
	options?: {
		verify?: boolean,
		middleware?: boolean,
	}
): NextConnect<NextApiRequest, NextApiResponse<T>> => {
	const app = nc({
		onError,
	})

	if (options?.middleware === undefined || options?.middleware) {
		app.use(middleware)
	}

	if (options?.verify || (options?.verify === undefined && handler)) {
		app.use(verifyActionSecret)
	}

	if (handler !== undefined) {
		app.post(handler)
	}

	return app
}

export default connect
