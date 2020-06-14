import { createPool } from 'slonik'

const databaseUrl:String = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres'

const pool = createPool(databaseUrl)

export default pool
