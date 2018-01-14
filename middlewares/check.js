module.exports = {

    checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.json({ status: 4, error: true, message: "未登录！" })
        }
        next()
    },
  
    checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.json({ status: 3,error: false, message: "已经登录！" })
        }
        next()
    }

}