const { Post, Comment, Home, Profile, User, sequelize } = require('../models/index');
const { Op } = require("sequelize")
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
            let data = await User.findAll({include:[Profile, Post]})
            // let data = await Post.findAll({include: {
            //     models: Home,
            //     include: Comment
            // }})
            // let data = await Home.findAll({include:[Comment, Post]})
            let search = await Profile.findOne({
                where: {
                    userName: {
                        [Op.iLike]: '%hat'
                    }
                }
            })
            
            // res.send(data)
            res.render('beranda', {data, search})
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            let id = req.session.UserId
            let data = await User.findOne({include:[Profile, Post], where:{id:id}})
            // res.send(data)
            res.render('profile', {data})
        } catch(error) {
            res.send(error)
        }
    }

    static async detail(req, res) {
        try {
            let {UserId} = req.params
            // let data = await Post.findOne({include:[Comment], where:{id:UserId}})
            // let data2 = await Profile.findOne()
            let data = await Profile.findAll({include: {
                models: User,
                include: {
                    models: Post
                }
            }})
            res.send(data)
            res.render('detailPage', {data})
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }

    static async commentPage(req, res) {
        try {
            let {UserId} = req.params

            let data = await Post.findOne({where: {id: UserId}})
            // res.send(data)
            res.render('commentPage', {data})
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }

    static async commentForm(req, res) {
        try {
            let {descComment} = req.body
            let {UserId} = req.params

            let PostId = UserId;
            let CommentId = UserId

            await Comment.create({descComment})
            await Home.create({PostId, CommentId})
            res.redirect(`/detail/${UserId}`)
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }

    static async updatedLikePost(req, res) {
        try {
            let {UserId} = req.params

            await Post.update(
                {likePost: sequelize.literal('"likePost" + 1')},
                {where: {id: UserId}}
            )
            res.redirect(`/detail/${UserId}`)
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }

    static async updatedLikeComment(req, res) {
        try {
            let {UserId} = req.params

            await Comment.update(
                {likeComment: sequelize.literal('"likeComment" + 1')},
                {where: {id: UserId}}
            )
            res.redirect(`/detail/${UserId}`)
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }

    static async delete(req, res) {
        try {
            let {CommentId} = req.params

            await Comment.destroy({where: {id: CommentId}})
            res.redirect(`/detail/${CommentId}`)
        } catch(error) {
            console.log(error.message)
            res.send(error)
        }
    }
}

module.exports = Controller