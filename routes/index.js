const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// route login
router.get('/', Controller.login)
router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)

// route register
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)

//middle ware
router.use((req, res, next) => {
    if(req.session.UserId){
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/beranda', Controller.beranda)

router.get('/profile', Controller.profile)

module.exports = router