const express = require('express');
const app = express();
const route = require('./Route')
app.use(express.urlencoded())
app.set('view engine', 'ejs')
const db = require('./Server')

app.use('/', route)

app.listen(3000, (err)=> {
    if(err){
        console.log(err);
    }
    else{
        console.log('Server is running on port 3000');
    }
})