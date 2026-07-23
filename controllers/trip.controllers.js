const router = require("express").Router()
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')
const multer = require('multer')


const upload = multer({dest: './uploads/'})



router.get('/new', isSignedIn,  async (req, res)=>{
    try{
        const foundTrips = await Trip.find()
       res.render('trip/create-trip.ejs', {trip:foundTrips})
    } catch(err){
        console.log('ERROR:', err)
    }
    
})

router.post('/new', isSignedIn, upload.single('photo'), async (req, res)=>{
    try{
        if(new Date (req.body.endDate) < new Date (req.body.startDate)){
            return res.send('End date cannot be before start date')
        }

        let photo
        if(!req.file){
            photo = null
        }

        else{
            photo = req.file.path
        }
        console.log(req.body) 
        console.log(req.file) 
        const newTrip = await Trip.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: photo,
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


router.put('/:tripId', isSignedIn, upload.single('photo'), async (req, res)=>{
    try{

        const foundOneTrip = await Trip.findById(req.params.tripId)

        if(!foundOneTrip.owner === req.session.user ){
            res.send('Authorization Failed!')
        }
        let photo
        if(!req.file){
            photo = null
        }

        else{
            photo = req.file.path
        }        
        const updatedTripData =  {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: photo
        
        }
       

        await Trip.findByIdAndUpdate(foundOneTrip,updatedTripData)
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
