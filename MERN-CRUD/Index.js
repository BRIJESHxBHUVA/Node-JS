const express = require('express')
const port = 5000
const app = express()
const db = require('./config/db')
const path = require('path')

app.use(express.urlencoded())
app.use('/', require('./Routes/Routing'))
app.use('/images/admin/', express.static(path.join(__dirname, 'images/admin')))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server starting on port ${port}`)
    }
})