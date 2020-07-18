import { render } from 'utils/test'

import GlobalStyle from 'components/styles/Global'

it('renders', () => {
	const result = render(<GlobalStyle />)

	expect(result).toBeTruthy()
})
