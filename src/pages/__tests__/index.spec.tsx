// import { Provider } from 'utils/GraphQL'
import { render } from 'utils/test'

import Index from '..'

jest.mock('utils/GraphQL')
jest.mock('components/SessionList', () => () => <></>)

// jest.mock('next/head')

it('loads and displays greeting', () => {
	const result = render(<Index />)

	expect(result).toBeTruthy()
})
