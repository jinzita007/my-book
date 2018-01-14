import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'
import BookDetail from '@/components/BookDetail'

Vue.use(Router)

export default new Router({
  routes: [
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
