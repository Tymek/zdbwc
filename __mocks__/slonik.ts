import { DatabasePoolType as OriginalDatabasePoolType } from 'slonik'

export * from 'slonik'
export type DatabasePoolType = OriginalDatabasePoolType & { mock: jest.Mock }
