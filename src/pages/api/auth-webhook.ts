import { Handler } from '../../utils/api/middleware'
import handleResponse from '../../utils/api/handleResponse'

// const getCookies: Handler = async () => {
// 	return await Promise.resolve()
// }

const route:Handler = async (req, res) => {
	//   if (error) {
	//     return handleResponse(res, { error }, 401)
	//   }

	//   if (user) {
	//     return handleResponse(res, {
	//       'X-Hasura-Role': 'user',
	//       'X-Hasura-User-Id': `${user.id}`,
	//     })
	//   }

	return await handleResponse(res, { 'X-Hasura-Role': 'anonymous' })
	// })

	// try {

	// } catch (error) {
	// await runMiddleware(req, res, getCookies)
	// return handleResponse(res, {}, 500)
	// }
}

export default route
