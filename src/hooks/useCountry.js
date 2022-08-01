import { useState, useEffect } from 'react'

export function useCountry(name) {
  const [result, setResult] = useState({ status: 'pending' })
  const [lastCheck, setLastCheck] = useState(new Date().getTime())

  useEffect(() => {
    fetch(`https://restcountries.com/v3/name/${name}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        data.length
          ? setResult({ status: 'success', data: data[0] })
          : Promise.reject('API gave us bad data')
      })
      .catch((err) => {
        /* I don't actually love this, and usually prefer early return,
             but I read a pretty convincing article on why (if you _have_ to
            use `if`) you should cover all the cases or whatever */
        if (err.status === '404')
          setResult({ status: 'error', message: 'API returned 404' })
        else if (err instanceof Error)
          setResult({ status: 'error', message: err.message })
        else setResult({ status: 'error', message: `${err}` })
      })
  }, [name])

  return result
}
