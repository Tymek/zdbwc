import * as React from 'react'
import { render as customRender } from 'utils/test'
// import Providers from 'utils/providers'
import { waitFor, screen } from '@testing-library/react'
// import { render, RenderOptions, RenderResult } from '@testing-library/react'

import Index from '..'

// const customRender = (
//   ui: React.ReactElement,
//   options?: Omit<RenderOptions, 'queries'>
// ): RenderResult => render(ui, { wrapper: Providers as React.ComponentType, ...options })


// import Head from 'next/head'
// import { FunctionComponent } from 'react'

// jest.mock('next/head')
// Head.mockImplementation(() => (<></>))
// const mockedHead = Head as jest.Mock<>
// jest.mock('next/head')
// jest.mock('next/head', () => ({
//   __esModule: true,
//   default: jest.fn(() => null)
// }))
// jest.mock('next/head')
// Head.mockResolvedValue(null)
// jest.mock('next/head', () => null))

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// mockedHead.mockImplementation(jest.fn(() => (<></>)))

test('loads and displays greeting', async () => {
  customRender(<Index />)

  await waitFor(() => screen.getByRole('main'))

  // expect(Head).toHaveBeenCalledTimes(1)
  // expect(Head.mock.calls[0]).toMatchSnapshot()
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
})
