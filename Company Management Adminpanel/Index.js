const express = require('express');
const app = express();
const db = require('./Server/Server')
const PORT = 1800
const path = require('path')
let session = require('express-session')
const bodyparser = require('body-parser')
const cors = require('cors')
app.use(express.urlencoded());
app.use(express.json())
app.use(bodyparser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.use(session({
    name: 'company',
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    cookie: {     
        secure: false,          
        maxAge: 10 * 60 * 1000,
    }
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


//Name :-  company-management-dashboard
//Username :- bhuvabrijesh14
// password :- xqkkoNsKgwvU22TD


// mongodb+srv://bhuvabrijesh14:xqkkoNsKgwvU22TD@company-management-dash.7azyk.mongodb.net/?retryWrites=true&w=majority&appName=company-management-dashboard