import passport from '../../utils/api/passport'
import { Handler, runMiddleware } from '../../utils/api/middleware'
import handleResponse from '../../utils/api/handleResponse'

const route:Handler = async (req, res) => {
  const passportBearerToken = passport.authenticate('bearer', (error, user, info) => {
    if (error) {
      return handleResponse(res, { error }, 401)
    }

    if (user) {
      handleResponse(res, {
        'X-Hasura-Role': 'user',
        'X-Hasura-User-Id': `${user.id}`
      })
    } else {
      handleResponse(res, {'X-Hasura-Role': 'anonymous'})
    }
  })

  try {
    return await runMiddleware(req, res, passportBearerToken)
  } catch (error) {
    return handleResponse(res, { error }, 500)
  }
}

export default route
