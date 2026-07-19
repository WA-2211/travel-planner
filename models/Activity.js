const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['Sightseeing', 'Adventure', 'Cultural', 'Relaxation', 'Educational', 'Entertainment', 'Dining']
    },

    dateOfActivity:{
        type: Date,
        required: true
    },
    timeOfActivity:{
        type: Date,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    trip:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    },
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    }
})

const Activity = mongoose.model('Activity', activitySchema)


module.exports = Activity