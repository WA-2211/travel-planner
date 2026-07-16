const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
})

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination