const mongoose = require('mongoose')

const mongoURL = "mongodb+srv://shahzainHaider:SHazain1@inotebookc.egr5kdo.mongodb.net/users"

   const connectToMongo= ()=>{
       mongoose.connect(mongoURL)
       .then(function(db){
           console.log('connected to db')
       }).catch(function(err){
           console.log(err)
       })
   }

module.exports=connectToMongo;