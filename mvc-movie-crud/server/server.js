const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MVC-MOVIE')
// mongoose.connect('mongodb+srv://bhuvabrijesh14:255GMISFfyND7Cmm@brijesh.srfbz.mongodb.net/mydatabase?retryWrites=true&w=majority')

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