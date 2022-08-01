import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { useCountry } from './hooks/useCountry'

function App() {
  const [query, setQuery] = useState('')
  const [name, setName] = useState('')
  const country = useCountry(name)

  useEffect(() => {
    const timeout = setTimeout(() => setName(query), 200)
    return () => clearTimeout(timeout)
  })

  return (
    <div className='App'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          placeholder='enter a country'
          value={query}
          onInput={({ target }) => {
            setQuery(target.value)
          }}
        />
        <div>
          {country.status === 'success' ? (
            country.data.name.official
          ) : (
            <span style={{ color: 'red' }}>'Error Get!'</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
