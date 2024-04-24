import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Leaddet = () => {
    const {id} = useParams()
    const [lddet, setLddet] = useState()
    let leadid = id
    let host = 'https://api-in21.leadsquared.com/v2/'
    let requrl = 'LeadManagement.svc/Leads.GetById'
    let accessKey = 'u$r80dceccd180f2da9118ae76188aa80af'
    let secretKey = '3597246096083d1d798c1d133356f107a751106c'
    let apiurl = `${host}${requrl}?accessKey=${accessKey}&secretKey=${secretKey}&id=${leadid}`

    const getlddet = async () => {
        console.log(leadid)
        try {
            const res = await axios.get(apiurl)
            const dta = await res.data
            console.log(dta)
            setLddet(dta[0])
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getlddet()
    }, [])

  return (
    <>
        <div className="main">Leaddet</div>
    </>
  )
}

export default Leaddet