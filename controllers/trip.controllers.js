const router = require("express").Router()
const Trip = require('../models/Trip')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, async (req, res)=>{
    try{
  res.render('trip/create-trip.ejs')
    } catch(err){
        console.log('ERROR:', err)
    }
    
})

router.post('/trip', isSignedIn,async (req, res)=>{
    try{
    const newTrip = await Trip.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: req.body.photo,
        owner: req.session.user._id
    }) 
    console.log(newTrip)
    res.redirect('/trip')
    } catch(err){
        console.log('ERROR:', err)
    }
})



module.exports = router;
