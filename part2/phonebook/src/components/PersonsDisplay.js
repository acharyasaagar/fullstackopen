import React from 'react'

const PersonsDisplay = props => {
  const { filteredPersons, handlePersonRemoval } = props
  return (
    <>
      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map(person => {
          const personId = `/${person.id}`
          const personHref = `#/${person.id}`
          return (
            <li key={person.name}>
              <p id={personId}>{person.name}</p>
              <p>
                <a href={personHref}>{person.number}</a>
              </p>
              <p>
                <button onClick={handlePersonRemoval(person)}>delete</button>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PersonsDisplay
