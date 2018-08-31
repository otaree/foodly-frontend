import Api from '../../services/Api'

const state = {
  token: '',
  email: '',
  address: {}
}

const SET_USER = 'SET_USER'
const DELETE_USER = 'DELETE_USER'
const SET_ADDRESS = 'SET_ADDRESS'

const getters = {
  getToken: (state) => state.token,
  getEmail: state => state.email,
  getAddress: state => state.address
}

const mutations = {
  [SET_USER]: (state, payload) => {
    state.token = payload.user.token
    state.email = payload.user.email
    if (!payload.address) return
    state.address = payload.user.address
  },
  [DELETE_USER]: (state) => {
    state.token = ''
    state.email = ''
    state.address = {}
  },
  [SET_ADDRESS]: (state, payload) => {
    state.address = payload.address
  } 
}

const actions = {
  signUp: async ({ commit }, { email, password }) => {
    try {
      const response = await Api.post('/signup', { email, password })
      return Promise.resolve(response.data)
    } catch (e) {
      return Promise.reject(e.response.data)
    }
  },
  login: async ({ commit }, userObject) => {
    try {
      const response = await Api.post('/login', { email: userObject.email, password: userObject.password })
      const { token, user } = response.data
      commit(SET_USER, { user: { token, ...user } })
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e.response.data)
    }
  },
  logout: ({ commit }) => commit(DELETE_USER)
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

