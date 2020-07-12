import type * as schema from 'generated/schema'

export * from 'generated/schema'

export type Session = schema.Session & {
	is_open?: boolean
}
