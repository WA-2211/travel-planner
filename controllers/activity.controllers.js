const router = require("express").Router()
const Destination = require('../models/Destination')
const Trip = require('../models/Trip')
const Activity = require('../models/Activity')
const isSignedIn = require("../middleware/is-signed-in")

router.get('/:tripId/activity/new', isSignedIn, async(req,res)=>{
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

router.post('/:tripId/activity/new', isSignedIn, async (req, res)=>{
    try{
        const dateTime = new Date(`${req.body.dateOfActivity}T${req.body.timeOfActivity}`) //form gives me date and time, so i merged them into one date and stored them as dateTime
        const newActivity = await Activity.create({
            name: req.body.name,
            type: req.body.type,
            timeOfActivity: dateTime,
            cost: req.body.cost,
            trip: req.body.trip,
            destination: req.body.destination
        })

        res.redirect(`/trip/${req.params.tripId}/activity`)
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId/activity', isSignedIn, async (req, res)=>{
    try{

        const currentTrip = req.params.tripId
        const foundAllActivities = await Activity.find()
        res.render('activity/all-activities.ejs', {
            activities: foundAllActivities,
            currentTrip: currentTrip
        })
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId/activity/:activityId', isSignedIn, async (req, res)=>{
    try{
        const currentTrip = req.params.tripId
        const foundOneActivity = await Activity.findById(req.params.activityId).populate('trip').populate('destination')
        console.log(foundOneActivity)
        res.render('activity/activity-details.ejs', {
            activity: foundOneActivity,
            currentTrip:currentTrip})
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.get('/:tripId/activity/:activityId/edit', isSignedIn, async (req, res)=>{
    try{
        const foundTrips = await Trip.find()
        const currentTrip = req.params.tripId
        const activityTypes = ['Sightseeing', 'Adventure', 'Cultural', 'Relaxation', 'Educational', 'Entertainment', 'Dining']
        const foundDestinations = await Destination.find()
        const foundOneActivity = await Activity.findById(req.params.activityId).populate('trip').populate('destination')
        res.render('activity/edit-activity.ejs', {
            activity: foundOneActivity,
            currentTrip: currentTrip,
            trips: foundTrips,
            destinations: foundDestinations,
            types: activityTypes
        })
    }catch(err){
        console.log('ERROR:', err)
    }
})

router.delete('/:tripId/activity/:activityId', isSignedIn, async (req, res)=>{
    try{
        const deleteActivity = await Activity.findByIdAndDelete(req.params.activityId)
        res.redirect(`/trip/${req.params.tripId}/activity`)
    }catch(err){
        console.log('ERROR:', err)
    }
})
module.exports = router;
