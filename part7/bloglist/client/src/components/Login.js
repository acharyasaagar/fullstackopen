import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { loginUser } from '../store/async-actions'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: '0.6em',
      width: '45vw',
      maxWidth: '380px',
    },
    '& .MuiButton-root': {
      margin: `1.2em 0.6em`,
      maxWidth: '380px',
      width: '45vw',
    },
  },
  paper: {
    padding: '2em',
    margin: '5em auto 0 auto',
    maxWidth: '480px',
    width: '100%',
  },
  header: {
    margin: '1em',
  },
  belowLoginForm: {
    textAlign: 'center',
  },
}))

const Login = props => {
  const dispatch = useDispatch()

  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handleLogin = async e => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
  }

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h5" className={classes.header}>
          Log in to the Application
        </Typography>
        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className={classes.root}
        >
          <div>
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              data-test="login-username-input"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              data-test="login-password-input"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              type="submit"
              data-test="login-button"
            >
              Log in
            </Button>
          </div>
          <div className={classes.belowLoginForm}>
            <Typography color="textSecondary" variant="caption">
              CREATE AN ACCOUNT
            </Typography>
          </div>
        </form>
      </Grid>
    </Paper>
  )
}

export default Login
