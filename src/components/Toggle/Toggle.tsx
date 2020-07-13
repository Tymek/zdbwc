import Chevron from 'assets/icons/chevron.svg'
import { motion } from 'framer-motion'

const Toggle: React.FC<{
	isOpen?: boolean;
}> = ({ isOpen }) => (
	<motion.div
		style={{
			width: 'calc(var(--spacing) * 2)',
			height: 'calc(var(--spacing) * 2)',
		}}
		animate={isOpen ? 'open' : 'collapsed'}
		variants={{
			open: { transform: 'rotate(-90deg)' },
			collapsed: { transform: 'rotate(-270deg)' },
		}}
	>
		<Chevron width="1em" height="1em" />
	</motion.div>
)

export default Toggle
