import { compare, hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

import connect, { ActionError, RequestHandler } from 'utils/api/connect'
import input from 'utils/api/helpers/input'
import { UserInfo, Mutation_RootLoginArgs, User } from 'generated/schema'
import db, { sql } from 'utils/api/database'
import createLoginCookie from 'utils/api/helpers/createLoginCookie'

export const handler: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
	const { username, password } = input<Mutation_RootLoginArgs>(req)

	const data: User | null = await db.maybeOne(sql`
		SELECT *
		FROM public.user
		WHERE username = ${username}
	`)

	if (!data) {
		throw new ActionError('Username not found', 401)
	}

	const isPasswordCorrect = await compare(password, data.password)
	if (!isPasswordCorrect) {
		throw new ActionError('Incorrect password', 401)
	}

	const cookie = createLoginCookie({ username, password: await hash(data.password, 10) })
	res.setHeader('Set-Cookie', cookie)

	const userInfo: UserInfo = { id: data.id, username: data.username }

	res.json(userInfo)
}

export default connect(handler)
