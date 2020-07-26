import { Notification } from 'ts/schema'
import moment from 'utils/moment'
import Description from 'components/Description'

const NotificationComponent: React.FC<Notification> = ({ title, content, published_at }) => {
	const format = (str: string) => moment(published_at).format(str)

	return (
		<article>
			<aside>
				<div className="date">
					<strong>
						<time dateTime={format('YYYY-MM-DD')}>{format('D.MM')}</time>
					</strong>
					<time>{format('HH:mm')}</time>
				</div>
			</aside>
			<main>
				<header>
					<h3>{title}</h3>
				</header>
				{
					content && <Description>{content}</Description>
				}
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
				}

				aside strong, main h3 {
					display: block;
					font-weight: var(--font-weight-bold);
					font-family: var(--font-family);
					font-size: inherit;
					margin-bottom: var(--spacing);
				}

				main {
					padding: var(--spacing);
					padding-left: 0;
				}

				h3 {
					margin: 0;
					padding: 0;
				}
			`}
			</style>
		</article>
	)
}

export default NotificationComponent
