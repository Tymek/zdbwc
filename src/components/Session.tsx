import moment from 'utils/moment'

export type SessionProps = {
	name: React.ReactText,
	start?: React.ReactText,
	end?: React.ReactText,
}

const Session: React.FunctionComponent<SessionProps> = ({
	name,
	start,
	end,
}) => (
	<div>
		<h2>{name}</h2>
		<p>
			{moment(start).format('LLLL')}
			{' '}
			&ndash;
			{' '}
			{moment(end).format('LLLL')}
		</p>
	</div>
)

export default Session
