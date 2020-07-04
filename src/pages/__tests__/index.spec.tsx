import { render } from 'utils/test'

import Index from '..'

jest.mock('utils/GraphQL')
jest.mock('components/ListOfDays', () => () => <></>)

it('loads and displays greeting', () => {
	const result = render(<Index />)

	expect(result).toBeTruthy()
})
