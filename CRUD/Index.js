const express = require('express');
const app = express();
const EmployeModal = require('./CrudModel')
const db = require('./Server')

app.use(express.urlencoded());

const port = 3000

app.set('view engine', 'ejs')

app.get("/", async (req, res)=> { 
    const data = await EmployeModal.find({});
    res.render('Tutorial', {data})
})

app.post('/Insert', async (req, res)=> {
    const EmployeeData = await EmployeModal.create(req.body);
    EmployeeData ? res.redirect('/') : console.log('Data is not added.');
})

app.get('/Delete', async (req, res)=> {
    const DeleteData = await EmployeModal.findByIdAndDelete(req.query.id);
    DeleteData ? res.redirect('/') : console.log('Data is not deleted');
})

app.get('/Edit', async(req, res)=> {
    const EditData = await EmployeModal.findById(req.query.id);
    EditData ? res.render('EditData', {EditData}) : console.log('Data is not go to update process.');
})

app.post('/Edit', async(req, res)=> { 
    const EditedData = await EmployeModal.findByIdAndUpdate(req.query.id, req.body)
    EditedData ? res.redirect('/') : console.log('Data is not updated.');
})


app.listen(port, (err)=>{
    if(err) {
        console.log("Server starting error says: ",err);        
    }
    else{
        console.log(`Server starting on port ${port}`);
    }
})