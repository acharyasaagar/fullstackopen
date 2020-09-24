import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { likeBlog, deleteBlog, addComment } from '../store/async-actions'
import Comments from './Comments'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: '2.4em',
  },
  '.MuiChip-root': {
    padding: '0.4em',
    marginLeft: '0.8em',
    color: theme.palette.grey[600],
  },
  '.MuiLink-root': {
    textDecoration: 'none',
    letterSpacing: '0.85px',
    color: theme.palette.primary.main,
  },
  deleteButtonContainer: props => {
    return {
      [theme.breakpoints.up('sm')]: {
        marginTop: '-4em',
        marginBottom: '2em',
        justifyContent: 'flex-end',
      },
    }
  },
}))

const Blog = () => {
  const classes = useStyles()
  const [comment, setComment] = useState('')

  const { id } = useParams()

  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLikeBlog = blog => {
    return e => {
      e.target.blur()
      dispatch(likeBlog(blog))
    }
  }

  const handleDeleteBlog = blog => {
    return e => {
      const confirmed = window.confirm(`Remove blog: ${blog.title}`)
      if (confirmed) dispatch(deleteBlog(blog))
    }
  }

  const handleAddComment = blog => {
    return e => {
      e.preventDefault()
      dispatch(addComment({ comment }, blog))
      setComment('')
    }
  }

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <Paper className={classes.container} id={`${blog.id}`} elevation={1}>
        <div>
          <Typography variant="h6" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <a className={classes['.MuiLink-root']} href={blog.url}>
              {blog.url}
            </a>
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography color="textSecondary" variant="overline" gutterBottom>
                {blog.author}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                className={classes['.MuiChip-root']}
                size="small"
                data-test="like-blog-button"
                onClick={handleLikeBlog(blog)}
                label={`${blog.likes ? blog.likes : 0} likes`}
                icon={<FavoriteIcon />}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
        <Grid container className={classes.deleteButtonContainer}>
          <Grid item>
            {blog.user && user.id === blog.user.id ? (
              <Button
                data-test="delete-blog-button"
                onClick={handleDeleteBlog(blog)}
                color="secondary"
                variant="contained"
              >
                Delete
              </Button>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
        <Comments
          comment={comment}
          addComment={handleAddComment(blog)}
          comments={blog.comments}
          handleCommentChange={handleCommentChange}
        />
      </Paper>
    </>
  )
}

export default Blog
