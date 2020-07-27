import { Notification } from 'ts/schema'
import moment from 'utils/moment'
import Description from 'components/Description'
import { motion } from 'framer-motion'

const NotificationComponent: React.FC<Partial<Notification> & { head?: boolean }> = ({
	id,
	title,
	content,
	published_at,
	head,
	children,
}) => {
	const format = (str: string) => moment(published_at).format(str)

	return (
		<motion.div
			key={id}
			initial="collapsed"
			animate="open"
			exit="collapsed"
			variants={{
				open: { height: 'auto' },
				collapsed: { height: 0 },
			}}
			style={{ overflow: 'hidden', borderRight: 'calc(1rem / 16) solid transparent' }}
			transition={{ type: 'spring', mass: 2, damping: 50, stiffness: 150, staggerChildren: 0.05 }}
		>
			<article>
				<aside>
					<div className="date">
						<strong>
							<time dateTime={format('YYYY-MM-DD')}>{format('D.MM')}</time>
						</strong>
						<time>{format('HH:mm')}</time>
					</div>
				</aside>
				<main className={head ? '' : 'muted'}>
					<header>
						<h3>{title}</h3>
					</header>
					{
						content && <Description>{content}</Description>
					}
					{children}
				</main>
				<style jsx>{`
					article {
						display: grid;
						margin: var(--border-weight) 0;
						grid-template-columns: minmax(70px, 16.6666667%) minmax(0px, auto);
					}

					aside {
						padding: var(--spacing);
						font-family: var(--font-family-mono);
						display: flex;
						text-align: center;
						color: var(--gray);
					}

					aside strong, main h3 {
						display: block;
						font-weight: var(--font-weight-bold);
						font-family: var(--font-family);
						font-size: inherit;
						margin-bottom: var(--spacing);
						color: var(--dark);
					}

					main {
						padding: var(--spacing);
						padding-left: 0;
					}

					main.muted {
						color: var(--gray);
					}

					h3 {
						margin: 0;
						padding: 0;
					}
				`}
				</style>
			</article>
		</motion.div>
	)
}

export default NotificationComponent
