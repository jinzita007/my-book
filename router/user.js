const express = require('express')
const router = express.Router()
const User = require('../models/user')

//获取所有用户
router.get('/user', (req, res) => {
    User.find({})
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.json(err)
    })
})

//注册一个用户
router.post('/user', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({ error: true, message: "请填写用户名或者密码！" })
    } else {
        User.create(req.body, (err, user) => {
            if (err) {
                return res.json({ error: true, message: "用户名已存在!" })
            } else {
                res.json({ error: false, message: "用户名创建成功！"})
            } 
        })
    }
})

//认证信息
router.post('/login', (req, res) => {
   
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.status(400).json({ error: true, msg: '验证失败：账号不存在！' });
        }
        if (user.password === password) {
            return res.json({ error: false, message: '验证成功： 登录成功！' })
        } else {
            return res.status(400).json({ error: true, msg: '验证失败：密码不符合！' });
        }
    })

})



module.exports = router
