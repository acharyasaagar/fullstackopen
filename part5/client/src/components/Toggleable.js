import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
  const { buttonLabel, children, showButton, showCancelButton } = props
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
      <div style={showWhenVisible}>
        {children}
        {showCancelButton ? (
          <button onClick={toggleVisibility}>cancel</button>
        ) : (
          ''
        )}
      </div>
      <div style={hideWhenVisible}>
        {showButton ? (
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        ) : (
          ''
        )}
      </div>
    </>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable
