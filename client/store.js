import Vue from 'vue'
import Vuex from 'vuex'
import {
  apiHost,
  wsProtocol,
  wsPort,
  controllers as configControllers,
} from '../config/config'
import { sleep } from './utils'

Vue.use(Vuex)

const store = {
  state: {
    showErrorMessage: false,
    errorMessage: '',
    controllers: {},
    initPromise: null,
    nameToIdMap: {},
    socket: null,
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

    setSocket(state, socket) {
      state.socket = socket
    },
  },

  actions: {
    showError: ({ commit }, message) => {
      commit('showError', message)
    },

    dismissError: ({ commit }) => {
      commit('hideError')
    },

    manageSocket: async ({ state: { socket }, dispatch, commit }, retryAttepts = 5) => {
      if (socket.readyState === WebSocket.OPEN) {
        return
      }
      if (socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
        commit('showError', 'Connection closed. Retrying...')
        await dispatch('initialize')
        return
      }
      if (socket.readyState === WebSocket.CONNECTING) {
        if (retryAttepts > 0) {
          console.log('retry')
          commit('showError', 'Connecting...')
          await sleep(1000)
          await dispatch('manageSocket', retryAttepts - 1)
        }
        socket.close()
        commit('showError', 'Connection failed.')
      }
    },

    refreshControllers: async ({ state: { socket }, dispatch }) => {
      if (!await dispatch('manageSocket')) {
        return false
      }
      socket.send(JSON.stringify({
        type: 'refresh',
      }))
    },

    askController: async ({ state: { socket }, dispatch }, payload) => {
      if (!await dispatch('manageSocket')) {
        return false
      }
      socket.send(JSON.stringify({
        type: 'get',
        data: payload,
      }))
    },

    tellController: async ({ state: { socket }, dispatch }, payload) => {
      if (!await dispatch('manageSocket')) {
        return false
      }
      socket.send(JSON.stringify({
        type: 'set',
        data: payload,
      }))
    },

    initialize: async ({ state, commit }) => {
      console.log('init')
      const socket = new WebSocket(`${wsProtocol}${apiHost}:${wsPort}`)

      const nameToIdMap = {}
      const idToNameMap = {}

      for (const { name, id } of configControllers) {
        nameToIdMap[name] = id
        idToNameMap[id] = name
      }

      commit('setNameToIdMap', nameToIdMap)

      socket.addEventListener('open', () => {
        commit('setSocket', socket)
      })

      let resolveInitPromse
      commit('setInitPromise', new Promise((resolve) => {
        resolveInitPromse = resolve
      }))

      socket.addEventListener('message', ({ data: message }) => {
        const { type, data } = JSON.parse(message)
        console.log(type, data)
        if (type === 'update') {
          for (const { id, state: lightState, milliseconds, button } of data) {
            let controller = state.controllers[id]
            if (!controller) {
              controller = {
                name: idToNameMap[id],
                id,
              }
            }
            controller.state = lightState
            controller.milliseconds = milliseconds
            controller.button = button
            commit('setController', controller)
          }
          console.log('updated')

          if (resolveInitPromse) {
            resolveInitPromse()
            console.log('resolved')
            resolveInitPromse = null
          }
        }
      })

    },
  },
}

export default () => new Vuex.Store(store)

