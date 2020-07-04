import { render } from 'utils/test'

import Layout from 'components/Layout'

it('renders', () => {
	const result = render(<Layout />)

	expect(result).toBeTruthy()
})
