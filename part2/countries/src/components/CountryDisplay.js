import React from 'react'

import CountryWeatherDisplay from './CountryWeatherDisplay'

const CountryDisplay = props => {
  const { country } = props
  const countryFlagStyle = {
    height: '140px',
    width: '140px',
  }
  const container = {
    borderRadius: '2px',
    boxShadow: '0px 2px 4px #c4c4c4 ',
    width: '280px',
    padding: '16px',
  }
  const imageContainer = {
    borderRadius: '2px',
    boxShadow: '0px 2px 4px #c4c4c4 ',
    width: '180px',
    padding: '12px',
  }
  return (
    <div style={container}>
      <h2>{country.name}</h2>
      <p>Capital:&nbsp;{country.capital}</p>
      <p>Population:&nbsp;{country.population}</p>
      <h3>Spoken Languages:</h3>
      <ul>
        {country.languages.map(lan => (
          <li key={lan.name}>{lan.name}</li>
        ))}
      </ul>
      <br />
      <div style={imageContainer}>
        <img src={country.flag} style={countryFlagStyle} />
      </div>
      <CountryWeatherDisplay city={country.capital} />
    </div>
  )
}

export default CountryDisplay
