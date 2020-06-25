import {
	createPool,
	DatabaseConfigurationType,
	ClientConfigurationInputType,
	DatabasePoolType,
} from 'slonik'

const databaseUrl:string = process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres:5432/postgres'

export type createPoolType = (
	connectionConfiguration: DatabaseConfigurationType,
	clientUserConfiguration?: ClientConfigurationInputType,
) => DatabasePoolType

const pool:createPoolType = (connectionConfiguration, clientUserConfiguration) =>
	createPool(connectionConfiguration = databaseUrl, clientUserConfiguration)

export default pool
