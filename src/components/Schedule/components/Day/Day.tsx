import { useMemo } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'

import moment from 'utils/moment'
import { Session } from 'ts/schema'
import resolvers, { OpenedDayId, OPENED_DAY_ID, OPEN_DAY } from './day.resolvers'
import SessionComponent from './components/Session'

type DayProps = {
	id: string,
	sessions: Session[],
}

const Day: React.FC<DayProps> = ({ id, sessions }) => {
	const label = useMemo(() => moment(id).format('dddd'), [id])
	const client = useApolloClient()
	client.addResolvers(resolvers)

	const { data } = useQuery<{ opened_day_id?: OpenedDayId }>(OPENED_DAY_ID)
	const [openDay] = useMutation<{ opened_day_id?: OpenedDayId }>(OPEN_DAY)
	const isOpen = data?.opened_day_id === id
	const hasSession = sessions && sessions.length > 0
	const onHeaderClick = async () => {
		await openDay({
			variables: { id },
			refetchQueries: [{ query: OPENED_DAY_ID }],
		})
	}

	return (
		<div>
			<motion.header
				className="header"
				initial={false}
				animate={{ backgroundColor: isOpen ? 'var(--gray)' : 'var(--dark)' }}
				style={{ border: 'var(--border-weight) solid var(--white)', borderBottom: 'none' }}
			>
				{/* <header className={isOpen ? 'open' : ''}> */}
				<button type="button" onClick={onHeaderClick}>
					<h2><time dateTime={moment(id).format('YYYY-MM-DD')}>{label}</time></h2>
				</button>
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
							style={{ overflow: 'hidden' }}
							transition={{ type: 'spring', mass: 2, damping: 50, stiffness: 150 }}
						>
							{ sessions.map(props => (
								<SessionComponent key={props.id} {...props} />
							))}
						</motion.main>
					)
				}
			</AnimatePresence>
			<style jsx>{`
				h2 {
					font-size: inherit;
					font-weight: var(--font-weight-bold);
					color: var(--light);
					text-align: center;
					margin: 0;
				}

				button {
					all: inherit;
					cursor: pointer;
					border: none;
					width: 100%;
					padding: calc(var(--spacing) * 1.5);
				}
			`}
			</style>
		</div>
	)
}

export default Day
