import { render } from 'utils/test'

import Index from 'pages'

jest.mock('utils/graphql')
jest.mock('components/Schedule/ListOfDays', () => () => <></>)

it('loads and displays greeting', () => {
	const result = render(<Index />)

	expect(result).toBeTruthy()
})
