const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// -------------------------------------------------------------------TO REGISTER A NEW MIDDLEWARE TO DISABLE GET REQUESTS IN POSTMAN
// app.use((req, res, next) => {
//     if(req.method === 'GET')
//     {
//         res.send('GET requests are disabled!')
//     }
//     else
//     {
//         next()
//     }
// })

// -------------------------------------------------------------------------TO REGISTER A NEW MIDDLEWARE TO DISPLAY MAINTENANCE MESSAGE IN POSTMAN WHEN WE FIRE OFF ANY REQUEST
// app.use((req, res, next) => {
//     res.status(503).send('This site is currently under maintenance, please try back soon!')   
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () =>{
    console.log('Server is up on port' + port)
})