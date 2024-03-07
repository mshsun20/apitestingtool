const express = require('express')
const router = express.Router()
const session = require('express-session')
const UsrController = require('../controllers/usrCntrlr')
const AuthMiddleware = require('../middlewares/authMidware')
const SrvcController = require('../controllers/srvcCntrlr')
const LeadController = require('../controllers/leadController')


// get ping check
// ________________________________________________________________
// ----------------------------------------------------------------
router.route('/').get((req, res) => {
    res.json({message:`Server is Live...`, statuscode:200})
})
router.route('/chckstat').get((req, res) => {
    res.json({message:`Server is Online Now...`, statuscode:200})
})
// ________________________________________________________________
// ----------------------------------------------------------------


// get
// ________________________________________________________________
// ----------------------------------------------------------------
// admin
router.route('/srvc/fetch').get(SrvcController.read)
router.route('/featr/fetch').get()
router.route('/pln/fetch').get()
router.route('/faq/fetch').get(SrvcController.read)
router.route('/leads/get').get(LeadController.read)

// client
// router.route('/user/sess/:tokn').get(AuthMiddleware, async (req, res) => {
//     console.log(req.usrdtl)
//     if (req.usrdtl) {
//         res.json({message:`User Already Logged In.`, statuscode:220, user:req.usrdtl})
//     }
//     else {
//         res.json({message:`User Not Yet Loged In...!`, statuscode:422})
//     }
// })
router.route('/user/sess/:tokn').get(UsrController.sess)
router.route('/user/logout').get(UsrController.logout)



// post
// ________________________________________________________________
// ----------------------------------------------------------------
// admin
router.route('/admin/user/add').post(UsrController.create)
router.route('/srvc/create').post(SrvcController.create)
router.route('/featr/create').post()
router.route('/pln/create').post()
router.route('/faq/create').post(SrvcController.create)
router.route('/leads/add').post(LeadController.add)

// client
router.route('/user/create').post(UsrController.create)
router.route('/user/login').post(UsrController.login)




// put
// ________________________________________________________________
// ----------------------------------------------------------------
// admin

// client



// delete
// ________________________________________________________________
// ----------------------------------------------------------------
// admin

// client




module.exports = router