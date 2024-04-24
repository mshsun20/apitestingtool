import { useState, useEffect, useReducer } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/Leads.css'
import axios from 'axios'
import server from '../../server'
import moment from 'moment'
import ReactPaginate from 'react-paginate'

// const inistate = 1
// const reducer = (state, action) => {
//     console.log(state, action)
//     switch (action.type) {
//         case 'next':
//             return state+1
//         case 'prev':
//             return state-1
//         default:
//             throw new Error()
//     }
// }

const Leads = () => {
    // pagiantion states
    const [page, setPage] = useState('')
    const [itms, setItms] = useState()
    const [npg, setNpg] = useState()
    const [lds, setLds] = useState()
    const recordsPerPage = 5000

    let host = 'https://api-in21.leadsquared.com/v2/'
    let requrl = 'LeadManagement.svc/Leads.RecentlyModified'
    let accessKey = 'u$r80dceccd180f2da9118ae76188aa80af'
    let secretKey = '3597246096083d1d798c1d133356f107a751106c'
    let apiurl = `${host}${requrl}?accessKey=${accessKey}&secretKey=${secretKey}`
    let todt = moment().format('YYYY-MM-DD HH:mm:ss')

    // let apibody = {
    //     "Parameter": {
    //         "FromDate": "2023-01-01 01:00:00",
    //         "ToDate": `${todt}`
    //     },
    //     "Columns": {
    //         "Include_CSV": "ProspectID,FirstName,Phone,EmailAddress,CreatedOn,ProspectStage,mx_Lead_Status,mx_Unique_ID,mx_Category,mx_Sub_Category,mx_Country,mx_State,mx_District,mx_City,mx_Pin_Code,mx_Medium,Source,mx_Campaign_Name,Origin,OwnerId,OwnerIdName,ProspectAutoId,mx_Product_Details,mx_Client_Description"
    //     },
    //     "Paging": {
    //         "PageIndex": `${page+1}`,
    //         "PageSize": `${recordsPerPage}`
    //     }
    // }

    const handlePageClick = (data) => {
        console.log(data.selected)
        setPage(data.selected)
    }
    const fetchdta = async () => {
        try {
            const res = await axios.post(apiurl, page ? {
                "Parameter": {
                    "FromDate": "2023-01-01 01:00:00",
                    "ToDate": `${todt}`
                },
                "Columns": {
                    "Include_CSV": "ProspectID,FirstName,Phone,EmailAddress,CreatedOn,ProspectStage,mx_Sub_Category,mx_Country,mx_State,mx_Pin_Code,mx_Medium,OwnerId,OwnerIdName"
                },
                "Paging": {
                    "PageIndex": `${page+1}`,
                    "PageSize": `${recordsPerPage}`
                }
            } : {
                "Parameter": {
                    "FromDate": "2023-01-01 01:00:00",
                    "ToDate": `${todt}`
                },
                "Columns": {
                    "Include_CSV": "ProspectID,FirstName,Phone,EmailAddress,CreatedOn,ProspectStage,mx_Sub_Category,mx_Country,mx_State,mx_Pin_Code,mx_Medium,OwnerId,OwnerIdName"
                },
                "Paging": {
                    "PageIndex": 1,
                    "PageSize": `${recordsPerPage}`
                }
            })
            const dta = await res.data
            console.log(dta)
            // setItms(dta.RecordCount)
            // setNpg(Math.ceil(dta.RecordCount/recordsPerPage))
            // setLds(dta.Leads)

            dta.Leads.forEach(async (elmnt) => {
                const [ProspectID,FirstName,Phone,EmailAddress,CreatedOn,ProspectStage,mx_Sub_Category,mx_Country,mx_State,mx_Pin_Code,mx_Medium,OwnerId,OwnerIdName] = elmnt.LeadPropertyList
                const lprospid = ProspectID.Value
                const lfname = FirstName.Value
                const lphone = Phone.Value
                const lemail = EmailAddress.Value
                const lcreatedon = CreatedOn.Value
                const lstatus = ProspectStage.Value
                const lsubcat = mx_Sub_Category.Value
                const lcntry = mx_Country.Value
                const lstate = mx_State.Value
                const lpincod = mx_Pin_Code.Value
                const lmedium = mx_Medium.Value
                const lownrid = OwnerId.Value
                const lownrnam = OwnerIdName.Value

                const resld = await axios.post(`${server}/leads/add`, {lprospid, lfname, lphone, lemail, lcreatedon, lstatus, lsubcat, lcntry, lstate, lpincod, lmedium, lownrid, lownrnam})
                const ldta = await resld.data
                // console.log(ldta)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const getdta = async () => {
        try {
            const res = await axios.get(`${server}/leads/get`)
            const dta = await res.data
            console.log(dta.data)
            setItms(dta.data.length)
            setNpg(Math.ceil(dta.data.length/recordsPerPage))
            setLds(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        // fetchdta()
        getdta()
    }, [page])

  return (
    <>
        <div className="main">
            <div className="leads">
                <div className="hdr">Manage Leads</div>
                <div className="syndta"><button onClick={fetchdta}>Sync New Leads</button></div>
                <div className="records"><span style={{fontWeight:600}}>Total:</span> {itms} records</div>
                <div className="dtatbl">
                    <table>
                        <thead>
                            <tr>
                                <th>Propect Id</th>
                                <th>Firm Name</th>
                                <th>Primary Phone</th>
                                <th>Email Id</th>
                                <th>Created Date</th>
                                <th>Status</th>
                                <th>Sub Category</th>
                                <th>Country</th>
                                <th>Pin Code</th>
                                <th>Medium</th>
                                <th>Owner</th>
                                <th>Edit</th>
                                <th>Remove</th>
                                {
                                    // (lds) ? lds[0].LeadPropertyList.map((elm, i) => (
                                    //     <th key={i}>{elm.Attribute}</th>
                                    // )) : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (lds) ? lds.map((el, i) => (
                                    <tr className='' key={i}>
                                        <td>{el.lprospid}</td>
                                        <td>{el.lfname}</td>
                                        <td>{el.lphone}</td>
                                        <td>{el.lemail}</td>
                                        <td>{el.lcreatedon}</td>
                                        <td>{el.lstatus}</td>
                                        <td>{el.lsubcat}</td>
                                        <td>{el.lcntry}</td>
                                        <td>{el.lpincod}</td>
                                        <td>{el.lmedium}</td>
                                        <td>{el.lownrid}</td>
                                        <th>_</th>
                                        <th>X</th>
                                    </tr>
                                )) : null
                            }
                            {
                                // (lds) ? lds.map((elm, i) => (
                                //     <tr key={i}>
                                //         {
                                //             (elm) ? elm.LeadPropertyList.map((el, j) => (
                                //                 <td key={j}>{(el.Attribute === 'ProspectID') ? <NavLink className='lddtl' to={`/leaddet/${el.Value}`}>{el.Value}</NavLink> : el.Value}</td>
                                //             )) : null
                                //         }
                                //     </tr>
                                // )) : null
                            }
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ReactPaginate
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={npg ? npg : 1}
                        previousLabel="< prev"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        renderOnZeroPageCount={null}
                        activeClassName="active"
                    />
                </nav>
            </div>
        </div>
    </>
  )
}

export default Leads