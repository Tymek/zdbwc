import handler, { Middleware } from '../handler'
import { NextApiRequest, NextApiResponse } from 'next'
jest.mock('next')

describe('utils/api/handler', () => {
  it('handles single function', () => {
    // @ts-ignore
    const req: NextApiRequest = {}
    // @ts-ignore
    const res: NextApiResponse = {}

    const a = jest.fn()

    expect(
      handler(a)
    ).toBeInstanceOf(Function)

    handler(a)(req, res)
 
    expect(a).toHaveBeenCalledTimes(1)
    expect(a).toHaveBeenCalledWith(req, res)
  })

  it('handles subsequent middleware', async () => {
    // @ts-ignore
    const req: NextApiRequest = {}
    // @ts-ignore
    const res: NextApiResponse = {}

    expect.assertions(7)

    const a = jest.fn()
    const b = jest.fn((a, b, next) => next())
    const c = jest.fn()

    expect(
      handler(a, b, c)
    ).toBeInstanceOf(Function)

    handler(a, b, c)(req, res)
    
    expect(a).toHaveBeenCalledTimes(1)
    expect(b).not.toHaveBeenCalled()
    expect(c).not.toHaveBeenCalled()

    await handler(b, c)(req, res)
    expect(b).toHaveBeenCalled()
    expect(c).toHaveBeenCalled()
    expect(c).toHaveBeenCalledWith(req, res)
  })


  it('allows to mutate arguments', async () => {
    // @ts-ignore
    const req: NextApiRequest = {}
    // @ts-ignore
    const res: NextApiResponse = {}

    expect.assertions(1)
    
    // @ts-ignore
    const a: Middleware = jest.fn((a, b, next) => {
      // @ts-ignore
      a.value = 0
      // @ts-ignore
      b.value = 1
      
      next()
    })

    const b = jest.fn()

    await handler(a, b)(req, res)
    expect(b).toHaveBeenCalledWith({ value: 0}, { value: 1})
  })

  it('is composable', async () => {
    // @ts-ignore
    const req: NextApiRequest = {}
    // @ts-ignore
    const res: NextApiResponse = {}

    expect.assertions(1)

    const a = jest.fn()

    await handler(handler(a))(req, res)
    expect(a).toHaveBeenCalled()
  })
})
