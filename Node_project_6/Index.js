const express = require('express');
const app = express();
const port = 3000
const db = require('./config/Server');
const CrudModal = require('./model/ServerDataType');


app.use(express.urlencoded()) 

app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const data = await CrudModal.find()
    data ?  res.render('Tutorial', {data}) : console.log(("Data is not available."));   
})

app.post('/Insert', async (req, res)=> { 

    let data = await CrudModal.create(req.body)
    data ? console.log(data) : console.log("Failed insert data")
    console.log(req.body)
})

app.get("/Delete", async (req, res)=> {  
    const DeleteData =  await CrudModal.findByIdAndDelete(req.query.id)

})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
