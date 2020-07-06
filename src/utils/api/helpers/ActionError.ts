export type ActionErrorType = { message: string, code?: string | number }

class ActionError extends Error {
	public code?: number | string

	constructor(messageOrError: string | Error, code?: string | number) {
		if (typeof messageOrError === 'string') {
			super(messageOrError)
			this.message = messageOrError
		} else {
			super(messageOrError.message)
			this.message = messageOrError.message
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ActionError)
		}

		this.name = 'ActionError'

		if (code !== undefined) {
			this.code = code
		}
	}

	public toJSON(): ActionErrorType {
		const output: ActionErrorType = {
			message: this.message,
		}

		if (this.code !== undefined) {
			output.code = `${this.code}`
		}

		return output
	}
}

export default ActionError
