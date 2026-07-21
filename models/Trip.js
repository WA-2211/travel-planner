const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    title:{
        type: String,
        minlength: 4,
        maxlength: 100,
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
        type: String,
        data: Buffer
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip