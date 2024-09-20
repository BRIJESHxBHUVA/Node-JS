const  {Modal, Product } = require('../Model/Model')
const path = require('path') 
const fs = require('fs')


// *********************** Cookie Auth Pattern ***********************************

// module.exports.userlogin = async(req, res) => {
//     try {
//         console.log(req.body)
//         let userdata = await Modal.findOne({email: req.body.email})

//        console.log(userdata)
        
//         if(userdata && userdata.password == req.body.password){
//             res.cookie('Admin', userdata, {
//                 httpOnly: true, 
//                 secure: false,  
//                 maxAge:  7 * 24 * 60 * 60 * 1000
//             })
//             res.redirect('/dashboard')
//         }
//         else{
//             return res.redirect('/')
//         }
//     }catch(err) {
//         console.log(err)
//     }
// }

// module.exports.userlogout = async(req, res)=>{
//     try{
//         res.clearCookie('Admin')
//         res.redirect('/')
//     }catch(err){
//         console.log("Logout error.", err)
//     }
// }


// module.exports.isAuthenticated = (req, res, next) => {
//     if (req.cookies.Admin) {
//         next(); // Proceed to the next middleware or route handler
//     } else {
//         res.redirect('/'); // Redirect to login page if not authenticated
//     }
// };


// module.exports.addProduct = async(req, res)=>{
//     try{
//         if(req.file){
//             req.body.image = req.file.filename
//         }
//         const productData = await Product.create(req.body)
//         productData ? res.redirect('Tables') : console.log('Product is not added.')
//     }catch(err){
//         console.log('Product error', err)
//     }
// }

// module.exports.deleteProduct = async(req, res)=>{
//     try{
//         const deleteimage = await Product.findById(req.query.id)
//         if(deleteimage.image){
//             const oldImage = path.join(__dirname, '../productimages/', deleteimage.image)
//             fs.unlinkSync(oldImage)
//         }
//         const deleteData = await Product.findByIdAndDelete(req.query.id)
//         deleteData ? res.redirect('Tables') : console.log('Error coming while delete product.')
//     }catch(err){
//         console.log('Product has not deleted.')
//     }
// }

// module.exports.editProduct = async(req, res)=>{
//     try{
//         const editProduct = await Product.findById(req.query.id)
//         res.render('Form-basic', {editProduct})
//     }catch(err){
//         console.log('Product is not move to edit process.')
//     }
// }

// module.exports.editedProduct = async(req, res)=>{
//     try{
//         const product = await Product.findById(req.query.id)

//         if(req.file){

//             const oldImage = path.join(__dirname, '../productimages/', product.image)
//             fs.unlinkSync(oldImage)
//             req.body.image = req.file.filename  

//         }else{
//             req.body.image = product.image
//         }

//        const updateProduct = await Product.findByIdAndUpdate(req.query.id, req.body)

//        if(updateProduct){
//         res.redirect('/tables');
//        }else{
//         console.log('Product update error. ')
//        }

//     }catch(err){
//         console.log('Product update error. ', err)
//     }
// }

// module.exports.dashboard = async(req, res)=>{
//     try {
//         if(req.cookies.Admin == undefined){
//             return res.redirect("/")
//         }
//         else{
//             let admindata =  await Modal.findById(req.cookies.Admin._id)
//             console.log(admindata);
//             if(admindata){
//                 res.render('Dashboard')
//             }else{
//                 res.redirect("/")
//             }
            
//         }
//     } catch (error) {
//         console.log("Error rendering dashboard: ", error);
//     }
   
// }

// module.exports.charts = async (req, res)=>{
//     try {
//         if(req.cookies.Admin == undefined){
//             return res.redirect("Dashboard")
//         }
//         else{
//             let admindata =  await Modal.findById(req.cookies.Admin._id)
//             console.log(admindata);
//             if(admindata){
//                 res.render('Charts')
//             }else{
//                 res.redirect("Dashboard")
//             }
            
//         }
//     } catch (error) {
//         console.log("Error rendering chart: ", error);
//     }
   
// }

// module.exports.widgets = (req, res)=>{
//     res.render('Widgets')
// }

// module.exports.tables = async (req, res)=>{
//     try{
//         const product = await Product.find({})
//         console.log(product)
//         res.render('Tables', {product})
//     }catch(err){
//         console.log('Product Not Found.', err)
//     }
    
// }






