const { Post, Comment, Home, Profile, User } = require('../models/index');
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs');

class Controller{
    static async login(req, res){
        try {
            console.log(req.session);
            let {email, password} = req.body
            let user = await User.findOne({where:{email:{[Op.eq]:email}}})
            let {msg, error, val} = req.query
            res.render('form-login', {msg, error, val})
        } catch (error) {
            res.send(error)
        }
    }

    static async loginPost(req, res){
        try {
            let {email, password} = req.body
            let user = await User.findOne({where:{email:{[Op.eq]:email}}})

            let msg = 'Email or password is wrong !'
            if (!email){
                res.redirect(`/login?error=Please insert your email or password !`)
            } else{
                if(email === user.email){
                    if(bcrypt.compareSync(password, user.password)){ //Disini pengecekan Bcrypt
                        //session save
                        req.session.UserId = user.id

                        res.redirect('/beranda')
                    } else {
                        res.redirect(`/login?error=${msg}`)
                    }
                } else {
                    res.redirect(`/login?error=${msg}`)
                }
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res){
        try {
            let {msg} = req.query
            if(msg) msg = msg.split(',')

            res.render('form-register', {msg})
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
            if (error.name === 'SequelizeValidationError'){
                let msg = error.errors.map(err=>{
                    return err.message
                })
                res.redirect(`/register?msg=${msg}`)
            } else {
                res.send(error)
            }
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