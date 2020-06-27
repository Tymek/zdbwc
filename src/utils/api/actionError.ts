export type ActionErrorType = { message: string, code?: string | number }

class ActionError extends Error {
	public code?: number | string

	constructor(message: string, code?: string | number, ...params: string[]) {
		if (params) {
			super(...params)
		} else {
			super()
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ActionError)
		}

		this.name = 'ActionError'
		this.message = message

		if (code !== undefined) {
			this.code = code
		}
	}

	public toJSON(): ActionErrorType {
		const output: ActionErrorType = {
			message: this.message,
		}

		if (this.code !== undefined) {
			output['code'] = this.code
		}

		return output
	}
}

export default ActionError
