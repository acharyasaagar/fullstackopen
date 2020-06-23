import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => (
  <>
    <p>{props.content.part} {props.content.exercises}</p>
  </>
)

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = (props) => (
  <>
    {
      props.contents.map(item => {
        return <Part content={item} key={item.part}/>
      })
    }
  </>
)

const Total = (props) => (
  <>
    <p> Number of Total exercises {props.total}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const contents = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]
  const total = contents.reduce((acc, cur) => acc + cur.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
     <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))