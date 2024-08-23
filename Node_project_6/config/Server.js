const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD')

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log("Server running error says : ", err)
    }
    else{
        console.log("Server running successfully")
    }
})

module.exports = db