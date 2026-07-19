const router = require('express').Router()
const Destination = require('../models/Destination')
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, async (req, res)=>{
    try{
        const foundAllTrips = await Trip.find()
        res.render('destination/create-destination.ejs', {trips: foundAllTrips})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.post('/new', isSignedIn, async (req,res)=>{
    try{
        const newDestination = await Destination.create({
            country: req.body.country,
            city: req.body.city,
            trip: req.body.trip
        })

        res.redirect('/destination')
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/', isSignedIn, async (req, res)=>{
    try{
        const foundAllDestinations = await Destination.find().populate('trip')
        res.render('destination/all-destinations.ejs', {destinations: foundAllDestinations})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:destinationId/edit', isSignedIn, async(req, res)=>{
    try{
        const foundOneDestination = await Destination.findById(req.params.destinationId).populate('trip')
        res.render('destination/destination-edit.ejs', {destination: foundOneDestination})
    }catch(err){
        console.log('ERROR:', err)
    }
})
router.put('/:destinationId', isSignedIn, async(req, res)=>{
    
        try{
        const updatedDestination = await Destination.findByIdAndUpdate(req.params.destinationId, {
        country: req.body.country,
        city: req.body.city
        })

        res.redirect('/destination')
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.delete('/:destinationId', isSignedIn, async (req, res)=>{
    try{
        const deleteDestination = await Destination.findByIdAndDelete(req.params.destinationId)
        res.redirect('/destination')
    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
