import React from 'react'

import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import PowerSettingsNewSharpIcon from '@material-ui/icons/PowerSettingsNewSharp'
import { makeStyles } from '@material-ui/core/styles'

import { setUserAction } from '../store/actions'

const useStyles = makeStyles({
  logoutButton: {
    marginLeft: '1.8em',
  },
})

const NavUserInfo = props => {
  const { user } = props

  const classes = useStyles()

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUserAction(null))
  }

  return (
    <>
      <Grid
        container
        direction="column-reverse"
        justify="center"
        alignItems="flex-end"
      >
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            Logged in as: {user.username}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="inherit"
            size="small"
            className={classes.logoutButton}
            startIcon={<PowerSettingsNewSharpIcon />}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default NavUserInfo
