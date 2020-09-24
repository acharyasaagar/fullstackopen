import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import CreateIcon from '@material-ui/icons/Create'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import { addBlog } from '../store/async-actions'

const useStyles = makeStyles({
  svgIcon: {
    marginLeft: '0.6em',
    marginBottom: '-0.1em',
    fontSize: '16px',
  },
  blogForm: {
    margin: '2em 0',
  },
  textField: {
    margin: '0.6em 0',
    width: '100%',
    maxWidth: '56em',
  },
  submitButton: {
    marginTop: '0.4em',
  },
})

const CreateBlog = props => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const handleAddBlog = async e => {
    e.preventDefault()
    const newBlog = {
      author,
      title,
      url,
    }
    try {
      dispatch(addBlog(newBlog))
      setTitle('')
      setUrl('')
      setAuthor('')
      history.push('/')
    } catch (err) {
      console.log(err.message)
      setTitle('')
      setUrl('')
      setAuthor('')
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleUrlChange = e => {
    setUrl(e.target.value)
  }

  const handleAuthorChange = e => {
    setAuthor(e.target.value)
  }

  return (
    <div>
      <Typography variant="h6">
        Create Blog
        <CreateIcon className={classes.svgIcon} />
      </Typography>
      <form
        className={classes.blogForm}
        onSubmit={handleAddBlog}
        data-test="create-blog-form"
      >
        <div>
          <TextField
            className={classes.textField}
            variant="filled"
            label="Blog Title"
            data-test="blog-title-input"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            variant="filled"
            label="Blog URL"
            data-test="blog-utl-input"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            variant="filled"
            label="Author"
            data-test="blog-author-input"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <Button
          className={classes.submitButton}
          type="submit"
          data-test="blog-add-button"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
        >
          Add Blog
        </Button>
      </form>
    </div>
  )
}

export default CreateBlog
