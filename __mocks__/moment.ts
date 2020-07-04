// eslint-disable-next-line @typescript-eslint/no-explicit-any
const momentMock: any = jest.requireActual('moment')

Date.now = () => new Date('2020-07-01T10:10:00Z').getTime()

module.exports = momentMock
