import moment from '.'

class Range {
	public start: moment.Moment

	public end: moment.Moment

	constructor(start: moment.MomentInput, end: moment.MomentInput) {
		const startMoment = moment(start)
		const endMoment = moment(end)

		if (startMoment.isBefore(endMoment)) {
			this.start = startMoment
			this.end = endMoment
		} else {
			this.start = endMoment
			this.end = startMoment
		}
	}

	public contains(time: moment.MomentInput): boolean {
		return this.start.isSameOrBefore(time) && this.end.isSameOrAfter(time)
	}

	public getDays(): Array<string> {
		const current = this.start.startOf('day')
		const days: Array<string> = []
		const add = () => days.push(current.format('YYYY-MM-DD'))

		while (current.isSameOrBefore(this.end)) {
			add()
			current.add(1, 'day')
		}

		return days
	}
}

export default Range
