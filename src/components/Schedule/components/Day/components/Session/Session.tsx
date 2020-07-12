import { useState } from 'react'
import { Session } from 'ts/schema'

const SessionComponent: React.FC<Session> = ({ id, name, topics }) => {
	const [isOpen, setIsOpen] = useState(false)
	const hasTopics = topics && topics.length > 0
	const onOpen = () => {
		setIsOpen(hasTopics && !isOpen)
	}

	return (
		<div>
			<h2>
				{
					hasTopics
						? <button className="toggle" type="button" onClick={onOpen}>{name}</button>
						: name
				}
			</h2>
			{ isOpen ? (
				<pre>{JSON.stringify(topics, null, 2)}</pre>
			) : null}
			<hr />
			<style jsx>{`
				h2 {
					font-size: inherit;
					font-weight: var(--font-weight-bold);
					background: var(--primary);
				}

				.toggle {
					all: inherit;
					cursor: pointer;
				}

				.toggle::after {
					content: '>';
				}
			`}
			</style>
		</div>
	)
}

export default SessionComponent
