const express = require('express')
const path = require('path')
const db = require('./Server/Server')
const port = 1800

const app = express();


app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.use('/', require('./Route/Routing'))


app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, (err) => {
    if (err) {
        console.log('port listening error : ', err)
    } else {
        console.log(`listening on port ${port}`)
    }
})