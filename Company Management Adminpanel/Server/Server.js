const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Company-Adminpanel')
const db = mongoose.connection

db.once('open', (err)=>{
    if(err){
        console.log('Database connection error: ',err);
    }else{
        console.log('Database connection successfully.')
    }
})

module.exports = db