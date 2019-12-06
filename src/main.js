// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/icon.css'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Vodal from 'vodal';
import "vodal/common.css";
import "vodal/rotate.css";
import "./assets/loaders.css"
axios.defaults.withCredentials = true
Vue.use(MuseUi)
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name, Vodal);

import store from './store/index.js'

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

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
