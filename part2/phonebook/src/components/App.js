import React, { useState, useEffect } from 'react'

import Break from './Break'
import Filter from './Filter'
import Notification from './Notification'
import PersonForm from './PersonForm'
import PersonsDisplay from './PersonsDisplay'

import personService from '../services/person'
import { capitalize } from '../utils'

const App = () => {
  /**
   * State initialization
   */

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  /**
   * Effect Hooks
   */
  const hook = () => {
    personService.getAll().then(data => setPersons(data))
  }

  useEffect(hook, [])

  /** Change successMessage State to show error */
  const handleError = _ => {
    setSuccessMessage('Oops an error occured while trying to save your data!')
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  /**
   * Custom methods
   */
  const handleAddPerson = e => {
    e.preventDefault()
    /** state update is async so it does not matter where we put them */
    setNewPerson('')
    setNewNumber('')
    /** Format input */
    const incomingPersonName = newPerson
      .trim()
      .split(' ')
      .map(capitalize)
      .join(' ')
    /** Prepare payload */
    const personPayload = {
      name: incomingPersonName,
      number: newNumber,
    }
    /** Check Duplicate */
    const duplicate = persons.find(
      p => p.name.toLowerCase() === incomingPersonName.toLowerCase()
    )
    if (duplicate) {
      const shouldReplace = window.confirm(
        `${incomingPersonName} is already on phonebook, replace old number with new one?`
      )
      if (shouldReplace) {
        return personService
          .update(duplicate.id, personPayload)
          .then(data => {
            /** update state after response is received */
            setPersons(persons.map(p => (p.id === duplicate.id ? data : p)))
            setSuccessMessage(`Number changed: ${personPayload.number}`)
            setTimeout(() => setSuccessMessage(null), 5000)
          })
          .catch(err => {
            return handleError()
          })
      }
    }
    return personService
      .create(personPayload)
      .then(data => {
        /** Update state after response is received */
        const newPersons = persons.concat(data)
        setPersons(newPersons)
        setSuccessMessage(`Added: ${personPayload.name}`)
        setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch(err => {
        return handleError()
      })
  }

  const handlePersonChange = e => {
    setNewPerson(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = e => {
    const incomingFilter = e.target.value.toLowerCase()
    setFilter(incomingFilter)
  }

  const handlePersonRemoval = person => {
    return function () {
      const shouldContinueDeletion = window.confirm(
        `Delete ${person.name} from phonebook?`
      )
      if (shouldContinueDeletion) {
        personService
          .remove(person.id)
          .then(_ => {
            setPersons(persons.filter(p => p.id !== person.id))
            setSuccessMessage(`Removed: ${person.name}`)
            setTimeout(() => setSuccessMessage(null), 5000)
          })
          .catch(err => {
            setSuccessMessage(
              `Oops, looks like ${person.name} is already removed from server!!`
            )
            setTimeout(() => setSuccessMessage(null), 5000)
          })
      }
    }
  }

  const filteredPersons =
    filter === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filter))

  /**
   *  Markup
   */
  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Break />
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        newPerson={newPerson}
      />
      <Break />
      <PersonsDisplay
        filteredPersons={filteredPersons}
        handlePersonRemoval={handlePersonRemoval}
      />
    </>
  )
}

export default App
