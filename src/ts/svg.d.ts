declare module '*.svg' {
	import { FunctionComponent, SVGProps } from 'react'

	const Component: FunctionComponent<SVGProps<SVGSVGElement>>
	export default Component
}
