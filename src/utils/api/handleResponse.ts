import { NextApiResponse } from 'next'

const handleResponse = (res?: NextApiResponse, statusMsg: Record<string, unknown> = {}, code = 200): unknown => {
	if (res === undefined) {
		return
	}
	res.setHeader('Content-Type', 'application/json')
	res.status(code)
	res.end(JSON.stringify(statusMsg))
	return res
}

export default handleResponse
