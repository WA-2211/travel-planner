const router = require('express').Router()
const Destination = require('../models/Destination')
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, async (req, res)=>{
    try{
        const currentTrip = req.params.tripId
        const foundAllTrips = await Trip.find({owner: req.session.user._id})
        res.render('destination/create-destination.ejs', {
            trips: foundAllTrips,
            currentTrip: currentTrip
        
        })
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.post('/new', isSignedIn, async (req,res)=>{
    try{
        const foundOneTrip = await Trip.findById(req.body.trip)
        if(!foundOneTrip.owner.equals(req.session.user._id)){
             return res.send('Authorization Failed!')
        }

        const newDestination = await Destination.create({
            country: req.body.country,
            city: req.body.city,
            trip: req.body.trip,
            owner: req.session.user._id
        })
        console.log(newDestination)
        res.redirect('/destination')
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/', isSignedIn, async (req, res)=>{
    try{

        const currentTrip = req.params.tripId
        const foundAllDestinations = await Destination.find({owner: req.session.user._id}).populate('trip')
        console.log(foundAllDestinations)
        res.render('destination/all-destinations.ejs', {destinations: foundAllDestinations, currentTrip: currentTrip})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:destinationId/edit', isSignedIn, async(req, res)=>{
    try{
        const foundOneDestination = await Destination.findById(req.params.destinationId).populate('trip')
        if(!foundOneDestination.owner.equals(req.session.user._id)){
            return res.send('Authorization Failed')
        }

        res.render('destination/destination-edit.ejs', {destination: foundOneDestination})
    }catch(err){
        console.log('ERROR:', err)
    }
})
router.put('/:destinationId', isSignedIn, async(req, res)=>{
    
        try{
        const foundOneDestination = await Destination.findById(req.params.destinationId).populate('trip')
        if(!foundOneDestination.owner.equals(req.session.user._id)){
            return res.send('Authorization Failed')
        }

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
        const foundOneDestination = await Destination.findById(req.params.destinationId).populate('trip')
        if(!foundOneDestination.owner.equals(req.session.user._id)){
            return res.send('Authorization Failed!')
        }
        const deleteDestination = await Destination.findByIdAndDelete(req.params.destinationId)
        res.redirect('/destination')
    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
