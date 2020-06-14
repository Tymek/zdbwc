import * as React from 'react'
import axios from 'axios'

const LoginPage = () => {
  const submit = async () => {
    const response = await axios.post('/api/login', {
      username: 'test',
      password: '0',
    })

    console.log(response)
  }

  return (
    <div>
      <p>Login page</p>
      <button onClick={submit}>Wyślij</button>
    </div>
  )
}

export default LoginPage
