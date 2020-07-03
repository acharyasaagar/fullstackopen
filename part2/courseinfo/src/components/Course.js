import React from 'react'

import Break from './Break'
import Header from './Header'
import Content from './Content'
import Total from './Total'

export default ({ course }) => {
  course.total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.total} />
      <Break />
    </>
  )
}
