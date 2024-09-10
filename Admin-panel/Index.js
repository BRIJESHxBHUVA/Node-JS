const express = require('express');
const app = express();
const db = require('./Server/Server')
const port = 4000;
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.urlencoded());
app.use('/', require('./Routes/Routing'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, (err)=>{
    if(err){
        console.log('server running error.', err)
    }else{
        console.log(`Server running on port ${port}`)
    }
})