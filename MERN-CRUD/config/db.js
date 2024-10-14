const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/MERN')
const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Database connetion successfully.')
    }
})

module.exports = db