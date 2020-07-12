import Chevron from 'assets/icons/chevron.svg'

const Toggle: React.FC<{
	isOpen?: boolean;
}> = ({ isOpen }) => (
	<div className="toggle" style={{ transform: `rotate(${isOpen ? -90 : -270}deg)` }}>
		<Chevron width="1em" height="1em" />
		<style jsx>{`
			.toggle {
				width: calc(var(--spacing) * 2 + 1em);
				height: calc(var(--spacing) * 2 + 1em);
				padding: var(--spacing);
				transition: transform 120ms ease-out;
			}
		`}
		</style>
	</div>
)

export default Toggle
