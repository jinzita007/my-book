module.exports = {

    checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.json({ session: false, error: '未登录' })
        }
        next()
    },
  
    checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.json({ session: true, error: "已经登录！" })
        }
        next()
    }

}