const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/MVC')
const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log('Mongodb Connection error says: ', err);        
    }
    else{
        console.log('Server Connecting Successfully to Mongodb.');
    }
})

module.exports = db