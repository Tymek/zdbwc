// import bcrypt from 'bcrypt'
import middleware, { Handler } from 'utils/api/middleware'
import handleResponse from 'utils/api/handleResponse'

const route:Handler = async (req, res) => {
	await middleware(req, res)

	handleResponse(res, { status: 'OK' })
}

export default route
