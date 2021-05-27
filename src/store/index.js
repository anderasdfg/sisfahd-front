import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)',
    barImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    drawer: null,
    listaPagos:[],
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    ///Lista de pagos
    setListaPagos(state, value) {
      state.listaPagos = value;
  },
  addListaPagos(state, value) {
      state.listaPagos.push(value);
  },
  replaceListaPagos(state, value) {
      var index = state.listaPagos.findIndex(x => x.id == value.id);
      state.listaPagos.splice(index, 1, value);
  },
  
  },
  actions: {

  },
})
