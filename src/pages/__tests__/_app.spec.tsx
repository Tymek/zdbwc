import { render, mocked, waitFor, screen } from 'utils/test'
import Head from 'next/head'

import MyApp from '../_app'

jest.mock('next/head')
const mockedHead = mocked(Head)

describe('app', () => {
	it('renders with head', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const App = MyApp as any
		const Component = () => (<div>Test</div>)
		render(<App Component={Component} pageProps={{}} />)

		await waitFor(() => screen.getByText('Test'))

		expect(mockedHead).toHaveBeenCalledTimes(1)
	})
})
