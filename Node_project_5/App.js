const express = require('express')
const db = require("./Index")
const userModal = require("./data")
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.get('/', async(req, res)=> {

    try{
        const users = await userModal.find();
        res.render('index', {message: null, users})

    }
    catch(err){
        res.render('index', { message: 'Error retrieving users', users: [] });
    }

})

app.post('/', async (req, res)=>{  
    const {name, email, password} = req.body
    const user = await new userModal({username: name, email, password})
    await user.save()
    
    .then((data) => {
        const users = userModal.find();
        res.render('index', {message: 'User created successfully', users})
        console.log(data)
    }).catch((err) => {
        console.log(err)
        res.render('index', { message: 'Error creating user', users: [] });
    })
    
})

app.post('/delete/:id', async(req, res)=>{
    try{
        await userModal.findByIdAndDelete(req.params.id)
        const users = await userModal.find();
        res.render('index', {message: 'User Deleted successfully', users})
    }
    catch(err){
        res.render('index', { message: 'Error deleting user', users: [] });
    }
})

app.get('/edit/:id', async(req, res)=>{
    try{
        const user = await userModal.findById(req.params.id);
        res.render('edit', {user})
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
})

app.post('/edit/:id', async(req, res)=> {

    const {name, email, password} = req.body

    try{

       await userModal.findByIdAndUpdate(req.params.id, {
        username: name,
        email, 
        password
       })
       const users = await userModal.find();
       res.render('index', { message: 'User updated successfully', users })
    }
    catch(err){
        console.log(err)
        res.render('index', { message: 'Error updating user', users: [] });
    }
})

db.once('open', () => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

