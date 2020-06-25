// import bcrypt from 'bcrypt'
import middleware, { Handler } from 'utils/api/middleware'
import handleResponse from 'utils/api/handleResponse'
// import handler from '../../utils/api/handler'

const route:Handler = async (req, res) => {
  await middleware(req, res)

  handleResponse(res, { status: 'OK' })
}

export default route

// let hash = bcrypt.hashSync('0', 10)
// bcrypt.compare('somePassword', hash, function(err, res) {
//   if(res) {
//    // Passwords match
//   } else {
//    // Passwords don't match
//   }
// })
