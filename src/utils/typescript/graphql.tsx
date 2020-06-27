/* eslint-disable import/export */
import { User } from 'generated/graphql'
export * from 'generated/graphql'

interface FixedUser extends User {
	id: string,
}

export type { FixedUser as User }
