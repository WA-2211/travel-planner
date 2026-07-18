const router = require("express").Router()
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')
const { findById } = require("../models/user")

router.get('/new', isSignedIn,  (req, res)=>{
    try{
  res.render('trip/create-trip.ejs')
    } catch(err){
        console.log('ERROR:', err)
    }
    
})

router.post('/new', isSignedIn, async (req, res)=>{
    try{
        console.log(req.body)
    const newTrip = await Trip.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: req.body.photo,
        owner: req.session.user._id
    }) 
    res.redirect('/trip')
    } catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/', isSignedIn, async (req, res)=>{
    try{
        const foundAllTrips = await Trip.find()
        res.render('trip/all-trips.ejs', {trips: foundAllTrips})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId',isSignedIn, async (req, res)=>{
    try{
        const foundOneTrip = await Trip.findById(req.params.tripId)
        res.render('trip/trip-details.ejs', {trip: foundOneTrip})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId/edit', isSignedIn, async (req,res)=>{
    try{
        const foundOneTrip = await Trip.findById(req.params.tripId)
        res.render('trip/trip-edit.ejs',{trip: foundOneTrip} )
    }catch(err){
            console.log('ERROR:', err)
    }
})
module.exports = router;
