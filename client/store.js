import Vue from 'vue'
import Vuex from 'vuex'
import {
  wsEndpoint,
  controllers as configControllers,
} from '../config/config'
import {
  sleep,
  decodeJWT,
} from './utils'

Vue.use(Vuex)

const store = {
  state: {
    initPromise: null,
    authPromise: null,
    authResolve: null,
    authReject: null,
    refreshPromise: null,
    refreshResolve: null,
    refreshReject: null,
    showErrorMessage: false,
    errorMessage: '',
    controllers: {},
    nameToIdMap: {},
    socket: null,
    socketId: null,
  },

  getters: {
    initPromise: (state) => {
      if (!state.initPromise) {
        throw new Error('Initialization Promise not set.')
      }
      return state.initPromise
    },
    authPromise: (state) => {
      if (!state.authPromise) {
        throw new Error('Authorization Promise not set.')
      }
      return state.authPromise
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

    resolveAuth(state) {
      if (typeof state.authResolve !== 'function') {
        // eslint-disable-next-line unicorn/prefer-type-error
        throw new Error('Not awaiting authentication.')
      }
      state.authResolve()
      state.authResolve = null
      state.authReject = null
    },

    rejectAuth(state) {
      if (typeof state.authReject !== 'function') {
        // eslint-disable-next-line unicorn/prefer-type-error
        throw new Error('Not awaiting authentication.')
      }
      state.authReject()
      state.authResolve = null
      state.authReject = null
    },

    resolveRefresh(state) {
      if (typeof state.refreshResolve !== 'function') {
        // eslint-disable-next-line unicorn/prefer-type-error
        throw new Error('Not awaiting update.')
      }
      state.refreshResolve()
      state.refreshResolve = null
      state.refreshReject = null
    },

    rejectRefresh(state) {
      if (typeof state.refreshReject !== 'function') {
        // eslint-disable-next-line unicorn/prefer-type-error
        throw new Error('Not awaiting update.')
      }
      state.refreshReject()
      state.refreshResolve = null
      state.refreshReject = null
    },

    setControllers(state, controllers) {
      state.controllers = controllers
    },

    setController(state, controller) {
      Vue.set(state.controllers, controller.id, controller)
    },

    setNameToIdMap(state, nameToIdMap) {
      state.nameToIdMap = nameToIdMap
    },

    setSocket(state, socket) {
      state.socket = socket
    },

    setSocketId(state, socketId) {
      state.socketId = socketId
    },
  },

  actions: {
    showError: ({ commit }, message) => {
      commit('showError', message)
    },

    dismissError: ({ commit }) => {
      commit('hideError')
    },

    send: async ({ state: { socket, socketId }, dispatch }, payload) => {
      if (!await dispatch('manageSocket')) {
        return false
      }
      if (!payload.jwt) {
        payload.jwt = localStorage.getItem('jwt')
      }
      if (typeof payload.id === 'undefined') {
        payload.id = socketId
      }
      socket.send(JSON.stringify(payload))
    },

    manageSocket: async ({ state: { socket }, state, dispatch, commit }, retryAttepts = 5) => {
      if (!socket || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
        commit('showError', 'Connection closed. Retrying...')
        await dispatch('initialize')
        try {
          await state.authPromise
          commit('hideError')
        } catch (error) {
          commit('showError', error)
        }
        return
      }
      if (socket.readyState === WebSocket.OPEN) {
        return true
      }
      if (socket.readyState === WebSocket.CONNECTING) {
        if (retryAttepts > 0) {
          commit('showError', 'Connecting...')
          await sleep(1000)
          await dispatch('manageSocket', retryAttepts - 1)
        }
        socket.close()
        commit('showError', 'Connection failed.')
      }
    },

    authorize: ({ state, dispatch }, password) => {
      // There's no need for getters and mutations since these are only used internally
      state.authPromise = new Promise((resolve, reject) => {
        state.authResolve = resolve
        state.authReject = reject
      })

      dispatch('send', {
        type: 'auth',
        data: { password },
      })

      return state.authPromise
    },

    deauthorize: ({ state }) => {
      state.authPromise = null
      state.authResolve = null
      state.authReject = null

      localStorage.removeItem('jwt')
    },

    scheduleRefresh({ dispatch }, jwt) {
      const { exp } = decodeJWT(jwt)
      // Refresh the token 2 minutes before it expires
      setTimeout(() => {
        dispatch('send', {
          type: 'reauth',
          data: { jwt },
        })
      }, exp - Date.now() - (2 * 60 * 1000))
    },

    refreshControllers: ({ state, dispatch }, requestPromise = false) => {
      if (requestPromise) {
        state.refreshPromise = new Promise((resolve, reject) => {
          state.refreshResolve = resolve
          state.refreshReject = reject
        })
      }

      dispatch('send', {
        type: 'refresh',
      })

      return state.refreshPromise
    },

    askController: async ({ dispatch }, payload) => dispatch('send', {
      type: 'get',
      data: payload,
    }),

    tellController: async ({ dispatch }, payload) => dispatch('send', {
      type: 'set',
      data: payload,
    }),

    initialize: async ({ state, commit, dispatch }) => {
      let socket
      try {
        socket = new WebSocket(`${wsEndpoint}`)
      } catch (error) {
        commit('showError', 'Cannot connect.')
        return
      }

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
        let { type, data } = JSON.parse(message)

        if (type === 'auth') {
          localStorage.setItem('jwt', data.jwt)
          dispatch('scheduleRefresh', data.jwt)
          commit('setSocketId', data.id)
          commit('resolveAuth')
          return
        }
        if (type === 'update') {
          for (const { id, state: controllerState } of data) {
            if (state.refreshResolve) {
              commit('resolveRefresh')
            }
            let controller = state.controllers[id]
            if (!controller) {
              controller = {
                name: idToNameMap[id],
                id,
              }
            }
            controller.state = controllerState
            commit('setController', controller)
          }

          if (resolveInitPromse) {
            resolveInitPromse()
            resolveInitPromse = null
          }
          return
        }
        if (type === 'error') {
          if (state.authResolve && !localStorage.getItem('jwt')) {
            commit('rejectAuth')
          }
          commit('showError', data.error)
          return
        }

      })

    },
  },
}

export default () => new Vuex.Store(store)

