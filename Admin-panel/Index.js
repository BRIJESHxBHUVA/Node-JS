const express = require('express');
const app = express();
const port = 3000
const db = require('./Server/Server')
const path = require('path')
app.use(express.urlencoded());
app.set('view engine', 'ejs');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use("/", require('./Routes/Routing'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/productimages', express.static(path.join(__dirname,'productimages')))

app.listen(port, (err)=>{
if(err){
    console.log('port listening error : ', err)
}else{
    console.log(`listening on port ${port}`)
}
})