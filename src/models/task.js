const mongoose = require('mongoose')

//----------------------------------------------- CREATING A MODEL FOR TASKS COLLECTION
const Task = mongoose.model('Task', {
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type : Boolean,
        default: false
    }
})

module.exports = Task