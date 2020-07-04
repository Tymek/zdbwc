declare module '*.svg' {
	import { FunctionComponent, SVGProps } from 'react'

	const Component: React.FunctionComponent<SVGProps<SVGSVGElement>>
	export default Component
}
