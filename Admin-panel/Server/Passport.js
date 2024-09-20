const passport = require('passport')
const localPassport = require('passport-local').Strategy

const Modal = require('../Model/Model')

passport.use('local', new localPassport(
    {usernameField: "email"},
    async (email, password, done) => {
        let AdminData = await Modal.findOne({email : email})
        if(AdminData){
            if(password === AdminData.password){
                done(null, AdminData)
            }
            else{
              return  done(null, false)
            }
        }
        else{
           return done(null, false)
        }
    }
))

passport.serializeUser((user, done) => {
   return done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    let AdminData = await Modal.findById(id)
    
    if(AdminData){
        done(null, AdminData)
    }else{
        done(null, false)
    }
})

passport.checkAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        res.redirect("/")
    }
}

module.exports = passport
