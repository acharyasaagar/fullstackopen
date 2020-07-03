import React from 'react'

import Part from './Part'

export default props => (
  <>
    {props.parts.map(part => {
      return <Part content={part} key={part.id} />
    })}
  </>
)
