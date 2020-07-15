/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react-hooks'
import useOffline from 'utils/hooks/useOffline'

it('returns `false` in SSR', () => {
	(global.window as any) = undefined
	const { result } = renderHook(() => useOffline({ polling: false }))

	expect(result.current).toBe(false)
})

it('is using online/offline event listeners', () => {
	const addEventListenerMock = jest.fn()
	global.window.addEventListener = addEventListenerMock

	const { result } = renderHook(() => useOffline({ polling: false }))
	const relevant = addEventListenerMock.mock.calls.filter(call => ['online', 'offline'].includes(call[0]))
	expect(relevant).toHaveLength(2)

	const setOnline = relevant.find(call => call[0] === 'online')[1]
	const setOffline = relevant.find(call => call[0] === 'offline')[1]

	// eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-return
	act(setOffline)
	expect(result.current).toBe(true)
	// eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-return
	act(setOnline)
	expect(result.current).toBe(false)
})
