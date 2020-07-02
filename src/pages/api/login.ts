import { sql } from 'slonik'

import db from 'utils/api/database'

import { UserInfo, Mutation_RootLoginArgs, User } from 'utils/ts/graphql'
import connect, { action, ActionError } from 'utils/api/connect'

export const handler = async ({ username, password }: Mutation_RootLoginArgs): Promise<UserInfo> => {
	const result: User | null = await db.maybeOne(sql`
		SELECT *
		FROM public.user
		WHERE username = ${username}
	`)

	if (!result) {
		throw new ActionError('Username not found', 400)
	}

	const { id, password: userPassword } = result
	// const { id, password: userPassword } = result as { id: string, password: User['password'] }

	console.info(userPassword)

	return {
		id,
		username,
	}
}

export default connect(action(handler))
