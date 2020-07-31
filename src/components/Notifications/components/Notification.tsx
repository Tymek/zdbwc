import { Notification } from 'ts/schema'
import moment from 'utils/moment'
import Description from 'components/Description'
import { motion } from 'framer-motion'
import WarningSignIcon from 'assets/icons/warning-sign.svg'

const NotificationComponent: React.FC<Partial<Notification> & { important?: boolean }> = ({
	id,
	title,
	content,
	published_at,
	important,
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
			<article className={important ? 'important' : ''}>
				<main>
					<header>
						<h3>
							{
								important ? (
									<span className="icon">
										<WarningSignIcon width="1.25em" height="1.25em" />
									</span>
								) : null
							}
							{title}
						</h3>
					</header>
					{
						content && <Description>{content}</Description>
					}
					{children}
				</main>
				<aside>
					<div className="date">
						<strong>
							<time>{format('HH:mm')}</time>
						</strong>
						<time dateTime={format('YYYY-MM-DD')}>{format('D.MM')}</time>
					</div>
				</aside>
				<style jsx>{`
					article {
						display: grid;
						margin: var(--border-weight) 0;
						grid-template-columns: minmax(0px, auto) minmax(70px, 16.6666667%);
					}

					aside {
						padding: var(--spacing);
						font-family: var(--font-family-mono);
						display: flex;
						text-align: center;
						justify-content: flex-end;
						color: var(--gray);
					}

					aside strong, main h3 {
						display: block;
						font-weight: var(--font-weight-medium);
						font-size: inherit;
						margin-bottom: var(--spacing);
						color: var(--dark);
						/* font-weight: 700; */
					}

					main {
						padding: var(--spacing);
						padding-right: 0;
						color: var(--gray);
					}

					.important main {
						color: var(--dark);
					}

					.important main h3,
					.important aside strong {
						color: var(--warning);
					}

					h3 {
						margin: 0;
						padding: 0;
						font-family: var(--font-family-medium);
					}

					aside strong {
						font-family: var(--font-family-mono);
					}

					header .icon {
						margin-right: calc(var(--spacing) / 3 * 2);
						display: inline-flex;
						vertical-align: middle;
						align-items: flex-end;
						height: 1em;
						/* margin-bottom: -3px; */
					}
				`}
				</style>
			</article>
		</motion.div>
	)
}

export default NotificationComponent
