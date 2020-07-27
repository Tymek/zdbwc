type EventType = 'acceptUpdate' | 'update'
type Detail = {
	version?: string | number,
}

type TriggerType = (type: EventType, detail?: unknown) => boolean | null

export const trigger: TriggerType = (type = 'update', detail) => {
	if (typeof window !== undefined) {
		return document.dispatchEvent(new CustomEvent(type, detail ? { detail } : undefined))
	}

	return null
}

type ListenToType = (
	type: EventType,
	listener: (this: Document, ev: CustomEvent<Detail>) => unknown,
	options?: Parameters<typeof document.addEventListener>[2]
) => void

export const listenTo: ListenToType = (
	type = 'update',
	listener,
	options
): void => {
	if (typeof window !== undefined) {
		document.addEventListener(type, listener, options)
	}
}
