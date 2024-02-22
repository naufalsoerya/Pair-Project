const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// route login
router.get('/', Controller.login)
router.get('/login', Controller.login)

// route register
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)

// router mainpage
router.get('/profile/:UserId', Controller.profilePage)

module.exports = router