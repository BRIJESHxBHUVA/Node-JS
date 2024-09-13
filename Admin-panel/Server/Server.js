const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Dashboard')

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log('Mongodb Connection Error.')
    }else{
        console.log('Connecting to Mongodb.')
    }
})