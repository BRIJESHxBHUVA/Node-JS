const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MULTERCRUD')
const db = mongoose.connection;

db.once('open', (err)=> {
    if(err){
        console.log('Mongodb connection error says: ', err);
    }
    else{
        console.log('Server connected successfully to mongodb.');
    }
})

module.exports = db; 