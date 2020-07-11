import moment from '.'

class TimeRange {
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

	public overlaps(range: TimeRange): boolean {
		return (
			range.contains(this.start) || range.contains(this.end)
		) || (
			this.contains(range.start) || this.contains(range.end)
		)
	}

	public duration(): moment.Duration {
		return moment.duration(this.end.diff(this.start))
	}
}

export default TimeRange
