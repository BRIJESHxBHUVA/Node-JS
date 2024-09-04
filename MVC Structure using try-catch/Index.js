const express = require('express')
const app = express();
const path = require('path')
const port = 3000;
const db = require('./Server/Server');
const ModalSchema = require('./Model/ModalSchema');
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', require('./Routes/Routing'));

app.use('/image', express.static(path.join(__dirname, 'image')));

app.listen(port, (err)=>{
    if(err){
        console.log('Server starting error says: ', err)
    }
    else{
        console.log(`Server starting on port ${port}`);
    }
})