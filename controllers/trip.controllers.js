const router = require("express").Router()
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')
const { findById } = require("../models/user")
const multer = require('multer')


const upload = multer({dest: './uploads/'})



router.get('/new', isSignedIn,  (req, res)=>{
    try{
  res.render('trip/create-trip.ejs')
    } catch(err){
        console.log('ERROR:', err)
    }
    
})

router.post('/new', isSignedIn, upload.single('photo'), async (req, res)=>{
    try{
        if(new Date (req.body.endDate) < new Date (req.body.startDate)){
            return res.send('End date cannot be before start date')
        }
        console.log(req.body) 
        console.log(req.file) 
        const photoPath = req.file.path
        const newTrip = await Trip.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: req.file.path,
        owner: req.session.user._id
    })
    res.redirect('/trip')
    } catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/', isSignedIn, async (req, res)=>{
    try{
        const foundAllTrips = await Trip.find({owner: req.session.user._id})
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

router.put('/:tripId', isSignedIn, async (req, res)=>{
    try{
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.tripId, {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: req.body.photo,
        })

        res.redirect('/trip')
    }catch(err){
        console.log('ERROR:', err)}
})

router.delete('/:tripId', isSignedIn, async (req, res)=>{
    try{
    const deleteTrip = await Trip.findByIdAndDelete(req.params.tripId)
    res.redirect('/trip')
    }catch(err){
        console.log('ERROR:', err)
    }
    
})
module.exports = router;
