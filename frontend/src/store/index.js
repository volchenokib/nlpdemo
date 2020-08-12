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
            console.log('res', res.data)
            commit('SUCCESS', res.data)
            console.log('SUCCESS!!')
          })
      } catch (e) {
        console.log('FAILURE!!')
        console.error(e)
      }
    }
  },

  getters: {
    fetchResult(state) {
      return state.result
    }
  },
  modules: {}
})
