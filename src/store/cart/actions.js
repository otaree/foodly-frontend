import { findIndex } from 'underscore'
import Api from '../../services/Api'
import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM, SET_CART, INCREMENT_QTY, DECREMENT_QTY } from './mutations.types'


export default {
  setCart: ({ commit }, cart) => commit(SET_CART, cart.products),
  addItem: async ({ state, commit, rootState }, item) => {
    if (findIndex(state.items, product => product._id === item._id) !== -1) {
      return Promise.reject('Item already in cart')
    }
    const token = rootState.user.token
    if (token.trim().length === 0) {
      return commit(ADD_ITEM, { item })
    } else {
      try {
        const cart = await Api.put('/cart/add', { item }, { headers: { 'Authorization': `bearer ${token}` } })
        commit(SET_CART, { items: cart.products })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject()
      }
    }
  },
  increment: async ({ state, commit, rootState }, id) => {
    const token = rootState.user.token
    if (token.trim().length === 0) {
      return commit(INCREMENT_QTY, { productId: id })
    }
    try {
      const cart = await Api.patch('/cart/increment', { productId: id }, { headers: { 'Authorization': `bearer ${token}` } })
      commit(SET_CART, cart.products)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  },
  decrement: async ({ state, commit, rootState }, id) => {
    const token = rootState.user.token
    if (token.trim().length === 0) {
      return commit(DECREMENT_QTY, { productId: id })
    }
    try {
      const cart = await Api.patch('/cart/decrement', { productId: id }, { headers: { 'Authorization': `bearer ${token}` } })
      commit(SET_CART, cart.products)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  },
  removeItem: async ({ state, commit, rootState }, id) => {
    const token = rootState.user.token
    if (token.trim().length === 0) {
      return commit(REMOVE_ITEM, { id })
    } else {
      try {
        const cart = await Api.patch('/cart/remove', { item: { _id: id } }, { headers: { 'Authorization': `bearer ${token}` } })
        commit(SET_CART, { items: cart.products })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject()
      }
    }
  },
  clear: async ({ state, commit, rootState }) => {
    const token = rootState.user.token
    if (token.trim().length === 0) {
      return commit(CLEAR_ITEM)
    } else {
      try {
        await Api.delete('/cart/clear', { headers: { 'Authorization': `bearer ${token}` } })
        commit(CLEAR_ITEM)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject()
      }
    }
  }
}