/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextApiRequest, NextApiResponse } from 'next'
import helmet from 'helmet'
import morgan from 'morgan'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = (req?: NextApiRequest, res?: NextApiResponse, next?: Handler) => Promise<any>

// ExpressJS-like compatibility layer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const runMiddleware = (
  req?: NextApiRequest,
  res?: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fn?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): unknown => new Promise((resolve, reject) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  fn(req, res, (result: unknown) => {
    if (result instanceof Error) {
      return reject(result)
    }

    return resolve(result)
  })
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const morganMiddleware = morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined')
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const helmetMiddleware = helmet()

const route:Handler = async (req, res) => {
  await runMiddleware(req, res, morganMiddleware)
  await runMiddleware(req, res, helmetMiddleware)
}

export default route
