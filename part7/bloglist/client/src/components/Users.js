import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  '.MuiLink-root': {
    textDecoration: 'none',
    letterSpacing: '0.85px',
    color: theme.palette.primary.main,
  },
}))

const Users = props => {
  const classes = useStyles()
  const users = useSelector(state => state.users)
  return (
    <div className="panel">
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow>
                <TableCell>
                  <Link
                    className={classes['.MuiLink-root']}
                    to={`/users/${user.id}`}
                  >
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
