import React, { FunctionComponent } from 'react'
// import axios from 'axios'

const submit = async () => {
	// const response = await axios.post('/api/login', {
	//   username: 'test',
	//   password: '0',
	// })

	// console.log(response)
}

const LoginPage:FunctionComponent = () => (
	<div>
		<p>Login page</p>
		<button type="button" onClick={submit}>Wyślij</button>
	</div>
)

export default LoginPage
