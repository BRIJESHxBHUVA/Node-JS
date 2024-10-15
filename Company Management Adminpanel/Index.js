const express = require('express');
const app = express();
// const dotenv = require('dotenv')
// const PORT = process.env.PORT || 3000;
const db = require('./Server/Server')
const PORT = 1800
const path = require('path')
// dotenv.config()
app.use(express.urlencoded());
app.use(express.json())
app.use('/company', require('./Routes/Routing'))
app.use('/Images' ,express.static(path.join(__dirname, 'Images')))

app.listen(PORT, (err)=>{
    if(err) {
        console.log('Server Starting Error', err)
    }else{
        console.log('Server Starting on Port :', PORT)
    }
})