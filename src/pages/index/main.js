
import Vue from 'vue'
import App from './index.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routes.js'
import http from '../../Http.js'
import i18n from '../../lang' // internationalization
Vue.prototype.$http = http
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(ElementUI)
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
