const router = require("express").Router()
const Destination = require('../models/Destination')
const Trip = require('../models/Trip')
const Activity = require('../models/Activity')
const isSignedIn = require("../middleware/is-signed-in")

router.get('/new', isSignedIn, async(req,res)=>{
    try{
        const currentTrip = req.params.tripId
        const foundTrips = await Trip.find()
        const foundDestinations = await Destination.find()
        res.render('activity/new-activity.ejs', {
            currentTrip: currentTrip,
            trips: foundTrips,
            destinations: foundDestinations
        })
    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
