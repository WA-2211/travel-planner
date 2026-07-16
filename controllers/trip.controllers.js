const router = require("express").Router()
const Trip = require('../models/Trip')

router.get('/new', async (req, res)=>{
    const newTrip = await Trip.create() 
    res.render('trip/create-trip.ejs')
})

module.exports = router;
