import { NextApiResponse } from 'next'

/**
 * @deprecated use utils/api/connect
 */
const handleResponse = (
	res?: NextApiResponse,
	statusMsg: string | Record<string, unknown> = {},
	code = 200
): unknown => {
	if (res === undefined) {
		return res
	}

	res.setHeader('Content-Type', 'application/json')
	res.status(code)
	res.json(statusMsg)

	return res
}

export default handleResponse
