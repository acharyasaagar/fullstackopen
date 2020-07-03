import React from 'react'

const PersonForm = props => {
  const {
    handleAddPerson,
    handlePersonChange,
    handleNumberChange,
    newNumber,
    newPerson,
  } = props

  return (
    <>
      <h3>Add a new:</h3>
      <form onSubmit={handleAddPerson}>
        <div>
          <label>Name:&nbsp;&nbsp;</label>
          <input value={newPerson} onChange={handlePersonChange} />
        </div>
        <br />
        <div>
          <label>Number:&nbsp;&nbsp;</label>
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <br />
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
