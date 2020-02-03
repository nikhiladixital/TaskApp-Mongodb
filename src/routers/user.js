const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//-------------------------------------------------------------- TO CREATE A NEW USER IN USERS COLLECTION
router.post('/users', async (req,res) => {
    const user = new User(req.body)
    try{
         await user.save()
         const token = await user.generateAuthToken()
         res.status(201).send({user , token})  
    }catch(e){
         res.status(400).send(e)
    }
 })

//  ------------------------------------------------------------ TO GENERATE A NEW TOKEN WITH EVERY DOCUMENT IN A COLLECTION WHEN WE FIRE OFF A REQUEST
 router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
 })
 
 //----------------------------------------------------------------- TO READ/FETCH ALL USERS FROM USERS COLLECTION
//  router.get('/users', async (req,res) => {
//     try{
//         const users = await User.find({})
//         res.send(users)
//     }catch(e)
//     {
//         res.status(500).send(e)
//     } 
// })

// ------------------------------------------------------------------- TO AUTHENTICATE (USING TOKEN) AND LOG OUT A USER
router.post('/users/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// --------------------------------------------------------------------- TO AUTHENTICATE AND LOG OUT ALL USERS
router.post('/users/logoutall', auth, async(req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// ---------------------------------------------------------------- TO AUTHENTICATE A PARTICULAR USER WITH A UNIQUE TOKEN
// ---------------------------------------------------------------- YOU DON'T WANT ANY USER TO SEE ALL USER DETAILS IN THE DATABASE
//  --------------------------------------------------------------- YOU SHOULD BE ABLE TO SEE ONLY YOUR USER DETAILS AND TASKS , NOT EVERYONE'S.
// ---------------------------------------------------------------- SO, WE USE THIS CODE INSTEAD OF ABOVE USERS COLLECTION CODE.
 router.get('/users/me', auth, async (req, res) =>{
     res.send(req.user)
 })
 
 //------------------------------------------------------------------ TO READ/FETCH A USER BY ID FROM USERS COLLECTION
//  router.get('/users/:id', async (req,res) =>{
//      const _id = req.params.id
//      try{
//          const user = await User.findById(_id)
//          if(!user)
//          {
//              return res.status(404).send()
//          }
//          res.send(user)
         
//      }catch(e){
//          res.status(500).send(e)
//      }
//  })
 
 //------------------------------------------------------------------- TO UPDATE A USER BY ID & ERROR HANDLING IN CASE INVALID INFORMATION IS PROVIDED
 router.patch('/users/me', auth, async (req, res)=>{
     const updates = Object.keys(req.body)
     const allowedUpdates = ['name', 'email', 'password', 'age']
     const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
 
     if(!isValidOperation)
     {
         return res.status(400).send({error:'Invalid updates!'})
     }
 
     try{   
         updates.forEach((update)=> req.user[update] = req.body[update])
         await req.user.save()
         res.send(req.user)
     }catch(e){
         res.status(400).send(e)
     }
 })
 
 //----------------------------------------------------------------------------TO DELETE A USER BY ID FROM USERS COLLECTION
 router.delete('/users/me', auth, async (req,res)=>{
     try{
         await req.user.remove()
         res.send(req.user)
     }catch(e)
         {
             res.status(500).send(e)
         }
 })
 

module.exports = router