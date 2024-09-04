const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/MVC')
const db = mongoose.connection;

db.once('open', ()=>{
    try{
        console.log('Server Connecting Successfully to Mongodb.');     
    }
    catch(err){
        console.log('Mongodb Connection error says: ', err); 
    }
})

module.exports = db