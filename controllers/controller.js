const { Post, Comment, Home, Profile, User } = require('../models/index');

class Controller{
    static async login(req, res){
        try {
            let {msg} = req.query
            res.render('form-login', {msg})
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res){
        try {
            res.render('form-register')
        } catch (error) {
            res.send(error)
        }
    }

    static async registerPost(req, res){
        try {
            let {email, password} = req.body
            // await Users.create({email, password})

            let msg = `Sign Up Success !`
            res.redirect(`/login?msg=${msg}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async profilePage(req, res) {
        try {
            let {UserId} = req.params
            let data = await User.findOne({include:[Profile, Post], where: {id:UserId}})
            res.send(data)
            res.render('mainpage', {data})
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }

    static async homePage(req, res) {
        try {

        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }
}

module.exports = Controller