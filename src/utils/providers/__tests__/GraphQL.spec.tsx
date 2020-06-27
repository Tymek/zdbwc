import React, { FunctionComponent } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { graphql } from 'msw'
import server from 'utils/test/mockServer'

import { render, waitFor, screen } from 'utils/test'
import GraphQL from '../GraphQL'

type itemType = {
	id: string | number
}

interface ItemsData {
	items: itemType[];
}

const GET_ITEMS = gql`
	query GetItems {
		items {
		id
		}
	}
`

const handlers = [
	graphql.query('GetItems', (req, res, ctx) => {
		return res(
			ctx.data({
				items: [
					{
						id: 1,
					},
				],
			})
		)
	}),
]

server(handlers)

describe('utils/providers/GraphQL', () => {
	it("renders on it's own", () => {
		const output = render(<GraphQL />)

		expect(output).toBeInstanceOf(Object)
	})

	it('loads queries', async () => {
		const MockQueryComponent: FunctionComponent = () => {
			const { error, data } = useQuery<ItemsData>(GET_ITEMS)

			if (error) {
				return <>{JSON.stringify(error)}</>
			}
			return <>{JSON.stringify(data)}</>
		}

		const output = render(
			<GraphQL>
				<MockQueryComponent />
			</GraphQL>
		)

		await waitFor(() => screen.getByText('{"items":[{"id":1}]}'))

		expect(output).toBeInstanceOf(Object)
	})
})
