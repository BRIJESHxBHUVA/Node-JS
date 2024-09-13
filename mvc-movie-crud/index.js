const express = require('express')
const app = express();
const port = 5000;
const db = require('./server/server')
const Modal = require('./model/modal')
const path = require('path')
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', require('./routes/routing'))
app.use('/movieimages', express.static(path.join(__dirname, 'movieimages')))
app.use('/images', express.static(path.join(__dirname, 'images')))


app.listen(port, ()=> {
    try{
        console.log(`Server starting on port ${port}`);
    }
    catch(err){   
        console.log('Server starting error says: ', err);
    }
})