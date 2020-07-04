import moment from 'moment'
import Range from '../Range'

it('can be created', () => {
	const start = new Date(2020, 7, 7)
	const end = new Date(2020, 7, 9)
	const range = new Range(start, end)

	expect(range.start).toEqual(moment(start))
	expect(range.end).toEqual(moment(end))
})

it('will reverse parameters if end before start', () => {
	const start = new Date(2020, 7, 9)
	const end = new Date(2020, 7, 7)
	const range = new Range(start, end)

	expect(range.start).toEqual(moment(end))
	expect(range.end).toEqual(moment(start))
})

describe('contains', () => {
	it('returns true if in range', () => {
		const range = new Range(new Date(2020, 7, 9), new Date(2020, 7, 7))

		expect(range.contains(new Date(2020, 7, 8))).toEqual(true)
	})

	it('returns false if out of range', () => {
		const range = new Range(new Date(2020, 7, 9), new Date(2020, 7, 7))

		expect(range.contains(new Date(2020, 7, 1))).toEqual(false)
		expect(range.contains(new Date(2020, 7, 10))).toEqual(false)
	})

	it('includes edge values', () => {
		const range = new Range(new Date(2020, 7, 9), new Date(2020, 7, 7))

		expect(range.contains(new Date(2020, 7, 7))).toEqual(true)
		expect(range.contains(new Date(2020, 7, 9))).toEqual(true)
	})
})

describe('getDays', () => {
	it('returns one day if range starts and ends during the same day', () => {
		expect(new Range('2020-07-01', '2020-07-01').getDays()).toEqual(['2020-07-01'])
		expect(new Range('2020-07-07 15:30', '2020-07-07 18:00').getDays()).toEqual(['2020-07-07'])
	})

	it('returns two days for start and end date', () => {
		expect(new Range('2020-07-01', '2020-07-02').getDays()).toEqual(['2020-07-01', '2020-07-02'])
		expect(new Range('2020-07-07 15:30', '2020-07-08 18:00').getDays()).toEqual(['2020-07-07', '2020-07-08'])
	})

	it('returns a set of days in range', () => {
		expect(new Range('2020-06-29', '2020-07-02').getDays())
			.toEqual(['2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02'])

		expect(new Range('2020-12-31 15:30', '2021-01-02 23:59').getDays())
			.toEqual(['2020-12-31', '2021-01-01', '2021-01-02'])
	})
})
