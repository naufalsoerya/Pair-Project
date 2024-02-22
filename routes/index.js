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

// route detail post
router.get('/detail/:UserId', Controller.detail)

// route comment 
router.get('/comment/:UserId', Controller.commentPage)
router.post('/comment/:UserId', Controller.commentForm)

// route like
router.get('/likePost/:UserId', Controller.updatedLikePost)
router.get('/likeComment/:UserId', Controller.updatedLikeComment)

// route delete
router.get('/delete/:CommentId', Controller.delete)

module.exports = router