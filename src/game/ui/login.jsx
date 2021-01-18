import { useMutation } from '@apollo/client'
import { Paper, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { LOGIN_USER } from 'game/framework/gql'

export const Login = ({ history }) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const [login] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      if (loginUser !== undefined) {
        localStorage.setItem('auth', true)
        history.push('/')
      }
    },
  })

  if (localStorage.getItem('auth')) {
    return <Redirect to="/menu" />
  }

  return (
    <>
      <div className="center mt-2">
        <h1>Card Counter</h1>
        <p>“The single player card game sensation of 2020”</p>
      </div>
      <Paper elevation={2} className="card center mt-2">
        <form
          id="login"
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault()
            document.getElementById('login').reset()
            setUsername(null)
            setPassword(null)
            login({ variables: { username, password } })
          }}
        >
          <h2>Login</h2>
          <TextField
            id="username"
            label="Username"
            onChange={e => setUsername(e.target.value)}
            variant="outlined"
            required
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            required
          />
          <p>*required field</p>
          <Button type="submit" variant="contained" color="primary">
            LOGIN
          </Button>
        </form>
      </Paper>
    </>
  )
}
