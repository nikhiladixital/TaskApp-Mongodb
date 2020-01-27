require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e29e57ea5c276373060f218').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// }) 

const deleteTaskandCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskandCount('5e29f0df3a0306367429f943').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})