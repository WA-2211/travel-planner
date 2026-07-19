const router = require('express').Router()
const Destination = require('../models/Destination')
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, (req, res)=>{
    try{
        res.render('destination/create-destination.ejs')
    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
