declare module '*.svg' {
	import { FunctionComponent, SVGProps } from 'react'

	const Component: React.FC<SVGProps<SVGSVGElement>>
	export default Component
}
