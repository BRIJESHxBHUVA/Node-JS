const express = require('express')
const app = express();
const port = 3000;
const db = require('./Server/Server')
const Modal = require('./Model/Modal')
const path = require('path')
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', require('./Routes/Routing'))
app.use('/movieimages', express.static(path.join(__dirname, 'movieimages')))


app.listen(port, ()=> {
    try{
        console.log(`Server starting on port ${port}`);
    }
    catch(err){   
        console.log('Server starting error says: ', err);
    }
})