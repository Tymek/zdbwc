import React from 'react'
import { render, waitFor, screen } from 'utils/test'
import Providers from '..'

describe('utils/providers', () => {
	it('renders', async () => {
		render(
			<Providers>
				<div role="heading" aria-level={0}>Hello world!</div>
			</Providers>
		)

		await waitFor(() => screen.getByRole('heading'))
		expect(screen.getByRole('heading')).toHaveTextContent('Hello world!')
	})
})
