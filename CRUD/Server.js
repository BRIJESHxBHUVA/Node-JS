const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Employee-CRUD')

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log('Database Connection error say: ', err);        
    }
    else{
        console.log('Database Connecting to mongodb server.');
        
    }
})

module.exports = db;