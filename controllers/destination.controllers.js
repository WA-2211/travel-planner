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

router.post('/new', isSignedIn, async (req,res)=>{
    try{
        const newDestination = await Destination.create({
            country: req.body.country,
            city: req.body.city
        })

        res.redirect('/destination')
    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
