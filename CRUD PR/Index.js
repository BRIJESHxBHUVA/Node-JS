const express = require('express');
const app = express();
app.use(express.urlencoded());
const db = require('./Server')
const BookModel = require('./DetailsSchema')
app.set('view engine', 'ejs')
const port = 8000

app.get('/', (req, res)=> {
    res.render('Loading')
})

app.get('/home', async (req, res)=> {
    const data = await BookModel.find({})
    data ? res.render('Tutorial', {data}) : console.log('Data is not found');
})

app.post('/Insert', async (req, res)=> {  
    const BookData = await BookModel.create(req.body);
    BookData ? res.redirect('/') : console.log('Book data is not added.');    
})

app.get('/Delete', async (req, res)=> {
    DeleteData = await BookModel.findByIdAndDelete(req.query.id);
    DeleteData ? res.redirect('/home') : console.log('Data is not deleted');
})

app.get('/Edit', async (req, res)=> { 
    EditData = await BookModel.findById(req.query.id)
    EditData ? res.render('Edit') : console.log('Data is not move to edit process');
})

app.post('/Edit', async (req, res)=> {  
    const EditedData = await BookModel.findByIdAndUpdate(req.query.id, req.body);
    EditedData ? res.redirect('/') : console.log('Data is not updated');
})

app.listen(port, (err)=>{
    err ? console.log('Server running err', err) : console.log(`Server running on port ${port}`);
})