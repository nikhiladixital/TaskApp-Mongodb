//WE ARE GONNA LEARN "CRUD": Create Read Update Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID


// DESTRUCTURING ALL THE ABOVE THREE LINES OF CODE TO ONE LINE OF CODE
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error)
    {
        return console.log('Unable to connect to database!')
    }
    
    const db = client.db(databaseName)

    //  INSERTING ONE DOCUMENT FOR USERS COLLECTION
            // db.collection('users').insertOne({
            //     name: 'Nishanth',
            //     age: 27
            // }, (error, result) => {
            //     if(error)
            //     {
            //         return console.log('Unable to insert user!')
            //     }
            //     console.log(result.ops)
            // })

    //  INSERTING MANY DOCUMENTS FOR USERS COLLECTION
        //     db.collection('users').insertMany([
        //         {
        //             name: 'Nikhila',
        //             age: 27
        //         },
        //         {
        //             name: 'Anudeep',
        //             age: 29
        //         },
        //         {
        //                 name : 'Nishanth',
        //                 age: 27
        //         }
        //     ], (error, result) => {
        //         if(error)
        //         {
        //             return console.log('Unable to insert documents!')
        //         }
        //         console.log(result.ops)
        //     })

    //  INSERTING MANY DOCUMENTS FOR TASKS COLLECTION
            // db.collection('tasks').insertMany([
            //     {
            //         description: "Do dishes",
            //         completed: false
            //     },
            //     {
            //         description: "Make your bed",
            //         completed: true
            //     },
            //     {
            //         description: "Laundry",
            //         completed: false
            //     }
            // ], (error, result) => {
            //     if(error)
            //     {
            //         return console.log('Unable to insert the mentioned documents!')
            //     }
            //     console.log(result.ops)
            // })

    // FETCHING ONE DOCUMENT FROM USERS COLLECTION
            // db.collection('users').findOne({_id: new ObjectID("5e207b3a0e876d0a34f42e53")}, (error, user)=>{
            //     if(error)
            //     {
            //         return console.log('Unable to fetch!')
            //     }

            //     console.log(user)
            // })

    // FETCHING DATA NOT BY ID (BECAUSE IT WOULD ONLY FETCH ONE FIELD THEN), INSTEAD FETCHING DATA FROM USERS COLLECTION 
    // BY POINTING TO A CURSOR THAT READS A CATEGORY THAT WE SPECIFY BELOW AND RETURNS ALL THAT MATCH THAT CRITERIA
            // db.collection('users').find({age:27}).toArray((error, users)=>{
            //     console.log(users)
            // })

    // GETTING THE COUNT OF FETCHED DATA FROM USERS COLLECTION
    // WE DONT HAVE TO FETCH ALL DATA, STORE THEM IN A MEMORY TO OBTAIN THE COUNT
    // INSTEAD MONGODB HAS THE CURSOR FEATURE TO DO IT ALL FOR US
    //  WE JUST NEED TO POINT TO IT & ASK FOR ITS COUNT
            // db.collection('users').find({age:27}).count((error, count)=>{
            //     console.log(count)
            // })
    
    // FETCHING ONE DOCUMENT FROM USERS COLLECTION
            // db.collection('tasks').findOne({_id: new ObjectID("5e207b3a0e876d0a34f42e57")}, (error,task)=>{
            //     if(error)
            //     {
            //         return console.log('Unable to fetch the requested task!')
            //     }
            //     console.log(task)
            // })

    // FETCHING DATA FROM TASKS COLLECTION BY POINTING TO THE CURSOR USING A SPECIFIED CATEGORY
            // db.collection('tasks').find({completed:false}).toArray((error,task)=>{
            //     console.log(task)        
            // })

    // UPDATING DATA IN USERS COLLECTION TO A PARTICULAR DOCUMENT - REFERENCING THAT PARTICULAR DOCUMENT BY ITS ID
                // db.collection('users').updateOne({
                //            _id: new ObjectID("5e207b3a0e876d0a34f42e54")
                //         },{
                //            $inc:{
                //                    age:1
                //            }
                //    }).then((result)=>{
                //         console.log(result)
                //    }).catch((error)=>{
                //         console.log(error)
                //    })

        // UPDATING MANY FIELDS IN A COLLECTION 
                // db.collection('tasks').updateMany({
                //         completed: false
                // },{
                //         $set: {
                //                 completed: true
                //         }
                // }).then((result)=>{
                //         console.log(result)
                // }).catch((error)=>{
                //         console.log(error)
                // })
        // DELETING MANY FIELDS BY MATCHING A CERTAIN CRITERIA
                // db.collection('users').deleteMany({
                //         age: 27
                // }).then((result)=>{
                //         console.log(result)
                // }).catch((error)=>{
                //         console.log(error)
                // })

        // DELETING ONE FIELD IN USERS COLLECTION BY MATCHING A CERTAIN CRITERIA
                // db.collection('tasks').deleteOne({
                //         description: "Do dishes"
                // }).then((result)=>{

                //         console.log(result)
                // }).catch((error)=>{
                //         console.log(error)
                // })
})