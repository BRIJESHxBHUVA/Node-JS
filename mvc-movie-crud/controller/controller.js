const Modal = require('../model/modal')
const path = require('path')
const fs = require('fs')

module.exports.home = async (req, res)=> {  
    try{
        let {search} = req.query;
        let {sort} = req.body
        let filter = {}

        console.log('Search:', search);
        console.log('Sort:', sort);

        if(search){
            filter.name = { $regex: search, $options: 'i'}
        }

        let sortOptions  = {}
        if(sort === 'ratingAsc'){
            sortOptions.rating = 1
        }else if(sort === 'ratingDesc'){
            sortOptions.rating = -1
        }
        else if(sort === 'nameAsc'){
            sortOptions.name = 1
        }else if(sort === 'nameDesc'){
            sortOptions.name = -1
        }
        console.log('Sort Options:', sortOptions);

        const data = await Modal.find(filter).sort(sortOptions)
        res.render('home', {data, search, sort})
    }catch(err){  
        console.log('Data not found.')
    }
}
module.exports.add = (req, res)=> {
  
    res.render('adding')
}


module.exports.adddata = async (req, res)=> {
    try{
        if(req.body.imageUrl && req.body.image !== ''){
            req.body.image = req.body.imageUrl
        }
        else if(req.file){
            req.body.image = req.file.filename
        }
        
        const data = await Modal.create(req.body)
        res.redirect('/')
    }catch(err){  
        console.log('Data is not added.')
    }  
}

module.exports.deletedata = async (req, res)=> {
    try{
        const imagedata = await Modal.findById(req.query.id);
        if(imagedata.image && !imagedata.image.startsWith('http')){
            const oldImage = path.join(__dirname, '../movieimages/', imagedata.image);
            fs.unlinkSync(oldImage);
        }

        const deleteData = await Modal.findByIdAndDelete(req.query.id);
        res.redirect('/')
    }catch(err){
        console.log('Data is not deleted: ', err)
    }
}

module.exports.editdata = async (req, res)=> {
    try{
        const editData = await Modal.findById(req.query.id);
        res.render('edit', {editData})
    }catch(err){
        console.log('Data is not move in edit process.', err)
    }
}

module.exports.editeddata = async (req, res)=> {
    try{
        const product = await Modal.findById(req.query.id);

        if(req.file){
            if(product.image && !product.image.startsWith('http')){
                const oldImage = path.join(__dirname, '../movieimages/', product.image);
                if(fs.existsSync(oldImage)){
                    fs.unlinkSync(oldImage);
                }
            }
            req.body.image = req.file.filename
        } else if(req.body.imageUrl && req.body.imageUrl !== ""){
            req.body.image = req.body.imageUrl
        }
        else{
            req.body.image = product.image
        }
        const EditedData = await Modal.findByIdAndUpdate(req.query.id, req.body);
        res.redirect('/');
    }catch(err){
        console.log('Data is not edited')
    }
}

