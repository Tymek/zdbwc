import * as React from 'react'
import { render, mocked, waitFor, screen } from 'utils/test'
// import Providers from 'utils/providers'
import Head from 'next/head'

import Index from '..'

jest.mock('next/head')
const mockedHead = mocked(Head)

describe('pages/index', () => {
	it('loads and displays greeting', async () => {
		render(<Index />)

		await waitFor(() => screen.getByRole('main'))

		expect(mockedHead).toHaveBeenCalledTimes(1)
		expect(mockedHead.mock.calls[0]).toMatchSnapshot()
		expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
	})
})
