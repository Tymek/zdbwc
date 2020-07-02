jest.mock('utils/api/database')

import database from 'utils/api/database'
import { DatabasePoolType } from 'slonik'

const mock = (database as DatabasePoolType & { mock: jest.Mock }).mock

export default mock
