const express = require('express')
const router = express.Router()

router.get('/api', (req, res) => {
    //res.send('kkkk')
    res.json({message: '欢迎来到API羽翼图书接口！'})
})

module.exports = router