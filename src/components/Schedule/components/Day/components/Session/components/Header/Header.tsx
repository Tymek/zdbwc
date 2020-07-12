import moment from 'utils/moment'
import { Session } from 'ts/schema'

export const time = (date?: string): string | null => (date ? moment(date).format('HH:mm') : null)

const Header: React.FC<Partial<Session> & { isMuted?: boolean }> = ({
	children,
	name,
	begins_at,
	ends_at,
	speaker,
}) => (
	<>
		<div className={`header${(!ends_at && !speaker) ? ' muted' : ''}`}>
			<aside>
				<time>{time(begins_at)}</time>
				{
					ends_at ? (
						<>
							<span className="dash">&ndash;</span><time>{time(ends_at)}</time>
						</>
					) : null
				}
			</aside>
			<h3>
				<div className="name">{name}</div>
				{children}
			</h3>
		</div>
		<style jsx>{`
			.header {
				width: 100%;
				display: grid;
				grid-template-columns: 1fr 5fr;
			}

			aside {
				font-family: var(--font-family-mono);
				font-size: 0.875rem;
				padding: var(--spacing);
				min-width: 4rem;
				min-height: 3.5rem;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}

			.dash {
				display: block;
				line-height: 0.2em;
				width: 100%;
			}

			h3 {
				align-self: center;
				font-size: inherit;
				margin: var(--border-weight);
				font-weight: var(--font-weight-bold);
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.muted {
				color: var(--gray);
			}

			.muted h3 {
				font-weight: var(--font-weight-light);
			}
		`}
		</style>
	</>
)

export default Header
