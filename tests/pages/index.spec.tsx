/* eslint-disable unicorn/consistent-function-scoping */
import { render } from 'utils/test'

import Index from 'pages'

jest.mock('utils/graphql')
jest.mock('components/Schedule/ListOfDays', () => ({
	__esModule: true,
	default: () => <></>,
	queries: [],
}))
jest.mock('components/Notifications', () => ({
	__esModule: true,
	default: () => <></>,
	queries: [],
}))

it('loads', () => {
	const result = render(<Index />)

	expect(result).toBeTruthy()
})
