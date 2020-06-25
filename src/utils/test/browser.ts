import { setupWorker, RequestHandler } from 'msw'
import noop from 'utils/noop'

const mockServiceWorker = async <T, Y>(handlers: RequestHandler<T, Y>[]) => {
	if (process.env.NODE_ENV === 'test') {
		const worker = setupWorker(...handlers)

		await worker.start()
	}
}

export default (
	process.env.NODE_ENV === 'test' ?
		mockServiceWorker :
		noop
)
