import { sierotki } from 'utils/typografia'

const Description: React.FC<{ children?: string }> = ({ children }) => {
	if (!children) return null

	const paragraphs = children.split('\n').map(text => sierotki(text))

	return (
		<div>
			{paragraphs.map(paragraph => (
				<p key={paragraph}>{paragraph}</p>
			))}
			<style jsx>{`
				p {
					margin: 0;
					padding: var(--spacing);
					padding-top: 0;
				}
			`}
			</style>
		</div>
	)
}

export default Description
