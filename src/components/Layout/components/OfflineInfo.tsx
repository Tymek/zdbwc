import { useEffect, useState } from 'react'
import OfflinePinIcon from '@material-ui/icons/OfflinePin'
import useLastUpdate from 'utils/hooks/useLastUpdate'
import useOffline from 'utils/hooks/useOffline'
import moment from 'utils/moment'
import { gray as iconColor } from 'utils/theme.json' // eslint-disable-line import/extensions

const formatLastUpdate = (lastUpdate?: string) => moment(lastUpdate).fromNow()

const OfflineInfo: React.FC = () => {
	const lastUpdate = useLastUpdate()
	const [description, updateDescription] = useState<string>(formatLastUpdate(lastUpdate))

	useEffect(() => {
		const interval = setInterval(() => {
			updateDescription(formatLastUpdate(lastUpdate))
		}, 5e3)

		return () => clearInterval(interval)
	}, [lastUpdate])

	return (
		<div className="container">
			<h2>
				<span className="icon">
					<OfflinePinIcon htmlColor={iconColor} />
				</span>
				Offline
			</h2>
			Zaktualizowano {description}
			<style jsx>{`
				h2 {
					font-size: 1.2em;
					font-weight: var(--font-weight-medium);
					font-family: var(--font-family-medium);
					margin: 0;
					position: relative;
					display: flex;
					align-items: center;
					color: ${iconColor};
				}

				.container {
					padding-left: calc(var(--spacing) * 3);
				}

				.icon {
					margin-right: calc(var(--spacing) / 2);
				}
			`}
			</style>
		</div>
	)
}

const OfflineContainer: React.FC = () => {
	const isOffline = useOffline()

	return isOffline ? <OfflineInfo /> : null
}

export default OfflineContainer
