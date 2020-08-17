import { useMemo } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'
import { windowScrollTo } from 'seamless-scroll-polyfill'

import moment from 'utils/moment'
import { Session } from 'ts/schema'
import resolvers, { OpenedDayId, OPENED_DAY_ID, OPEN_DAY } from './day.resolvers'
import SessionComponent from './components/Session'

type DayProps = {
	id: string,
	last?: boolean,
	sessions: Session[],
}

const Day: React.FC<DayProps> = ({ id, sessions, last }) => {
	const label = useMemo(() => moment(id).format('dddd'), [id])
	const client = useApolloClient()
	client.addResolvers(resolvers)

	const { data } = useQuery<{ opened_day_id?: OpenedDayId }>(OPENED_DAY_ID)
	const [openDay] = useMutation<{ opened_day_id?: OpenedDayId }>(OPEN_DAY)
	const isOpen = data?.opened_day_id === id
	const hasSession = sessions && sessions.length > 0
	const onHeaderClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault()

		void openDay({
			variables: { id: isOpen ? null : id },
			refetchQueries: [{ query: OPENED_DAY_ID }],
		})

		windowScrollTo({ top: 0, behavior: 'smooth' })

		// setTimeout(() => { // scroll after animation
		// 	window.scroll({
		// 		top: ref?.current?.offsetTop,
		// 		left: 0,
		// 		behavior: 'smooth',
		// 	})
		// }, 500)
	}

	return (
		<div id={id}>
			<motion.header
				initial={false}
				animate={{ backgroundColor: isOpen ? 'var(--gray)' : 'var(--dark)' }}
				style={{ border: 'var(--border-weight) solid var(--white)', borderBottom: 'none' }}
			>
				<a
					href={`#${id}`}
					className={`link${isOpen ? ' open' : ''}`}
					onClick={onHeaderClick}
					role="button"
					tabIndex={0}
				>
					<div className="button-unfocus" tabIndex={-1}>
						<h2>
							<time dateTime={moment(id).format('YYYY-MM-DD')}>{label}</time>
						</h2>
					</div>
				</a>
			</motion.header>
			<AnimatePresence initial={false}>
				{
					(hasSession && isOpen) && (
						<motion.main
							key="content"
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={{
								open: { height: 'auto' },
								collapsed: { height: 0 },
							}}
							style={{ overflow: 'hidden', borderRight: 'calc(1rem / 16) solid transparent' }}
							transition={{ type: 'spring', mass: 1.67, damping: 50, stiffness: 150, staggerChildren: 0.05 }}
						>
							{ sessions.map(props => (
								<motion.div
									key={props.id}
									variants={{
										open: { opacity: 1 },
										collapsed: { opacity: 0 },
									}}
								>
									<SessionComponent key={props.id} {...props} />
								</motion.div>
							))}
							<div className="spacing">
								<motion.div
									variants={{
										open: { maxWidth: '100%' },
										collapsed: { maxWidth: '0%' },
									}}
									transition={{ delay: 1 }}
									style={{ margin: '0 auto' }}
								>
									{ last && <hr /> }
								</motion.div>
							</div>
						</motion.main>
					)
				}
			</AnimatePresence>
			<style jsx>{`
				button {
					width: 100%;
				}

				h2 {
					font-size: inherit;
					font-weight: var(--font-weight-medium);
					font-family: var(--font-family-medium);
					text-align: center;
					color: var(--light);
					margin: 0;
				}

				time {
					color: inherit;
				}
				
				.button-unfocus {
					padding: calc(var(--spacing) * 1.5);
					outline: 0;
				}

				.link {
					text-decoration: none;
				}

				a:focus .button-unfocus {
					outline-style: auto;
					outline-color: var(--primary);
					outline-width: 0.125em;
					color: var(--primary);
				}

				.spacing {
					padding-top: calc(var(--spacing) * 3);
				}

				.spacing hr {
					margin: 0;
					border: none;
					height: calc(2rem / 16);
					background: var(--gray);
					margin: var(--spacing) 16.8% calc(var(--spacing) * 6);
				}
			`}
			</style>
		</div>
	)
}

export default Day
