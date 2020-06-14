import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieSession from 'express-session'
import passport from './passport'

interface ApiResonse extends NextApiResponse {
  redirect?(location: string): void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = (req?: NextApiRequest, res?: ApiResonse, next?: Handler) => any | Promise<any>

export const runMiddleware: Handler = (req, res, fn) => new Promise((resolve, reject) => {
  fn(req, res, result => {
    if (result instanceof Error) {
      return reject(result)
    }

    return resolve(result)
  })
})

const morganMiddleware = morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined')
const helmetMiddleware = helmet()

const cookieSessionMiddleware = cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET || crypto.randomBytes(64).toString('hex'),
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24h
    secure: process.env.NODE_ENV === 'production',
  },
})

const route:Handler = async (req, res) => {
  if (!res.redirect) { // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
    res.redirect = (location: string) => {
      res.statusCode = 302
      res.setHeader('Location', location)
      return res.end()
    }
  }

  await runMiddleware(req, res, cookieSessionMiddleware)
  await runMiddleware(req, res, morganMiddleware)
  await runMiddleware(req, res, helmetMiddleware)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())
  // await runMiddleware(req, res, passport.session())
}

export default route
