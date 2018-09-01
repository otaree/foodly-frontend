import Api from '../../services/Api'

const state = {
  token: '',
  email: '',
  address: {
  }
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
    if (typeof payload.address === 'object' && Object.keys(payload.address).length === 0) return
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
  login: async ({ commit, dispatch }, userObject) => {
    try {
      const response = await Api.post('/login', { email: userObject.email, password: userObject.password, cart: { items: [] } })
      console.log(response.data)
      const { token, user, cart } = response.data
      commit(SET_USER, { user: { token, ...user } })
      dispatch('cart/setCart', cart, { root: true })
      return Promise.resolve()
    } catch (e) {
      console.log(e)
      return Promise.reject(e.response.data)
    }
  },
  logout: ({ commit }) => commit(DELETE_USER),
  setAddress: async ({ commit }, payload) => {
    try {
      const response = await Api.post('/user/setaddress', { ...payload.address }, { headers: {
        'Authorization': `Bearer ${payload.token}`
      } })
      commit(SET_ADDRESS, { address: payload.address })
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error.response.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

