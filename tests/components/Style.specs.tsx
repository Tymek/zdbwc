import { render } from 'utils/test'

import Style from 'components/Style'

it('renders', () => {
	const result = render(<Style />)

	expect(result).toBeTruthy()
})
