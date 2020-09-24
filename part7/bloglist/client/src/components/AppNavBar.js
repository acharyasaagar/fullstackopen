import React from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import NavTabs from './NavTabs'
import NavUserInfo from './NavUserInfo'

const useStyles = makeStyles({
  appNavBar: {
    padding: '1.8em',
  },
})

const AppNavBar = props => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      className={classes.appNavBar}
    >
      <Grid item xs={12} sm={6}>
        <NavTabs />
      </Grid>
      <Grid item xs={12} sm={6}>
        <NavUserInfo user={props.user} />
      </Grid>
    </Grid>
  )
}

export default AppNavBar
