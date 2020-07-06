import { NextHandler } from 'next-connect'

export default jest.fn(() => (req: never, res: never, next: NextHandler) => next())
