import Vue from 'vue'
import Vuex from 'vuex'
import manualPayment from './modules/manualPayment'


Vue.use(Vuex)

const mutations = {
  changeRouter: function (state, payload) {
    state.router = payload
  }
}

export default new Vuex.Store({
  state: {},
  getters: {},
  modules: {
    manualPayment
  },
  strict: true,
  namespaced: true
})
