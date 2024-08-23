const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookDetail')

const db = mongoose.connection;

db.once('open', (err)=> {
    err ? console.log('Database connection err', err) : console.log('Database connection to mongodb');
})

module.exports = db;