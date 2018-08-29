import { ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_PRODUCTS  } from './mutations.type'

export default {
  [ADD_PRODUCT]: (state, payload) => state.items = [...state.items, ...payload.products],
  [REMOVE_PRODUCT]: (state, payload) => state.items = state.items.filter(item => item !== payload.id),
  [CLEAR_PRODUCTS]: state => state.items = []
}