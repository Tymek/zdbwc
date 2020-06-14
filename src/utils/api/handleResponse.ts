const handleResponse = (res, statusMsg, code: number = 200) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(code);
  return res.end(JSON.stringify(statusMsg))
}

export default handleResponse
