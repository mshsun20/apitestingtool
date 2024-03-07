import { useState, useEffect } from 'react'
import axios from 'axios'

const Movies = () => {
    const [mvs, setMvs] = useState()

    const options = {
        method: 'GET',
        url: 'https://imdb146.p.rapidapi.com/v1/find/',
        params: {query: 'all'},
        headers: {
          'X-RapidAPI-Key': '3cb698e9f3msh5bb24bd48543b97p1b3333jsnae3e6d47316e',
          'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
        }
    }

    const getMovis = async () => {
        try {
            const res = await axios.request(options)
            const dta = await res.data
            console.log(dta)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getMovis()
    }, [])

  return (
    <>
        <div className="main">Movies</div>
    </>
  )
}

export default Movies