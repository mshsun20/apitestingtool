import { useState, useEffect } from 'react'
import '../../styles/Users.css'
import axios from 'axios'

const Users = () => {
    const [dta, setDta] = useState()
    let empcode = '1103685'
    let role = {
        r1:`Administrator`,
        r2:`Marketing_User`
    }
    let team = {
        marketing_user:'79059f26-7b74-11ed-8792-02abb63487ca',
        lead_group:'ad5b608a-0217-11ef-b6b6-021c14776133',
        crm_group:'c501ead5-0217-11ef-b6b6-021c14776133'
    }
    let statcod = 0

    let host = `https://api-in21.leadsquared.com/v2/`
    let accessKey = `u$r80dceccd180f2da9118ae76188aa80af`
    let secretKey = `3597246096083d1d798c1d133356f107a751106c`
    let apiurl = `${host}UserManagement.svc/User/AdvancedSearch?accessKey=${accessKey}&secretKey=${secretKey}`

    let apibody = {
        // "Columns": {
        //     "Include_CSV": "UserID,FirstName,LastName,AssociatedPhoneNumbers,EmailAddress,EmployeeId"
        // },
        "GroupConditions": [
            {
                "Condition": [
                    {
                        "LookupName": "Role",
                        "Operator": "eq",
                        "LookupValue": `${role.r1}`,
                        "ConditionOperator": "AND"
                    },
                    {
                        "LookupName": "TeamId",
                        "Operator": "eq",
                        "LookupValue": `${team.crm_group}`,
                        "ConditionOperator": "AND"
                    },
                    {
                        "LookupName": "EmployeeId",
                        "Operator": "eq",
                        "LookupValue": `${empcode}`,
                        "ConditionOperator": "AND"
                    },
                    {
                        "LookupName": "StatusCode",
                        "Operator": "eq",
                        "LookupValue": `${statcod}`,
                        "ConditionOperator": null
                    }
                ]
            }
        ]
    }

    const getDta = async () => {
        try {
            const res = await axios.post(apiurl,apibody)
            const data = await res.data
            console.log(data.Users)
            setDta(data.Users)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getDta()
    }, [])

  return (
    <>
        <div className="main">
            <div className="container">
                <div className="hdr">All Users Details</div>
                <div className="dtatbl">
                    <table>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Employee Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email Id</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Current Status</th>
                                <th>Created On</th>
                                <th>Team Name</th>
                                <th>Admin Permission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dta && dta.map((elm, i) => (
                                    <tr key={i}>
                                        <td className='nowrap'>{elm.UserId}</td>
                                        <td>{elm.EmployeeId}</td>
                                        <td className='nowrap'>{elm.FirstName}</td>
                                        <td className='nowrap'>{elm.LastName}</td>
                                        <td className='nowrap'>{elm.PhoneMobile}</td>
                                        <td>{elm.EmailAddress}</td>
                                        <td>{elm.Role}</td>
                                        <td>{elm.Department}</td>
                                        <td>{elm.Designation}</td>
                                        <td style={{textTransform:'capitalize'}}>{elm.AvailabilityStatus}</td>
                                        <td>{elm.CreatedOn}</td>
                                        <td className='nowrap'>{elm.TeamName}</td>
                                        <td>{(elm.IsAdministrator==='true') ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}

export default Users