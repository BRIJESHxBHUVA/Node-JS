const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    res.render('index')
})

app.listen(1800, ()=> {
    console.log('Server is running on port 1800');
})