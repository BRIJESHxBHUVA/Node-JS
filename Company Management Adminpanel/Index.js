const express = require('express');
const app = express();
// const dotenv = require('dotenv')
// const PORT = process.env.PORT || 3000;
const db = require('./Server/Server')
const PORT = 1800
const path = require('path')
let session = require('express-session')
const cors = require('cors')
// dotenv.config()
app.use(express.urlencoded());
app.use(express.json())
app.use(cors())

app.use(session({
    name: 'company',
    secret: 'keyboard',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 100 * 100 * 60}
}))

app.use('/company', require('./Routes/Routing'))
app.use('/company/manager', require('./Routes/ManagersRouting'))
app.use('/company/employee', require('./Routes/EmployeeRouting'))

app.use('/Images/owner' ,express.static(path.join(__dirname, 'Images/owner')))
app.use('/Images/manager' ,express.static(path.join(__dirname, 'Images/manager')))
app.use('/Images/employee' ,express.static(path.join(__dirname, 'Images/employee')))

app.listen(PORT, (err)=>{
    if(err) {
        console.log('Server Starting Error', err)
    }else{
        console.log('Server Starting on Port :', PORT)
    }
})