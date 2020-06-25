/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import handleResponse from '../handleResponse'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let res: any = {
  setHeader: jest.fn((name, value) => [name, value]),
  status: jest.fn(status => status),
  end: jest.fn(response => response),
}

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