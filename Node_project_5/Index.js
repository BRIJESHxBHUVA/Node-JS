const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017', {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection; 
db.on("connected", (err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Connected to MongoDB");
    }
})

module.exports = db