import { useState } from 'react'

import { Topic } from 'ts/schema'
import { sierotki } from 'utils/typografia'
import Toggle from 'components/Toggle'
import Main from './components/Main'

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
			<aside className={isWorkshop ? 'secondary-location' : 'primary-location'}>
				{location}
			</aside>
			<div className="content">
				<header className={isWorkshop ? 'workshop' : ''}>
					{
						hasDetails ? (
							<button className="dropdown" type="button" onClick={toggleCollapse}>
								<div className="dropdown-unfocus" tabIndex={-1}>
									<h4 className={isOpen ? 'open' : 'closed'}>{subject && sierotki(subject)}</h4>
									<Toggle isOpen={isOpen} />
								</div>
							</button>
						) : <h4>{subject && sierotki(subject)}</h4>
					}
				</header>
				<Main {...{ isOpen, speaker, description }} />
			</div>
			<style jsx>{`
				article {
					display: grid;
					margin: var(--border-weight) 0;
					grid-template-columns: minmax(70px, 16.6666667%) minmax(0px, auto);
				}

				aside {
					font-family: var(--font-family-mono);
					font-size: 0.875rem;
					padding: var(--spacing);
					height: 0;
				}

				.content {
					max-width: 100%;
				}

				.primary-location {
					color: var(--primary);
				}

				.secondary-location {
					color: var(--secondary);
				}

				header {
					font-weight: var(--font-weight-bold);
					background: var(--primary);
					color: var(--white);
					flex-grow: 1;
					max-width: 100%;
				}

				.workshop {
					background: var(--secondary);
				}

				.dropdown {
					color: var(--white);
					width: 100%;
				}

				.dropdown:focus {
					outline-style: auto;
					outline-width: 0.125rem;
					outline-color: var(--dark);
				}

				.dropdown-unfocus {
					display: flex;
					/* justify-content: space-between; */
					align-items: center;
					outline: none;
					padding: var(--spacing);
					width: 100%;
				}

				h4 {
					margin: 0;
					margin-right: auto;
					padding-right: var(--spacing);

					/* ? */
					/* display: inline; */
				}

				h4.closed {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			`}
			</style>
		</article>
	)
}

export default TopicComponent
