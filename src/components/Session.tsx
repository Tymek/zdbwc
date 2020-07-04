import moment from 'utils/moment'
import { Session as SessionType } from 'ts/graphql'

const Session: React.FunctionComponent<SessionType> = ({
	name,
	start,
	end,
	speaker,
}) => (
	<div className="container">
		<h2>{name}</h2>
		<div className="content">
			{moment(start).format('LT')}
			&ndash;
			{moment(end).format('LT')}
			{ speaker && (<span><br />{speaker}</span>)}
		</div>
		<style jsx>{`
			.container {
				background: white;
				padding: 0.2rem 1rem 1rem;
				margin: 1rem 0;
				box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2);
			}

			h2 {
				font-size: 1.2rem;
				margin: 0.5rem 0;
			}
		`}
		</style>
	</div>
)

export default Session
