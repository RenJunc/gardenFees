const state = {
  loading: false,
  classPaymentData: {},
  childPaymentData: {},
  newPaymentData: {},
  tabActive:0,
}

const getters = {
  loading: function (state) {
    return state.loading
  },
  getClassPaymentData: function (state) {
    return state.classPaymentData
  },
  getChildPaymentData: function (state) {
    return state.childPaymentData
  },
  getNewPaymentData: function (state) {
    return state.newPaymentData
  },
  getTabActive:function (state) {
    return state.tabActive
  }

}

const mutations = {
  changStatus (state, payload) {
    state.loading = payload
  },
  setClassPaymentData: function (state, payload) {
    state.classPaymentData = payload
  },
  setChildPaymentData: function (state, payload) {
    state.childPaymentData = payload
  },
  setNewPaymentData: function (state, payload) {
    state.newPaymentData = payload
  },
  setTabActive:function (state,payload) {
    return state.tabActive = payload
  },
  resetData:function (state,payload) {
    state.classPaymentData ={}
    state.childPaymentData= {}
    state.newPaymentData = {}
    state.tabActive = 0
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
