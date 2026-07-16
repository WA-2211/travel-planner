const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum: ['Flight', 'Hotel', 'restaurant']
    },
    cost:{
        type: Number, 
        required: true,
        min: 0.5
    },
    date:{
        type: Date
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking