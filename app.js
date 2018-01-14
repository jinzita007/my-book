const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/db')

const bodyParser = require('body-parser')

const app = express()
const index = require('./router/index')
const book = require('./router/book')
const user = require('./router/user')

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))

app.use('/', index)

app.use('/api', book)

app.use('/api', user)

app.listen(3000,() => {
    console.log('app listening on port 3000.')
    
})

module.exports = app