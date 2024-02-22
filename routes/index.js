const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.login)
router.get('/login', Controller.login)

router.get('/register', Controller.register)

router.post('/register', Controller.registerPost)

router.get('/beranda', Controller.beranda)

router.get('/profile', Controller.profile)

module.exports = router