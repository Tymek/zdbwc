export type ActionBody<Input> = {
	session_variables: Record<string, string>,
	input: Input,
	action: {
		name: string,
	}
}
