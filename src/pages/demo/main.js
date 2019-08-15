import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from './routes.js'
import http from '../../Http.js'
import i18n from '../../lang' // internationalization
import clio from '../../common/clio'
Vue.prototype.$clio = clio
Vue.prototype.$http = http
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
