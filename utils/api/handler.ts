import { NextApiRequest, NextApiResponse } from 'next'
import {
  isEmpty,
  head,
  tail,
} from 'ramda'

export type Middleware = (req?: NextApiRequest, res?: NextApiResponse, next?: Middleware) => Promise<any>

/**
 * Wrapper for composing middleware in Next
 * @example handler(cors, log, func)
 */
const handler = (...funcs: Array<Middleware>) =>
  async (req?: NextApiRequest, res?: NextApiResponse) => {
    const next = tail(funcs)

    if (!isEmpty(next)) {
      return head(funcs)(
        req,
        res,
        () => handler(...next)(req, res)
      )
    }

    head(funcs)(req, res)
  }

export default handler
