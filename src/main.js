import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueClipboard from "vue-clipboard2";
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './axios.config'
import './assets/padstyle.css'
import './permission'


Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

