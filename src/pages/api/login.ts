import middleware, { Handler, runMiddleware } from '../../utils/api/middleware'
import handleResponse from '../../utils/api/handleResponse';
import passport from '../../utils/api/passport';

type Authorization = {
  username:String | undefined,
  password:String | undefined,
}

const route:Handler = async (req, res) => {
  await middleware(req, res)

  const passportLogin = passport.authenticate('local', (error, user, info) => {
    if (error) {
      return handleResponse(res, { error }, 400)
    }

    if (user) {
      return handleResponse(res, user, 200)
    }

    return handleResponse(res, {}, 500)
  })

  // const errors = []
  // const { username, password }:Authorization = req.body

  // if (!username) {
  //   errors.push('`username` cannot be empty')
  // }
  // if (!password) {
  //   errors.push('`password` cannot be empty')
  // }

  // if (errors.length) {
  //   return handleResponse(res, { error: errors }, 400)
  // }

  return runMiddleware(req, res, passportLogin)
}

export default route
