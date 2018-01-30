const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const checkLogin = require('../middlewares/check').checkLogin
//const checkNotLogin = require('../middlewares/check').checkNotLogin


//模糊查询一个书籍名称
router.get('/', (req, res) => {

    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Book.find({ title: regex }, (err, allbook) => {
            if (err) {
                res.json(err)
            } else {
                if (allbook.length < 1) {
                    //err_msg = [{ err: "找不到关键词！" }, {success: false}]
                    res.json({ success: false, message: '失败查询！' });
                } else {
                    res.json({ success: true, message: '成功查询！', allbook })
                }
            }
        })
    }

})

//查询所有书籍+管理页面
router.get('/book', checkLogin, (req, res) => {

    Book.find({})
        .sort({ update_at: -1 })
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.json(err)
        })

})

//查询所有书籍+普通页面
router.get('/books', (req, res) => {

    Book.find({})
        .sort({ update_at: -1 })
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.json(err)
        })

})
//查询分页
router.get('/booksquery', (req, res) => {

    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = {};
    Book.find(query)
        .sort({ update_at: -1 })
        .skip(page * limit) //Notice here
        .limit(limit)
        .exec((err, doc) => {
            if (err) {
                return res.json(err);
            }
            Book.count(query).exec((count_error, count) => {
                if (err) {
                    return res.json(count_error);
                }
                return res.json({ total: count, books: doc });
            });
        });
})




//查询一个书籍+普通页面
router.get('/books/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            res.json(err)
        } else {
            res.json(book)
        }
    })
})


//查询一个书籍
router.get('/book/:id', checkLogin, (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            res.json(err)
        } else {
            res.json(book)
        }
    })
})



//添加一个书籍
router.post('/book', checkLogin, (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.price || !req.body.introduction || !req.body.img_url) {
        return res.status(403).json({ "error": "true", "message": "缺少一个参数！请填写完整的内容！" })
    } else {
        //使用create方法储存数据
        Book.create(req.body, (err, book) => {
            if (err) {
                res.json(err)
            } else {
                return res.status(200).json({ "error": "false", "message": "新增成功！" })
            }
        })
    }

})

//更新一个书籍
router.put('/book/:id', checkLogin, (req, res) => {
    Book.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            tags: req.body.tags,
            "rating.everage": req.body.everage,
            introduction: req.body.introduction,
            img_url: req.body.img_url,
            down_url: req.body.down_url
        }
    }, {
            new: true
        })
        .then(book => res.json(book))
        .catch(err => res.json(err))
})

//删除一个书籍
router.delete('/book/:id', checkLogin, (req, res) => {
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

