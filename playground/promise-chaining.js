require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e2a082b1274ad3c340d164b', {age : 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age : 1})

// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeandCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, {age:age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeandCount('5e2a082b1274ad3c340d164b', 2).then((result)=>{
 console.log(result)
}).catch((e)=>{
    console.log(e)
})