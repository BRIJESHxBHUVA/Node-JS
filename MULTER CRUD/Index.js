const express = require('express')
const app = express()
const port = 3000
const db = require('./Server');
const CrudSchema = require('./Modal');
app.use(express.urlencoded())
app.set('view engine', 'ejs');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){   
        cb(null, 'upload/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const Upload = multer({storage : storage}).single('image')
app.use(express.static(path.join(__dirname, 'upload')))

app.get('/', async (req, res)=>{
    const product = await CrudSchema.find({})
   product ? res.render('Tutorial', {product}) : console.log('Data not found.');
})

app.post('/insert', Upload, async (req, res)=> {
    req.body.image = req.file.filename
    const data = await CrudSchema.create(req.body);
    data ? res.redirect('/') : console.log('New Product not added.');
})

app.get('/delete', async (req, res)=>{
    const NewProduct = await CrudSchema.findByIdAndDelete(req.query.id)
    NewProduct ? res.redirect('/') : console.log('Product not deleted.');
})

app.get('/edit', async (req, res)=> {
    const editproduct = await CrudSchema.findById(req.query.id)
    editproduct ? res.render('Edit', {editproduct}) : console.log('Product is not going to edit process.');
})

app.post('/edit', Upload, async (req, res)=>{
    req.body.image = req.file.filename
    const EditedProduct = await CrudSchema.findByIdAndUpdate(req.query.id, req.body);
    EditedProduct ? res.redirect('/') : console.log('Product not updated.');
})

app.listen(port, (err)=>{
    if(err){
        console.log('Server starting error.');
    }
    else{
        console.log(`Server starting on port ${port}`);
    }
})