// *********************** Sesion Auth Pattern ***********************************





module.exports.userlogin = async(req, res) => {
   
            res.render('Dashboard')
    
}

// module.exports.userlogout = async(req, res)=>{
//     try{
      
//         res.redirect('/')
//     }catch(err){
//         console.log("Logout error.", err)
//     }
// }


// module.exports.isAuthenticated = (req, res, next) => {
//     if (req.cookies.Admin) {
//         next(); // Proceed to the next middleware or route handler
//     } else {
//         res.redirect('/'); // Redirect to login page if not authenticated
//     }
// };


module.exports.addProduct = async(req, res)=>{
    try{
        if(req.file){
            req.body.image = req.file.filename
        }
        const productData = await Product.create(req.body)
        productData ? res.redirect('Tables') : console.log('Product is not added.')
    }catch(err){
        console.log('Product error', err)
    }
}

module.exports.deleteProduct = async(req, res)=>{
    try{
        const deleteimage = await Product.findById(req.query.id)
        if(deleteimage.image){
            const oldImage = path.join(__dirname, '../productimages/', deleteimage.image)
            fs.unlinkSync(oldImage)
        }
        const deleteData = await Product.findByIdAndDelete(req.query.id)
        deleteData ? res.redirect('Tables') : console.log('Error coming while delete product.')
    }catch(err){
        console.log('Product has not deleted.')
    }
}

module.exports.editProduct = async(req, res)=>{
    try{
        const editProduct = await Product.findById(req.query.id)
        res.render('Form-basic', {editProduct})
    }catch(err){
        console.log('Product is not move to edit process.')
    }
}

module.exports.editedProduct = async(req, res)=>{
    try{
        const product = await Product.findById(req.query.id)

        if(req.file){

            const oldImage = path.join(__dirname, '../productimages/', product.image)
            fs.unlinkSync(oldImage)
            req.body.image = req.file.filename  

        }else{
            req.body.image = product.image
        }

       const updateProduct = await Product.findByIdAndUpdate(req.query.id, req.body)

       if(updateProduct){
        res.redirect('/tables');
       }else{
        console.log('Product update error. ')
       }

    }catch(err){
        console.log('Product update error. ', err)
    }
}

module.exports.dashboard = async(req, res)=>{
    try {
         res.redirect("/dashboard")
    } catch (error) {
        console.log("Error rendering dashboard: ", error);
    }
   
}

module.exports.charts = async (req, res)=>{
    try {
       
            return res.redirect("/charts")
    } catch (error) {
        console.log("Error rendering chart: ", error);
    }
   
}

module.exports.widgets = (req, res)=>{
    res.render('Widgets')
}

module.exports.tables = async (req, res)=>{
    try{
        const product = await Product.find({})
        console.log(product)
        res.render('Tables', {product})
    }catch(err){
        console.log('Product Not Found.', err)
    }
    
}










module.exports.grid = (req, res)=>{
    res.render('Grid')
}

module.exports.formbasic = (req, res)=>{
    res.render('Form-basic', { editProduct: null })
}

module.exports.formwizard = (req, res)=> {
    res.render('Form-wizard')
}

module.exports.buttons = (req, res)=>{
    res.render('Page-buttons')
}

module.exports.iconmaterial = (req, res)=>{
    res.render('Icon-material')
}

module.exports.iconfontawesome = (req, res)=>{
    res.render('Icon-fontawesome')
}

module.exports.pageelement = (req, res)=>{
    res.render('Page-element')
}

module.exports.dashboard2 = (req, res)=>{
    res.render('Dashboard-2')
}

module.exports.pagegallery = (req, res)=>{
    res.render('Pages-gallery')
}

module.exports.pagecalendar = (req, res)=>{
    res.render('Pages-calendar')
}

module.exports.pageinvoice = (req, res)=>{
    res.render('Pages-invoice')
}

module.exports.pagechat = (req, res)=>{
    res.render('Pages-chat')
}

module.exports.login = (req, res)=>{
    res.render('Authentication-login')
}

module.exports.register = (req, res)=>{
    res.render('Authentication-register')
}

module.exports.error403 = (req, res)=>{
    res.render('Error-403')
}

module.exports.error404 = (req, res)=>{
    res.render('Error-404')
}

module.exports.error405 = (req, res)=>{
    res.render('Error-405')
}

module.exports.error500 = (req, res)=>{
    res.render('Error-500')
}
