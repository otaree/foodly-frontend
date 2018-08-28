import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM } from './mutations.types'

export default {
  addItem: ({ commit }, item) => commit(ADD_ITEM, { item }),
  removeItem: ({ commit }, id) => commit(REMOVE_ITEM, { id }),
  clear: ({ commit }) => commit(CLEAR_ITEM)
}