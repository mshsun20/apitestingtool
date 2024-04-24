const UsrModel = require('../models/usrModl')
const jwt =require('jsonwebtoken')
const AuthMiddleware = require('../middlewares/authMidware')

module.exports = {
    create: async (req, res) => {
        console.log(req.body)
        const {uname, ueml, upass, uphn, ufname, uaddr, ucntry, ustt, ucty, upin} = req.body

        try {
            const Usr = await UsrModel.create({uname, ueml, upass, uphn, ufname, uaddr, ucntry, ustt, ucty, upin})
            if (Usr) {
                res.json({success:`User Registered Successfully.`, statuscode:220})
            }
            else {
                res.json({error:`User Registration Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    login: async (req, res) => {
        // console.log(req.body)
        const {uname, upass} = req.body

        try {
            let token
            const Usr = await UsrModel.findOne({uname})
            if (!Usr) {
                res.json({error:`Username doesn't Exist...!`, statuscode:422})
            }
            else if (upass === Usr.upass) {
                token = await Usr.generateToken()
                // console.log(token)
                req.session.usracc = token
                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true 
                })
                res.json({success:`User Logged In Successfully.`, statuscode:220, token:token, user:req.session.usracc})
            }
            else {
                res.json({error:`Wrong Password Entry...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    sess: async (req, res) => {
        const token = req.params.tokn
        // console.log(token)
        try {
            if (token !== null) {
                const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY)
                // console.log(verifytoken)
                const usrdtl = await UsrModel.findOne({_id:verifytoken.uid, 'tokens.token': token})
                // console.log(usrdtl)
                if (usrdtl) {
                    res.json({message:`User Already Logged In.`, statuscode:220, user:usrdtl})
                }
                else {
                    res.json({message:`User Not Yet Loged In...!`, statuscode:422})
                }
            }
            else {
                res.json({message:`User Not Yet Loged In...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    logout: async (req, res) => {
        req.session.destroy((err) => res.redirect('/'))
        res.clearCookie('jwtoken', {path:'/'})
        res.clearCookie('connect.sid', {path:'/'})
    },
    read: async (req, res) => {},
    update: async (req, res) => {},
    delete: async (req, res) => {},
}