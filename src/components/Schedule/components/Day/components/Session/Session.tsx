import { Session } from 'ts/schema'
import Topic from './components/Topic'
import Header from './components/Header'
import Speaker from './components/Speaker'

const SessionComponent: React.FC<Session> = ({ name, topics, speaker, begins_at, ends_at }) => {
	const isWorkshop = !!name && [
		/warsztaty?/i,
		/panele?/u,
		/debat[ay]/u,
	].some(expr => expr.test(name))

	return (
		<section>
			<header>
				<Header
					name={name}
					begins_at={begins_at}
					ends_at={ends_at}
					speaker={speaker}
				/>
			</header>
			<main>
				{ topics.map(props => <Topic key={props.id} {...props} isWorkshop={isWorkshop} />) }
				{ speaker && <div className="spacing"><Speaker equal>{speaker}</Speaker></div>}
			</main>
			<style jsx>{`
					section {
						display: flex;
						flex-direction: column;
						width: 100%;
					}

					.name {
						display: block;
						padding: var(--spacing);
					}

					.spacing {
						margin-top: calc(var(--spacing) * -1);
						padding-bottom: calc(var(--spacing) * 1.5);
					}
				`}
			</style>
		</section>
	)
}

export default SessionComponent
