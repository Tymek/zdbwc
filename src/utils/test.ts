import * as React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import Providers from './providers'

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Providers as React.ComponentType, ...options })

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { customRender as render }
