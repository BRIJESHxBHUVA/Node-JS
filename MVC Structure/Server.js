const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MVC STRUCTURE')

const db = mongoose.connection;

db.once('open', (err)=> {
    if(err){
        console.log('Server is not connect to mongodb.', err);
    }
    else{
        console.log('Server is successfully connection to mongodb.');
    }
})