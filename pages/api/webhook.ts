import passport from "../../utils/api/passport"
import { Middleware, runMiddleware } from '../../utils/api/middleware'

const handleResponse = (res, statusMsg, code:number = 200) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(code)
  return res.end(JSON.stringify(statusMsg))
}

const route:Middleware = async (req, res) => {
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
