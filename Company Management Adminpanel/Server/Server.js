const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/Company-Adminpanel')
mongoose.connect('mongodb+srv://bhuvabrijesh14:xqkkoNsKgwvU22TD@company-management-dash.7azyk.mongodb.net/?retryWrites=true&w=majority&appName=company-management-dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection

db.once('open', (err)=>{
    if(err){
        console.log('Database connection error: ',err);
    }else{
        console.log('Database connection successfully.')
    }
})

module.exports = db