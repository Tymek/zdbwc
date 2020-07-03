import { render, waitFor, screen } from 'utils/test'

import Index from '..'

jest.mock('next/head')

describe('/', () => {
	it('loads and displays greeting', async () => {
		render(<Index />)

		await waitFor(() => screen.getByRole('main'))

		expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
	})
})
