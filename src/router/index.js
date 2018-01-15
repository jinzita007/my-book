import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'
import BookDetail from '@/components/BookDetail'
import Login from '@/components/user/login'
import Book from '@/components/book'
import axios from 'axios'
import store from '@/store/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      meta: {
        requireLogin: false,
      },
      component: Book
    },
    {
      path: '/login',
      name: '登录',
      meta: {
        requireLogin: false,
        noLogin: true
      },
      component: Login
    },
    {
      path: '/bookList',
      name: 'BookList',
      meta: {
        requireLogin: true
      },
      component: BookList
    },
    {
      path: '/book/:id',
      name: 'BookDetail',
      meta: {
        requireLogin: true
      },
      component: BookDetail
    },
    /*{
      path: '*',
      redirect: '/'
    }*/
  ]
})


/*router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) { //是否验证
    // 通过判断状态中是否存在user.name
    // 浏览store中的代码即可了解
    // 此次实例简化了state，只将流程跑通
    // !! 但是只通过vuex维护的全局状态中是否含有user信息
    // 当浏览器刷新时，所有状态将被清空，每次都会被重定向至登录页，
    // 因此有了http拦截的意义，底部有解释
    //alert(JSON.stringify(store.state.user.name)) 
    if (store.state.user.name) {
      next()
    } else { //未登录则跳转到登录页面
      // next({path:xxx})当前的导航被中断，然后进行一个新的导航
      next({
        path: '/login',
        // $router.path 
        // 一个 key/value 对象，表示 URL 查询参数。
        // 例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
        // 如果没有查询参数，则是个空对象。
        // 假设一开始进入 / (首页)并且没有登录 ，则next进行跳转的路由为/login 
        // 之后登录成功 则redirect => to.fullPath（即为开始进入的路由） => / (首页)
        query: {
          redirect: to.fullPath
        }
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // $router.fullPath 完成解析后的 URL，包含查询参数和 hash 的完整路径
      })
    }
  } else {
    next();
  }
})*/


 router.beforeEach((to, from, next) => {
   //if (to.matched.some(record => record.meta.requiresAuth)) {
     if (to.meta.requireLogin) {
         // 向后端请求获取session的api
       axios.get('/api/session')
             .then(res => {
                 console.dir(res.data.session)
               if (res.data.session === false) {
                     next({
                         // 如果session失效，则跳转至登录页
                         path: '/login',
                         // 跳转后将跳转前的url赋值给参数redirect
                         query: {
                             redirect: to.fullPath
                         }
                     })
                 } else {
                     next()
                }
             })
             .catch(err => {
                 console.dir(err);
             })

     } else {
         next();
     }
 })
//登录成功之后防止跳转到登录页面
router.beforeEach((to, from, next) => {
  //if (to.matched.some(record => record.meta.requiresAuth)) {
  if (to.meta.noLogin) {
    // 向后端请求获取session的api
    axios.get('/api/session')
      .then(res => {
        console.dir(res.data.session)
        if (res.data.session === true) {
          next({
            // 如果session失效，则跳转至登录页
            path: '/bookList',
            // 跳转后将跳转前的url赋值给参数redirect
            query: {
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      })
      .catch(err => {
        console.dir(err);
      })

  } else {
    next();
  }
})


 /*router.beforeEach((to, from, next) => {
   let session = localStorage.getItem('user')
     if (to.meta.requireLogin) {
       console.log(session);
         if (session) {
             next();
         } else {
             next({
                 path: '/login',
                 query: {
                     redirect: to.fullPath
                 }
              })
         }

     } else {
         next();
     }
 })*/


export default router
