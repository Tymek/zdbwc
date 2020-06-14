import { NextApiRequest, NextApiResponse } from 'next'
import helmet from 'helmet'
import morgan from 'morgan'

export type Handler = (req?: NextApiRequest, res?: NextApiResponse, next?: Handler) => any | Promise<any>

export const runMiddleware: Handler = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })

const morganMiddleware = morgan(process.env.NODE_ENV !== 'production' ? 'dev': 'combined')
const helmetMiddleware = helmet()

const route = async (req, res) => {
  await runMiddleware(req, res, morganMiddleware)
  await runMiddleware(req, res, helmetMiddleware)
}

export default route
