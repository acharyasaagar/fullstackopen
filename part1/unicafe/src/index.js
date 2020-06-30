import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, title }) => <button onClick={handleClick} >{title}</button>
const Statistic = ({ stat, title }) => (
  <tr>
    <td>{title}</td>
    <td>{stat}</td>
  </tr>
)
const Display = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positive =  100 * good / total || 'Oops! nobody has given a good feedback yet.'

  if (total < 1) {
    return (<h6> No Feedbacks Given </h6>)
  }
  return (
    <div>
      <br></br>
      <h2>Statistics:</h2>
      <table>
        <tbody>
        <Statistic stat={good} title="Good" />
        <Statistic stat={neutral} title="Neutral" />
        <Statistic stat={bad} title="Bad" />
        <Statistic stat={total} title="Total" />
        <Statistic stat={average} title="Average" />
        <Statistic stat={positive} title="Positive(%)" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => () => setState(state + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClick(good, setGood)} title="good" />
      <Button handleClick={handleClick(neutral, setNeutral)} title="neutral" />
      <Button handleClick={handleClick(bad, setBad)} title="bad" />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))