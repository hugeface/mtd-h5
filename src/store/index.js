import Vue from 'vue'
import Vuex from 'vuex'
import td from './td'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    td
  },

  strict: debug

  // plugins: debug ? [createLogger] : []
})
