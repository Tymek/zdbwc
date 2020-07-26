import { motion, AnimatePresence } from 'framer-motion'

import Description from 'components/Description'
import Speaker from '../../Speaker'

type MainProps = {
	isOpen?: boolean,
	speaker?: string | null,
	description?: string | null,
}

const Main: React.FC<MainProps> = ({ isOpen, speaker, description }) => (
	<>
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
						{description && (
							<div className="description-wrapper">
								<Description>{description}</Description>
							</div>
						)}
						{!!(speaker || description) && <div className="main-padding" />}
					</motion.main>
				) : null
			}
		</AnimatePresence>
		<style jsx>{`
			.main-padding {
				height: calc(var(--spacing) * 1.5);
			}

			.description-wrapper {
				padding: 0 var(--spacing);
			}
		`}
		</style>
	</>
)

export default Main
