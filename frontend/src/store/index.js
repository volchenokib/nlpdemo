import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    result: null
  },

  mutations: {
    SUCCESS(state, payload) {
      state.result = payload
    },
    RESET(state) {
      state.result = null
    }
  },

  actions: {
    // async sendFile({ commit }, file) {
    //   try {
    //     await axios
    //       .post('/', file, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       })
    //       .then(res => {
    //         commit('SUCCESS', res.data)
    //       })
    //   } catch (e) {
    //   }
    // },
    renderJson({ commit }, json) {
      try {
        commit('SUCCESS', json)
      } catch (e) {}
    }
  },

  getters: {
    fetchResult(state) {
      return JSON.stringify(state.result)
    }
  },
  modules: {}
})
