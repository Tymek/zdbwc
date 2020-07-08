import moment from 'utils/moment'
import { Session as SessionType } from 'generated/schema'
import { sierotki } from 'utils/typografia'

const Session: React.FunctionComponent<SessionType> = ({
	name,
	start,
	end,
	speaker,
}) => (
	<div className="container">
		<h2>{sierotki(name)}</h2>
		<div className="content">
			{moment(start).format('LT')}
			&ndash;
			{moment(end).format('LT')}
			{ speaker && (<div className="speaker">{speaker}</div>)}
		</div>
		<style jsx>{`
			.container {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				color: var(--black);
				background: var(--white);
				padding: calc(var(--spacing) / 4) var(--spacing);
				box-shadow: var(--box-shadow);
				border-radius: var(--border-radius);
				hyphens: auto;
				overflow: hidden;
			}

			h2 {
				font-size: 1rem;
				margin: 0.5rem 0 0.2rem;
				flex-grow: 1;
				color: var(--accent);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.speaker {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		`}
		</style>
	</div>
)

export default Session
