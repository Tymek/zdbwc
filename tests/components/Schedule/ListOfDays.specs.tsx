import { MockedProvider } from '@apollo/client/testing'
import { render } from 'utils/test'

import ListOfDays, { QUERY } from 'components/Schedule/ListOfDays'

const mocks = [
	{
		request: {
			query: QUERY,
			variables: {
				name: 'Buck',
			},
		},
		result: {
			data: {
				session: [
					{
						id: 'f8f00599-a0c7-4d16-a70a-f057ec455600',
						end: '2020-08-18T07:45:00+00:00',
						start: '2020-08-18T07:00:00+00:00',
					},
					{
						id: 'e2c501e2-5c67-4dbe-80c2-d51b65aca0e7',
						end: '2020-08-18T08:40:00+00:00',
						start: '2020-08-18T08:00:00+00:00',
					},
					{
						id: '1d523860-e3dc-4cb4-82f9-4700bdcbbb43',
						end: '2020-08-18T09:45:00+00:00',
						start: '2020-08-18T08:45:00+00:00',
					},
					{
						id: '140017d1-f004-45f7-b6d9-1b2eef4da552',
						end: '2020-08-18T09:45:00+00:00',
						start: '2020-08-18T08:45:00+00:00',
					},
					{
						id: 'dc34ac2e-ee59-4a99-b28d-69f1e9ef4e1c',
						end: '2020-08-18T09:45:00+00:00',
						start: '2020-08-18T08:45:00+00:00',
					},
				],
			},
		},
	},
]

it('renders', () => {
	const result = render(
		<MockedProvider mocks={mocks}>
			<ListOfDays />
		</MockedProvider>
	)

	expect(result).toBeTruthy()
})
