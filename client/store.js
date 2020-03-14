import Vue from 'vue'
import Vuex from 'vuex'
import { apiEndpoint } from '../config/config'

Vue.use(Vuex)

const store = {
  state: {
    showErrorMessage: false,
    errorMessage: '',
  },

  mutations: {
    showError(state, message) {
      state.showErrorMessage = true
      state.errorMessage = message
    },

    hideError(state) {
      state.showErrorMessage = false
      state.errorMessage = ''
    },
  },

  actions: {
    showError: ({ commit }, message) => {
      commit('showError', message)
    },

    dismissError: ({ commit }) => {
      commit('hideError')
    },

    postController: async (store, payload) => {
      console.log(payload)
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log(response)
      console.log('yo')
      console.log(await response.text())
    },
  },
}

export default () => new Vuex.Store(store)

