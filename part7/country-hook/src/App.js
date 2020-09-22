import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = name => {
  const [country, setCountry] = useState(null)
  const clearCountryTimeoutId = useRef(null)

  useEffect(() => {
    if (name === '' || !name) return
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(res => {
        const { data } = res
        if (clearCountryTimeoutId.current) {
          console.log('Found old timeout and now clearing it')
          clearTimeout(clearCountryTimeoutId.current)
          clearCountryTimeoutId.current = null
        }
        setCountry({ found: true, data: data[0] })
      })
      .catch(err => {
        setCountry({ found: false })
        const timeout = setTimeout(() => {
          setCountry(null)
          clearCountryTimeoutId.current = null
        }, 5000)
        clearCountryTimeoutId.current = timeout
      })
  }, [name, clearCountryTimeoutId])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = e => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
