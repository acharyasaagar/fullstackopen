import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeatherDisplay = props => {
  const { city } = props
  const [weather, setWeather] = useState({ loaded: false })

  const apiKey = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

  const hook = () => {
    axios.get(url).then(res => {
      const weatherData = Object.assign(
        { loaded: true },
        { ...res.data.current }
      )
      setWeather(weatherData)
    })
  }
  useEffect(hook, [])

  if (weather.loaded) {
    return (
      <div>
        <h3>Weather</h3>
        <h5>Temperature: {weather.temperature}</h5>
        <h5>
          Wind: {weather.wind_speed} mph direction {weather.wind_dir}
        </h5>
        <div>
          {weather.weather_icons.map(icon => (
            <img src={icon} key={icon} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <p>
        <i>Loading weather</i>
      </p>
    )
  }
}

export default CountryWeatherDisplay
