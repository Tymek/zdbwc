import { NextApiRequest, NextApiResponse } from 'next'
import helmet from 'helmet'
import morgan from 'morgan'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = (req?: NextApiRequest, res?: NextApiResponse, next?: Handler) => Promise<any> | void

// ExpressJS-like compatibility layer
export const runMiddleware = (
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Handler
): Promise<unknown> => new Promise((resolve, reject) => {
	const next = (result: unknown) => {
		if (result instanceof Error) {
			reject(result)
		} else {
			resolve(result)
		}
	}

	Promise.resolve(
		fn(req, res, next)
	).then(resolve).catch(reject)
})

const morganMiddleware = morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined')
const helmetMiddleware = helmet()

const route = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	await runMiddleware(req, res, (morganMiddleware as unknown) as Handler)
	await runMiddleware(req, res, (helmetMiddleware as unknown) as Handler)
}

export default route
