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

Vue.use(MuseUi)
import router from './router'
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name, Vodal);

Vue.config.productionTip = false

/*toastr.options.closeButton = true
toastr.options.progressBar = false
toastr.options.preventDuplicates = false
toastr.options.onclick = null
toastr.options.newestOnTop = false
toastr.options.progressBar = false
options.showDuration = 300
options.hideDuration = 1000
toastr.options.timeOut = 3000 // How long the toast will display without user interaction
toastr.options.extendedTimeOut = 1000 // How long the toast will display after a user hovers over it
toastr.options.showEasing = 'swing'
toastr.options.hideEasing = 'linear'
toastr.options.showMethod = 'fadeIn'
toastr.options.hideMethod = 'fadeIn'*/
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
  /*el: '#app',*/
  router,
  /*template: '<App/>',
  components: { App }*/
  render: h => h(App)
}).$mount('#app')
