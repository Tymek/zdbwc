interface GlobalEventHandlersEventMap {
	'acceptUpdate': CustomEvent<{ version?: number | string }>
	'update': CustomEvent<{ version?: number | string }>
}
