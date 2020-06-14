import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, screen } from '@testing-library/react'
import Index from '..'

test('loads and displays greeting', async () => {
  render(<Index />)

  await waitFor(() => screen.getByRole('main'))

  expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
})
