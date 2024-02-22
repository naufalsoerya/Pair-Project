const { Post, Comment, Home, Profile, User } = require('../models/index');
const { Op } = require("sequelize")

class Controller{
    static async login(req, res){
        try {
            let {msg} = req.query
            res.render('form-login', {msg})
        } catch (error) {
            res.send(error)
        }
    }

    static async loginPost(req, res){
        try {
            let {email, password} = req.body
            let user = await User.findOne({where:{email:{[Op.eq]:email}}})

            let msg = 'Email or Password is Wrong !'
            if (!email || !password) result = res.redirect(`/login?error=${msg}`)

            if(email === user.email){
                if(password === bcrypt.compareSync(user.password, hash)){ //Disini pengecekan Bcrypt
                    res.redirect('/beranda')
                } else {
                    res.redirect(`/login?error=${msg}`)
                }
            } else {
                res.redirect(`/login?error=${msg}`)
            }
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
            await User.create({email, password})

            let msg = `Sign Up Success !`
            res.redirect(`/login?msg=${msg}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async beranda(req, res){
        try {
            let data = await User.findAll({include:[Profile, Post]})
            let search = await Profile.findOne({order: ['userName']})
            
            // res.send(search)
            res.render('beranda', {data, search})
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            let {UserId} = req.params
            let data = await User.findOne({include:[Profile, Post], where:{id:UserId}})
            // res.send(data)
            res.render('profile', {data})
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }
}

module.exports = Controller