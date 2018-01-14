import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'
import BookDetail from '@/components/BookDetail'
import Login from '@/components/user/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/book/:id',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
