import { Handler } from 'utils/api/middleware'
import handleResponse from 'utils/api/helpers/handleResponse'

// const getCookies: Handler = async () => {
// 	return await Promise.resolve()
// }

const route:Handler = async (req, res) =>
	Promise.resolve(handleResponse(res, { 'X-Hasura-Role': 'anonymous' }))
//   if (error) {
//     return handleResponse(res, { error }, 401)
//   }

//   if (user) {
//     return handleResponse(res, {
//       'X-Hasura-Role': 'user',
//       'X-Hasura-User-Id': `${user.id}`,
//     })
//   }

// })

// try {

// } catch (error) {
// await runMiddleware(req, res, getCookies)
// return handleResponse(res, {}, 500)
// }

export default route
