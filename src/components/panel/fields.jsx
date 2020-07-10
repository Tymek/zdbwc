import moment from 'utils/moment'

export const RelativeTimeField = ({ record, source, emptyText = '' }) => (
	<span>{
		record[source]
			? moment(record[source]).fromNow()
			: emptyText
	}</span>
)

export const DateTimeField = ({ record, source, emptyText = '' }) => (
	<span>{
		record[source]
			? moment(record[source]).format('dddd, HH:mm')
			: emptyText
	}</span>
)

export const TimeField = ({ record, source, emptyText = '' }) => (
	<span>{
		record[source]
			? moment(record[source]).format('HH:mm')
			: emptyText
	}</span>
)
