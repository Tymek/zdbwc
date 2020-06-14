import { isEmpty } from 'ramda'
import middleware, { Handler, runMiddleware } from '../../utils/api/middleware'
import handleResponse from '../../utils/api/handleResponse'
import passport from '../../utils/api/passport'

type Authorization = {
  username:string | undefined,
  password:string | undefined,
}

const route:Handler = async (req, res) => {
  await middleware(req, res)

  const passportLogin = passport.authenticate('local', (error, user, info) => {
    if (error) {
      return handleResponse(res, isEmpty(info) ? { error } : { error, info }, 400)
    }

    if (!user || isEmpty(user)) {
      if (isEmpty(info)) {
        return handleResponse(res, { message: 'Bad request' }, 400)
      }

      return handleResponse(res, info, 401)
    }

    return handleResponse(res, { ...user, password: undefined }, 200)
  })

  return runMiddleware(req, res, passportLogin)
}

export default route
