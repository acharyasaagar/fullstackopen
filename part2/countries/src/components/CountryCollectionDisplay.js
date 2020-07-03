import React from 'react'

import CountryDisplay from './CountryDisplay'

const CountryCollectionDisplay = props => {
  const { countries, searchTerm, setSearchTerm } = props
  const totalCountries = countries.length

  if (totalCountries === 0) {
    return <h3>No countries</h3>
  } else if (totalCountries === 1) {
    return <CountryDisplay country={countries[0]} />
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name}>
            {' '}
            {country.name}{' '}
            <button onClick={() => setSearchTerm(country.name.toLowerCase())}>
              Show
            </button>
          </li>
        ))}
      </ul>
    )
  } else {
    if (searchTerm === '') {
      return <h4>Enter your search term in the form above!</h4>
    }
    return <h4>Too many matches, specify another filter</h4>
  }
}

export default CountryCollectionDisplay
