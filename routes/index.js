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

// middle ware
router.use((req, res, next) => {
    if(req.session.UserId){
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/beranda', Controller.beranda)

router.get('/profile', Controller.profile)

//Edit Profile
router.get('/profile/edit', Controller.edit)
router.post('/profile/edit', Controller.saveEdit)

//Add Post
router.get('/post', Controller.post)
router.post('/post', Controller.addPost)

//Detail Post
router.get('/post/:id', Controller.postDetail)
router.get('/post/:id/like', Controller.postLike)

router.get('/post/:id/delete', Controller.postDelete)

//Add Commment
router.get('/post/:id/comment', Controller.comment)
router.post('/post/:id/comment', Controller.addComment)

//Logout
router.get('/logout', Controller.logout)


module.exports = router