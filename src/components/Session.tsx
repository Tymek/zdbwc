import React, { FunctionComponent, ReactText } from 'react'
import moment from 'moment'

export type SessionProps = {
	name: ReactText,
	start?: ReactText,
	end?: ReactText,
}

const Session:FunctionComponent<SessionProps> = ({
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
