import { useState, useEffect } from 'react'
import axios from 'axios'
import server from '../server'

const Home = () => {
  const [cntry, setCntry] = useState()
  const [stt, setStt] = useState()
  const [cty, setCty] = useState()
  const [ucountry, setUcountry] = useState('')
  const [ustate, setUstate] = useState()
  const [ucity, setUcity] = useState()
  const [vl, setVl] = useState()
  let name, value
  
  // generate new bearer token
  const fetchtokn = async () => {
    try {
      let res = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "api-token": "zPmTeuZ3AU_zvSK72KvRdUlT8YiTsl8qEDaNY1b0xS3L_w6JBDGPM6DRUcay0bDhYDM",
          "user-email": "legend.sunny65@gmail.com"
        }
      })
      const dta = await res.data
      // console.log(dta)
      return dta.auth_token
    } catch (error) {
      console.error(error)
    }
  }

  // all countries
  const fetchcntry = async () => {
    const tokn = await fetchtokn()

    try {
      let res = await axios.get("https://www.universal-tutorial.com/api/countries", {
        "headers": {
          "Authorization": `Bearer ${tokn}`,
          "Accept": "application/json"
        }
      })
      const dta = await res.data
      // console.log(dta)
      setCntry(dta)
    } catch (error) {
      console.error(error)
    }
  }

  // states by countries
  const fetchstate = async (e) => {
    setUcity('')
    setUstate('')
    setCty(0)
    setStt(0)
    let cntry = e.target.value
    // console.log(cntry)
    setUcountry(cntry)
    const tokn = await fetchtokn()

    try {
      let res = await axios.get(`https://www.universal-tutorial.com/api/states/${cntry}`, {
        "headers": {
          "Authorization": `Bearer ${tokn}`,
          "Accept": "application/json"
        }
      })
      const dta = await res.data
      // console.log(dta)
      setStt(dta)
    } catch (error) {
      console.error(error)
    }
  }

  // // cities by state
  const fetchcity = async (e) => {
    setUcity('')
    setCty(0)
    let state = e.target.value
    // console.log(state)
    setUstate(state)
    const tokn = await fetchtokn()

    try {
      let res = await axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, {
        "headers": {
          "Authorization": `Bearer ${tokn}`,
          "Accept": "application/json"
        }
      })
      const dta = await res.data
      // console.log(dta)
      setCty(dta)
    } catch (error) {
      console.error(error)
    }
  }

  const getcity = (e) => {
    let city = e.target.value
    setUcity(city)
  }
  useEffect(() => {
    fetchcntry()
  }, [])

  const hndlinp = (e) => {
    name = e.target.name
    value = e.target.value
    setVl({...vl, [name]:value})
  }

  const hndlsub = async (e) => {
    e.preventDefault()
    const ucntry = ucountry
    const ustt = ustate
    const ucty = ucity
    const {uname, ueml, upass, uphn, ufname, uaddr, upin} = vl

    try {
      const res = await axios.post(`${server}/admin/user/add`, {uname, ueml, upass, uphn, ufname, uaddr, ucntry, ustt, ucty, upin})
      const dta = await res.data
      console.log(dta)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
        <div className='main' style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%',padding:'6rem'}}>
          <div className="optgrp" style={{display:'flex',justifyContent:'space-evenly',alignItems:'center', flexDirection:'column', width:'100%', padding:'2rem'}}>
            <span>Address</span>
            <form>
              <div className="frmgrp">
                <label htmlFor="uname">Username: </label>
                <input type="text" name="uname" id="uname" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <label htmlFor="ueml">Email: </label>
                <input type="text" name="ueml" id="ueml" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <label htmlFor="upass">Password: </label>
                <input type="password" name="upass" id="upass" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <label htmlFor="uphn">Phone: </label>
                <input type="text" name="uphn" id="uphn" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <label htmlFor="ufname">Full Name: </label>
                <input type="text" name="ufname" id="ufname" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <label htmlFor="uaddr">Full Address: </label>
                <input type="text" name="uaddr" id="uaddr" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <label htmlFor="ucountry">Country: </label>
                <select name="ucountry" id="ucountry" onChange={fetchstate}>
                  <option value="0">-----Select Country-----</option>
                  {
                    cntry && cntry.map((elm, i) => (
                      <option value={elm.country_name} key={i}>{elm.country_name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="frmgrp">
                <label htmlFor="ucity">State: </label>
                <select name="ustate" id="ustate" onChange={fetchcity}>
                  <option value="0">-----Select State-----</option>
                  {
                    stt && stt.map((elm, i) => (
                      <option value={elm.state_name} key={i}>{elm.state_name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="frmgrp">
                <label htmlFor="ucity">City: </label>
                <select name="ucity" id="ucity" onChange={getcity}>
                  <option value="0">-----Select City-----</option>
                  {
                    cty && cty.map((elm, i) => (
                      <option value={elm.city_name} key={i}>{elm.city_name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="frmgrp">
                <label htmlFor="upin">Pin Code: </label>
                <input type="text" name="upin" id="upin" onChange={hndlinp} />
              </div>
              <div className="frmgrp">
                <input type="submit" value="Add" onClick={hndlsub} />
              </div>
            </form>
          </div>
          <div className="optdtl">
            <div className="dtlhd">Address details are following:</div>
            <div className="optdta" style={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
              <span><span style={{fontWeight:'bold'}}>Country:</span>&nbsp;&nbsp;{ucountry ? ucountry : <span>Not Yet Selected</span>}</span>
              <span><span style={{fontWeight:'bold'}}>State:</span>&nbsp;&nbsp;{ustate ? ustate : <span>Not Yet Selected</span>}</span>
              <span><span style={{fontWeight:'bold'}}>Location:</span>&nbsp;&nbsp;{ucity ? ucity : <span>Not Yet Selected</span>}</span>
            </div>
          </div>
        </div>
    </>
  )
}

export default Home