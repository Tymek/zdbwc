import { NextApiResponse } from 'next'

const handleResponse = (res: NextApiResponse, statusMsg: object = {}, code = 200): NextApiResponse => {
  res.setHeader('Content-Type', 'application/json')
  res.status(code)
  res.end(JSON.stringify(statusMsg))
  return res
}

export default handleResponse
