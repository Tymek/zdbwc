/* eslint-disable @typescript-eslint/unbound-method */
import ActionError from '../ActionError'

it('creates an Error', () => {
	expect(new ActionError('message')).toBeInstanceOf(Error)
	expect(() => {
		throw new ActionError('err', 0)
	}).toThrow('err')
})

it('stores message and code', () => {
	const error = new ActionError('text', 123)
	expect(error).toHaveProperty('message', 'text')
	expect(error).toHaveProperty('code', 123)
})

it('can be serialized', () => {
	expect(JSON.stringify(new ActionError('info'))).toStrictEqual('{"message":"info"}')
	expect(JSON.stringify(new ActionError('warning', 'code'))).toStrictEqual('{"message":"warning","code":"code"}')
	expect(JSON.stringify(new ActionError('error', 400))).toStrictEqual('{"message":"error","code":400}')
})

it('will call captureStackTrace', () => {
	const { captureStackTrace } = Error
	Error.captureStackTrace = jest.fn()
	// eslint-disable-next-line no-new
	new ActionError('test')

	expect(Error.captureStackTrace).toHaveBeenCalled()
	Error.captureStackTrace = captureStackTrace
})
