const Modal = require('../Model/Modal')
const path = require('path')
const fs = require('fs')

module.exports.home = async (req, res)=> {  
    try{
        const data = await Modal.find({})
        res.render('Home', {data})
    }catch(err){  
        console.log('Data not found.')
    }
}
module.exports.add = (req, res)=> {
    res.render('Adding')
}


module.exports.adddata = async (req, res)=> {
    try{
        req.body.image = req.file.filename
        const data = await Modal.create(req.body)
        res.redirect('/')
    }catch(err){  
        console.log('Data is not added.')
    }  
}

module.exports.deletedata = async (req, res)=> {
    try{
        const imagedata = await Modal.findById(req.query.id);
        const oldImage = path.join(__dirname, '../movieimages/', imagedata.image);
        fs.unlinkSync(oldImage);
        // if(imagedata && imagedata.image){
        //     const oldImage = path.join(__dirname, '../movieimages/', imagedata.image);
        //     if(fs.existsSync(oldImage)){
        //         fs.unlinkSync(oldImage);
        //     }
        // }

        const deleteData = await Modal.findByIdAndDelete(req.query.id);
        res.redirect('/')
    }catch(err){
        console.log('Data is not deleted: ', err)
    }
}

module.exports.editdata = async (req, res)=> {
    try{
        const editData = await Modal.findById(req.query.id);
        res.render('Edit', {editData})
    }catch(err){
        console.log('Data is not move in edit process.', err)
    }
}

module.exports.editeddata = async (req, res)=> {
    try{
        const product = await Modal.findById(req.query.id);

        if(req.file){
            if(product.image){
                const oldImage = path.join(__dirname, '../movieimages/', product.image);
                if(fs.existsSync(oldImage)){
                    fs.unlinkSync(oldImage);
                }
            }
            req.body.image = req.file.filename
        }else{
            req.body.image = product.image
        }
        const EditedData = await Modal.findByIdAndUpdate(req.query.id, req.body);
        res.redirect('/');
    }catch(err){
        console.log('Data is not edited')
    }
}

