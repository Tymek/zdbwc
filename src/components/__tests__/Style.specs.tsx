import { render } from 'utils/test'

import Style from '../Style'

it('renders', () => {
	const result = render(<Style />)

	expect(result).toBeTruthy()
})
