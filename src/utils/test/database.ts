import database from 'utils/api/database'
import { DatabasePoolType } from 'slonik'

jest.mock('utils/api/database')

const { mock } = database as DatabasePoolType & { mock: jest.Mock }

export default mock
