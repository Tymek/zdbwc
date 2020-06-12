import helmet from 'helmet'
import morgan from 'morgan'
import handler from '../handler'

export default () => handler(helmet(), morgan('combined'))
