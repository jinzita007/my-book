// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/icon.css'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Vodal from 'vodal';
// include animation styles
import "vodal/common.css";
import "vodal/rotate.css";
import "./assets/loaders.css"

axios.defaults.withCredentials = true

Vue.use(MuseUi)
import router from './router'
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name, Vodal);

Vue.config.productionTip = false



toastr.options = {
  "closeButton": true,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


// 全局导航钩子
router.beforeEach((to, from, next) => {
  //var userInfo = JSON.parse(sessionStorage.getItem('userInfoStorage'));//获取浏览器缓存的用户信息
  axios.get('/api/check').then(res => {
    if (res.data.status === 4) {
      if (to.path == '/login') {//如果是登录页面路径，就直接next()
        next();
      } else {//不然就跳转到登录；
        next('/login');
      }
    } else { //如果有就直接到首页咯
      next();
    }
  })

});

/* eslint-disable no-new */
new Vue({
  /*el: '#app',*/
  router,
  watch: {
    "$route": 'checkLogin'
  },

  //进入页面时
  created() {
    this.checkLogin();
  },

  methods: {
    checkLogin() {
      
    }
 },
  /*template: '<App/>',
  components: { App }*/
  render: h => h(App)
}).$mount('#app')
