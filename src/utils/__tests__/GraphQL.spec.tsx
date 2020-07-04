import React, { FunctionComponent } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { graphql } from 'msw'
import server from 'utils/test/mockServer'

import { render, waitFor, screen } from 'utils/test'
import { Provider as GraphQLProvider } from '../GraphQL'

type ItemType = {
	id: string | number
}

interface ItemsData {
	items: ItemType[];
}

const GET_ITEMS = gql`
	query GetItems {
		items {
		id
		}
	}
`

const handlers = [
	graphql.query('GetItems', (req, res, ctx) => res(
		ctx.data({
			items: [
				{
					id: 1,
				},
			],
		})
	)),
]

server(handlers)

it("renders on it's own", () => {
	const output = render(<GraphQLProvider pageProps={{}} />)

	expect(output).toBeInstanceOf(Object)
})

it('loads queries', async () => {
	const MockQueryComponent: React.FunctionComponent = () => {
		const { error, data } = useQuery<ItemsData>(GET_ITEMS)

		if (error) {
			return <>{JSON.stringify(error)}</>
		}
		return <>{JSON.stringify(data)}</>
	}

	const output = render(
		<GraphQLProvider pageProps={{}}>
			<MockQueryComponent />
		</GraphQLProvider>
	)

	await waitFor(() => screen.getByText('{"items":[{"id":1}]}'))

	expect(output).toBeInstanceOf(Object)
})
