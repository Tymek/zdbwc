import { compare, hash } from 'bcrypt'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import connect, { ActionError, RequestHandler } from 'utils/api/connect'
import input from 'utils/api/helpers/input'
import { UserInfo, Mutation_RootLoginArgs, User } from 'generated/schema'
import db, { sql } from 'utils/api/database'
import moment from 'utils/moment'

const serializeCookie = (data: Mutation_RootLoginArgs): string => serialize('TOKEN', JSON.stringify(data), {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	expires: moment().add(7, 'days').toDate(),
})

export const handler: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
	const args = input(req)
	const { username, password } = args as Mutation_RootLoginArgs

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

	const cookie = serializeCookie({ username, password: await hash(data.password, 10) })
	res.setHeader('Set-Cookie', cookie)

	const userInfo: UserInfo = { id: data.id, username: data.username }

	res.json(userInfo)
}

export default connect(handler)
