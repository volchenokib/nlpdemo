import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    async sendFile({ commit }, file) {
      try {
        await axios
          .post('http://localhost:3000', file, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            commit('SUCCESS', res.data)
          })
      } catch (e) {
        console.error(e)
      }
    }
  },

  getters: {
    fetchResult(state) {
      return JSON.stringify(state.result)
    }
  },
  modules: {}
})
