
import handleResponse from '../handleResponse'

// const handleResponse = (res, statusMsg, code = 200) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.status(code)
//   return res.end(JSON.stringify(statusMsg))
// }

// export default handleResponse
let res

beforeEach(() => {
  res = {
    setHeader: jest.fn((name, value) => [name, value]),
    status: jest.fn(status => status),
    end: jest.fn(response => response),
  }
})

describe('utils/api/handleResponse', () => {
  it('sets content-type header', () => {
    handleResponse(res)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json')
  })

  it('sends default status', () => {
    handleResponse(res)

    expect(res.status).toHaveBeenCalledWith(200)
  })
})