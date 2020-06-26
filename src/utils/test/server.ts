import { RequestHandler } from 'msw'
import { setupServer } from 'msw/node'
import noop from 'utils/test/noop'

const mockServer = <T, Y>(handlers: RequestHandler<T, Y>[]) => {
	const server = setupServer(...handlers)

	beforeAll(() => {
		server.listen()
	})

	afterEach(() => {
		server.resetHandlers()
	})

	afterAll(() => {
		server.close()
	})

	return server
}

export default (
	process.env.NODE_ENV === 'test' ?
		mockServer :
		noop
)
