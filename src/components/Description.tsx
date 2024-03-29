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
					margin: 0 0 var(--spacing);
					font-family: var(--font-family-light);
					font-weight: var(--font-weight-light);
				}
			`}
			</style>
		</div>
	)
}

export default Description
