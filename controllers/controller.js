const { Post, Comment, Home, Profile, User, sequelize } = require('../models/index');
const { Op, where } = require("sequelize")
const bcrypt = require('bcryptjs');

class Controller{
    static async login(req, res){
        try {
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
            let {email, password, userName, gender} = req.body
            await User.create({email, password})

            let bioProfile = `Welcome ${userName}`
            let photoProfile = ''
            let user = await User.findOne({where:{email:{[Op.eq]:email}}})
            let UserId = user.id
            await Profile.create({bioProfile,userName,gender,photoProfile,UserId})

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
            let post = await Post.findAll({include: Comment})
            res.render('beranda', {post})
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            let id = req.session.UserId //TESTING
            let data = await User.findOne({include:[Profile, Post], where:{id:4}})
            // res.send(data)
            res.render('profile', {data})
        } catch(error) {
            res.send(error)
        }
    }

    static async post(req, res){
        try {
            res.render('form-post')
        } catch (error) {
            res.send(error)
        }
    }

    static async addPost(req, res){
        try {
            let {title, descPost} = req.body
            await Post.create({title, descPost})
            res.redirect('/beranda')
        } catch (error) {
            res.send(error)
        }
    }

    static async postDetail(req, res){
        try {
            let {id} = req.params
            console.log(req.params);
            let post = await Post.findOne({include:Comment, where:{id:id}})
            // res.send(post)
            res.render('post-detail', {post})
        } catch (error) {
            res.send(error)
        }
    }

    static async comment(req, res){
        try {
            let {id} = req.params
            res.render('form-comment',{id})
        } catch (error) {
            res.send(error)
        }
    }

    static async addComment(req, res){
        try {
            let {descComment} = req.body
            let PostId = req.params.id
            await Comment.create({descComment})

            let comment = await Comment.findOne({where:{descComment:descComment}})
            let CommentId = comment.id
            await Home.create({PostId, CommentId})

            res.redirect(`/post/${PostId}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async logout(req, res){
        try {
            setTimeout(() => {
                res.redirect('/login')
            }, 1000);
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller