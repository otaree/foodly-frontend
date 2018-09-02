import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM, SET_CART, INCREMENT_QTY, DECREMENT_QTY } from './mutations.types'


export default {
  [SET_CART]: (state, payload) => {
    state.items = payload.items
  },
  [ADD_ITEM]: (state, payload) => state.items.push({ product: payload.item, qty: 1 }),
  [REMOVE_ITEM]: (state, payload) => state.items = state.items.filter(item => item.product._id !== payload.id),
  [CLEAR_ITEM]: state => state.items = [],
  [INCREMENT_QTY]: (state, payload) => {
    state.items = state.items.map(item => {
      if (item.product._id === payload.productId) {
        return {...item, qty: item.qty + 1 }
      }
      return item
    })
  },
  [DECREMENT_QTY]: (state, payload) => {
    state.items = state.items.map(item => {
      if (item.product._id === payload.productId && item.qty > 1) {
        return { ...item, qty: item.qty - 1}
      }
      return item
    })
  }
}