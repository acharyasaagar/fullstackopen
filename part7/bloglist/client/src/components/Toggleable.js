import React, { useState, useImperativeHandle } from 'react'

import Button from '@material-ui/core/Button'

const Toggleable = React.forwardRef((props, ref) => {
  const { actionButtonLabel, cancelButtonLabel, children } = props
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({
    toggleVisibility,
    visible,
  }))

  return (
    <>
      <div style={showWhenVisible} data-test="togglable-content">
        {children}
        {cancelButtonLabel ? (
          <Button variant="contained" onClick={toggleVisibility}>
            {cancelButtonLabel}
          </Button>
        ) : (
          ''
        )}
      </div>
      <div style={hideWhenVisible}>
        {actionButtonLabel ? (
          <Button
            variant="contained"
            color="primary"
            data-test="toggle-content-action-show"
            onClick={toggleVisibility}
          >
            {actionButtonLabel}
          </Button>
        ) : (
          ''
        )}
      </div>
    </>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable
