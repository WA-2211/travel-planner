const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    title:{
        type: String,
        maxLength: 35,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    photo:{
        type: String

    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip