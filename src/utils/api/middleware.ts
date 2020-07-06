import helmet from 'helmet'
import morgan from 'morgan'
import nc from 'next-connect'

const connect = nc()
connect.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
connect.use(helmet())

export default connect
