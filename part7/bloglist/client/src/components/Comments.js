import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  commentHeader: {
    margin: '2em 0 1em 0',
    color: theme.palette.grey[700],
  },
  comment: {
    padding: '1em',
    margin: '0.1em 0',
    borderRadius: '1em',
    background: theme.palette.grey[200],
    width: '100%',
    maxWidth: '26em',
  },
  '.MuiTextField-root': {
    width: '100%',
    maxWidth: '36em',
    marginTop: '1.2em',
    marginBottom: '0.4em',
  },
}))

const Comments = props => {
  const { comment, comments, addComment, handleCommentChange } = props
  const classes = useStyles()
  return (
    <Grid container direction="column">
      <Typography className={classes.commentHeader} variant="h6">
        Comments
      </Typography>
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <Typography
            key={`${comment}-${i}`}
            className={classes.comment}
            variant="body2"
          >
            {comment}
          </Typography>
        ))
      ) : (
        <Typography variant="overline" color="textSecondary">
          No Comments Yet{' '}
        </Typography>
      )}
      <form noValidate autoComplete="off" onSubmit={addComment}>
        <div>
          <TextField
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            multiline
            rows={2}
            defaultValue="Default Value"
            variant="outlined"
            className={classes['.MuiTextField-root']}
          />
        </div>
        <Button type="submit" variant="outlined">
          Add a comment
        </Button>
      </form>
    </Grid>
  )
}

export default Comments
