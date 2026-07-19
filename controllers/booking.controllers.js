const router = require("express").Router()
const Booking = require('../models/Booking')
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/:tripId/booking/new', isSignedIn, async (req, res)=>{
    try{
        const currentTrip = req.params.tripId
        const foundTrips = await Trip.find()
        res.render('booking/new-booking.ejs',{
            trips: foundTrips,
            currentTrip: currentTrip
        })
    }catch(err){
        console.log('ERROR:', err)
    }
})


router.post('/:tripId/booking/new', isSignedIn, async(req, res)=>{
    try{
        const newBooking = await Booking.create({
            type: req.body.type,
            cost: req.body.cost,
            date: req.body.date,
            trip: req.body.trip
        })
        res.redirect(`/trip/${req.params.tripId}/booking`)
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId/booking', isSignedIn, async (req,res)=>{

    try{

        const currentTrip = req.params.tripId
        const foundAllBooking = await Booking.find({trip: currentTrip}).populate('trip')
        res.render('booking/all-bookings.ejs', {bookings: foundAllBooking, currentTrip: currentTrip})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId/booking/:bookingId/edit', isSignedIn, async (req, res)=>{
    try{
        const foundTrips = await Trip.find()
        const currentTrip = req.params.tripId
        const foundOneBooking = await Booking.findById(req.params.bookingId) 
        const bookingTypes = ['Flight', 'Hotel', 'Restaurant']
        res.render('booking/edit-booking.ejs', {
            booking: foundOneBooking,
            currentTrip: currentTrip,
            trips: foundTrips,
            types: bookingTypes
         })
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.put('/:tripId/booking/:bookingId', isSignedIn, async (req, res)=>{
    try{
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.bookingId, {
        type: req.body.type,
        cost: req.body.cost,
        date: req.body.date,
        trip: req.body.trip
    })
    res.redirect(`/trip/${req.params.tripId}/booking`)

    }catch(err){
        console.log('ERROR:', err)
    }
})

router.delete('/:tripId/booking/:bookingId', isSignedIn, async (req,res)=>{
    try{
    const deleteBooking = await Booking.findByIdAndDelete(req.params.bookingId)
    res.redirect(`/trip/${req.params.tripId}/booking`)

    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
