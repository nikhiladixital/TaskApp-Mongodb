const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

//------------------------------------------------------------------------ TO CREATE A NEW TASK IN TASKS COLLECTION
router.post('/tasks', auth, async (req,res) =>{
    const task = new Task({...req.body, owner: req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//-------------------------------------------------------------------------- TO READ/FETCH ALL TASKS FROM TASKS COLLECTION
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

//--------------------------------------------------------------------------- TO READ/FETCH A TASK BY ID FROM TASKS COLLECTION
router.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

//---------------------------------------------------------------------------- TO UPDATE A TASK BY ID & ERROR HANDLING IN CASE INVALID INFORMATION IS PROVIDED
router.patch('/tasks/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation)
    {
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

// DELETING A TASK BY ID FROM TASKS COLLECTION
router.delete('/tasks/:id', async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task)
        {
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router