import { useState } from 'react'
import { Topic } from 'ts/schema'
import { sierotki } from 'utils/typografia'
import Toggle from 'components/Toggle'
import Speaker from '../Speaker'

const TopicComponent: React.FC<Topic & { isWorkshop?: boolean }> = ({
	subject,
	description,
	speaker,
	location,
	isWorkshop,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const hasDetails = !!(description || speaker)
	const toggleCollapse = () => {
		setIsOpen(hasDetails && !isOpen)
	}

	return (
		<article>
			<aside>
				{location}
			</aside>
			<div>
				<header className={isWorkshop ? 'workshop' : ''}>
					{
						hasDetails ? (
							<button className="dropdown" type="button" onClick={toggleCollapse}>
								<h4>{subject}</h4>
								<Toggle isOpen={isOpen} />
							</button>
						) : <h4>{subject}</h4>
					}
				</header>
				{
					isOpen ? (
						<main>
							{speaker && <Speaker>{speaker}</Speaker>}
							{description && <p className="description">{sierotki(description)}</p>}
						</main>
					) : null
				}
			</div>
			<style jsx>{`
				article {
					display: grid;
					margin: var(--border-weight) 0;
					grid-template-columns: 1fr 5fr;
				}

				aside {
					font-family: var(--font-family-mono);
					color: var(--primary);
					font-size: 0.875rem;
					padding: var(--spacing);
				}

				header {
					font-weight: var(--font-weight-bold);
					background: var(--primary);
					color: var(--white);
					flex-grow: 1;
				}

				.workshop {
					background: var(--secondary);
				}

				.dropdown {
					all: inherit;
					display: flex;
					justify-content: space-between;
					align-items: center;
					cursor: pointer;
					width: 100%;
				}

				h4 {
					margin: 0;
					padding: var(--spacing);
				}

				main {
					width: 100%;
					padding-bottom: calc(var(--spacing) * 2);
				}

				.description {
					margin: 0;
					padding: var(--spacing);
					padding-top: 0;
				}
			`}
			</style>
		</article>
	)
}

export default TopicComponent
