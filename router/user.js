const express = require('express')
const router = express.Router()

const User = require('../models/user')
const checkLogin = require('../middlewares/check').checkLogin
const checkNotLogin = require('../middlewares/check').checkNotLogin

//获取所有用户
router.get('/user', checkLogin, (req, res) => {

        User.find({})
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                res.json(err)
            })
   
})
//
/*router.get('/check', checkLogin, (req, res) => {
    if (req.session.user) {
        return res.json({ status: 3, error: false, message: "已经登录！" })
    } 
})*/
//提供验证session存在是否
router.get('/session', checkLogin, (req, res) =>{
    res.json({
        session: true,
        message: '成功'
    })
})

//注册一个用户
router.post('/user', checkNotLogin, (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({ status: 0, error: true, message: "请填写用户名或者密码！" })
    } else {
        User.create(req.body, (err, user) => {
            if (err) {
                return res.json({ status: 2, error: true, message: "用户名已存在!" })
            } else {
                res.json({ status: 1, error: false, message: "用户名创建成功！"})
            } 
        })
    }
})

//认证信息
router.post('/login', checkNotLogin, (req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
      
        if (!user) {
            return res.json({ success: false, error: '该账户已注册' });
        }

        if (user.password === password) {
            req.session.user = user.username
            return res.json({ success: true, status: 1, error: false, message: '验证成功： 登录成功！', name: user.username,})
        } 

        if (user.password != password) {
            return res.json({ success: false, status: 0, error: true, message: '验证失败：密码不符合！' });
        }
        
        
       
    })

})

//注销
router.get('/logout', checkLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ error: true, message: '注销失败了' })
        } else {
            return res.json({ error: false, message: '注销成功了' })
        }
        
    })
   
    
})



module.exports = router
