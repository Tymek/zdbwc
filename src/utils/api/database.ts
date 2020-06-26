import {
	createPool,
	DatabasePoolType,
} from 'slonik'

const databaseUrl:string = process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres:5432/postgres'

const pool: DatabasePoolType = createPool(databaseUrl)

export default pool
