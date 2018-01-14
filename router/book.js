const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const checkLogin = require('../middlewares/check').checkLogin
//const checkNotLogin = require('../middlewares/check').checkNotLogin

//查询所有书籍
router.get('/book', checkLogin ,(req, res) => {

        Book.find({})
            .sort({ update_at: -1 })
            .then(books => {
                res.json(books)
            })
            .catch(err => {
                res.json(err)
            })
    
})

//查询一个书籍
router.get('/book/:id', checkLogin , (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            res.json(err)
        } else {
            res.json(book)
        }
    })
})

//模糊查询一个书籍名称
router.get('/', checkLogin ,(req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Book.find({ title: regex }, (err, allbook) => {
            if (err) {
                res.json(err)
            } else {
                if(allbook.length < 1) {
                    err_msg = [{err:"找不到关键词！"}]
                    res.json(err_msg);
                } else {
                    res.json(allbook)
                }
            }
        })
    }
    
})

//添加一个书籍
router.post('/book', checkLogin ,(req, res) => {
    if (!req.body.title || !req.body.author || !req.body.price || !req.body.introduction || !req.body.img_url) {
        return res.status(403).json({ "error": "true", "message": "缺少一个参数！请填写完整的内容！"})
    } else {
        //使用create方法储存数据
        Book.create(req.body, (err, book) => {
            if (err) {
                res.json(err)
            } else {
                return res.status(200).json({ "error": "false", "message": "新增成功！"})
            }
        })
    }
         
})

//更新一个书籍
router.put('/book/:id', checkLogin , (req, res) => {
    Book.findByIdAndUpdate({ _id: req.params.id}, { $set: { 
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        introduction: req.body.introduction,
        img_url: req.body.img_url,
        down_url: req.body.down_url}
    }, {
        new : true
    })
    .then(book => res.json(book))
    .catch(err => res.json(err))
})

//删除一个书籍
router.delete('/book/:id', checkLogin , (req, res) => {
    Book.findOneAndRemove({
        _id: req.params.id
    })
    .then(book => res.send(`${book.title}删除成功！`))
    .catch(err => res.json(err))
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router