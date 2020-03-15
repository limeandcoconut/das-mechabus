import Vue from 'vue'
import Vuex from 'vuex'
import { apiEndpoint, controllers as configControllers } from '../config/config'

Vue.use(Vuex)

const store = {
  state: {
    showErrorMessage: false,
    errorMessage: '',
    controllers: {},
    initPromise: null,
    nameToIdMap: {},
  },

  getters: {
    initPromise: (state) => {
      if (!state.initPromise) {
        throw new Error('Initialization Promise not set.')
      }
      return state.initPromise
    },
  },

  mutations: {
    setInitPromise(state, initPromise) {
      state.initPromise = initPromise
    },

    showError(state, message) {
      state.showErrorMessage = true
      state.errorMessage = message
    },

    hideError(state) {
      state.showErrorMessage = false
      state.errorMessage = ''
    },

    setControllers(state, controllers) {
      state.controllers = controllers
    },

    setController(state, controller) {
      console.log(controller)
      Vue.set(state.controllers, controller.id, controller)
    },

    setNameToIdMap(state, nameToIdMap) {
      state.nameToIdMap = nameToIdMap
    },
  },

  actions: {
    showError: ({ commit }, message) => {
      commit('showError', message)
    },

    dismissError: ({ commit }) => {
      commit('hideError')
    },

    postController: async ({ state, commit }, payload) => {
      const data = await (await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })).json()

      console.log(data)
      const controller = state.controllers[payload.id]
      controller.state = data.state
      controller.milliseconds = data.milliseconds
      controller.button = data.button
      commit('setController', { name, controller })
    },

    initControllers: async ({ commit }) => {

      let controllers = (await Promise.all(
        configControllers.map(async ({ name, id }) => {
          const data = await (await fetch(`${apiEndpoint}/?id=${id}`, { method: 'GET' })).json()
          data.id = id
          data.name = name
          return data
        }),
      )).reduce((controllers, data) => {
        controllers[data.id] = data
        return controllers
      }, {})

      commit('setNameToIdMap', configControllers.reduce((map, { name, id }) => {
        map[name] = id
        return map
      }, {}))

      console.log(controllers)
      commit('setControllers', controllers)
    },
  },
}

export default () => new Vuex.Store(store)

