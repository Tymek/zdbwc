import { render } from 'utils/test'

import Layout from '../Layout'

describe('/', () => {
	it('renders', () => {
		const result = render(<Layout />)

		expect(result).toBeTruthy()
	})
})
