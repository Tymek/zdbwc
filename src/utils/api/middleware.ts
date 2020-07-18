import helmet from 'helmet'
import nc from 'next-connect'

const connect = nc()
connect.use(helmet())

export default connect
