const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    trip:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination