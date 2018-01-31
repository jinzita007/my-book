const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/db')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const index = require('./router/index')
const book = require('./router/book')
const user = require('./router/user')
// mongoose设置
mongoose.connect(config.mongodb,{useMongoClient: true})
mongoose.Promise = global.Promise
// session会话
app.use(session({
    secret: 'session',
    key: 'session',
    resave: false, // //重新保存
    saveUninitialized: true, // 强制“未初始化”的会话保存到存储
    cookie: {
        maxAge: 100000000000000000 // 设置返回的cookie时效为30秒
    }    
}))

// URL请求解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))
// 设置路由
app.use('/', index)
app.use('/api', book)
app.use('/api', user)
// 开启监听服务
app.listen(3000,() => {
    console.log('app listening on port 3000.')
    
})

module.exports = app