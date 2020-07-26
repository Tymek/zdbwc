import { NextApiRequest } from 'next'
import db, { sql } from 'utils/api/database'
import { User, Mutation_RootLoginArgs } from 'ts/schema'
import { isEmpty } from 'ramda'
import { compare } from 'bcrypt'

const userFromCookies = async (req: NextApiRequest): Promise<User | null> => {
	if (!req.cookies?.TOKEN) {
		return null
	}

	const input = JSON.parse(req.cookies?.TOKEN)

	if (!input || isEmpty(input)) {
		return null
	}

	const { username, password } = input as Mutation_RootLoginArgs

	if (!username || !password) {
		return null
	}

	const data: User | null = await db.maybeOne(sql`
		SELECT id, password
		FROM public.user
		WHERE username = ${username}
	`)

	if (!data) {
		return null
	}

	const isPasswordCorrect = await compare(data.password, password)
	if (!isPasswordCorrect) {
		return null
	}

	return data
}

export default userFromCookies
