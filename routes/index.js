const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.login)
router.get('/login', Controller.login)

router.get('/register', Controller.register)

router.post('/register', Controller.registerPost)

module.exports = router