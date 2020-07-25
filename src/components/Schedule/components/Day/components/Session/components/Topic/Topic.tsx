import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
			<aside className={isWorkshop ? 'secondary-location' : 'primary-location'}>
				{location}
			</aside>
			<div>
				<header className={isWorkshop ? 'workshop' : ''}>
					{
						hasDetails ? (
							<button className="dropdown" type="button" onClick={toggleCollapse}>
								<div className="dropdown-unfocus" tabIndex={-1}>
									<h4>{subject}</h4>
									<Toggle isOpen={isOpen} />
								</div>
							</button>
						) : <h4>{subject}</h4>
					}
				</header>
				<AnimatePresence initial={false}>
					{
						isOpen ? (
							<motion.main
								key="content"
								initial="collapsed"
								animate="open"
								exit="collapsed"
								variants={{
									open: { height: 'auto' },
									collapsed: { height: 0 },
								}}
								style={{ width: '100%', overflow: 'hidden' }}
							>
								{speaker && <Speaker>{speaker}</Speaker>}
								{description && <p className="description">{sierotki(description)}</p>}
								{!!(speaker || description) && <div className="main-padding" />}
							</motion.main>
						) : null
					}
				</AnimatePresence>
			</div>
			<style jsx>{`
				article {
					display: grid;
					margin: var(--border-weight) 0;
					grid-template-columns: 1fr 5fr;
				}

				aside {
					font-family: var(--font-family-mono);
					font-size: 0.875rem;
					padding: var(--spacing);
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
					justify-content: space-between;
					align-items: center;
					outline: none;
					padding: var(--spacing);
				}

				h4 {
					margin: 0;
				}

				.description {
					margin: 0;
					padding: var(--spacing);
					padding-top: 0;
				}

				.main-padding {
					height: 'calc(var(--spacing) * 2)' 
				}
			`}
			</style>
		</article>
	)
}

export default TopicComponent
