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

    timeOfActivity:{
        type: Date,
        required: true
    },
    cost:{
        type: Number,
        required: True
    }
})

const Activity = mongoose.model('Activity', activitySchema)


module.exports = Activity