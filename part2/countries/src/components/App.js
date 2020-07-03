import axios from 'axios'
import React, { useState, useEffect } from 'react'

import Break from './Break'
import CountryCollectionDisplay from './CountryCollectionDisplay'
import Search from './Search'

const App = () => {
  /**
   * State Init
   */
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  /**
   * Effect hooks
   */
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }

  useEffect(hook, [])
  /**
   * Custom methods
   */
  const handleSearchTermChange = e => {
    const incomingSearchTerm = e.target.value.toLowerCase()
    setSearchTerm(incomingSearchTerm)
  }

  const countriesToShow =
    searchTerm === ''
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(searchTerm)
        )

  /**
   * Markup
   */
  return (
    <>
      <Search
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
      />
      <Break />
      <CountryCollectionDisplay
        countries={countriesToShow}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  )
}

export default App
