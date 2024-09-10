const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Adminpanel')
const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log('Mongodb connection error', err)
    }else{
        console.log("Mongodb connection successfull.");
    }
})

module.exports = db