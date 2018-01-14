module.exports = {

    checkLogin(req, res, next) {
        if (!req.session.user) {
            res.json({ error: true, message: "未登录！" })
        }
        next();
    },
  
    checkNotLogin(req, res, next) {
        if (req.session.user) {
            es.json({ error: false, message: "已经登录！" })
        }
        next();
    }

}