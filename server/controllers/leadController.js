const LeadModel = require('../models/leadModel')

module.exports = {
    create: async (req, res) => {},
    add: async (req, res) => {
        // console.log(req.body)
        const {lprospid, lfname, lphone, lemail, lcreatedon, lstatus, lsubcat, lcntry, lstate, lpincod, lmedium, lownrid, lownrnam} = req.body

        try {
            const chckLds = await LeadModel.findOne({lprospid})
            if (chckLds) {
                const chngLds = await LeadModel.findOneAndUpdate({_id:chckLds._id}, {lfname, lphone, lemail, lcreatedon, lstatus, lsubcat, lcntry, lstate, lpincod, lmedium, lownrid, lownrnam})
                if (chngLds) {
                    res.json({message:`Existing Lead data Updated successfully.`, statuscode:230})
                }
                else {
                    res.json({message:`Existing Lead data Updated failed...!`, statuscode:430})
                }
            }
            else {
                const Ldta = await LeadModel.create({lprospid, lfname, lphone, lemail, lcreatedon, lstatus, lsubcat, lcntry, lstate, lpincod, lmedium, lownrid, lownrnam})
                if (Ldta) {
                    res.json({message:`Lead data Added successfully.`, statuscode:220})
                }
                else {
                    res.json({message:`Lead data Sync Failed...!`, statuscode:420})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    read: async (req, res) => {
        try {
            const Ldta = await LeadModel.find()
            res.json({message:`All Lead data fetched successfully.`, statuscode:220, data:Ldta})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {}
}