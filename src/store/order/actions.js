import { ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_PRODUCTS } from './mutations.type'

export default {
  addProduct: ({ commit }, products) => commit(ADD_PRODUCT, { products }),
  removeProduct: ({ commit }, id) => commit(REMOVE_PRODUCT, { id }),
  clearProducts: ({ commit }) => commit(CLEAR_PRODUCTS)
}