/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// export const runMiddleware = jest.genMockFromModule('../middleware').runMiddleware
const middleware = jest.genMockFromModule('../middleware') as any

export const { runMiddleware } = middleware

const route = jest.fn(() => Promise.resolve())

export default route
