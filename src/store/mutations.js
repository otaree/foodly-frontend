import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM } from './mutations.types'


export default {
  [ADD_ITEM]: (state, payload) => state.items.push(payload.item),
  [REMOVE_ITEM]: (state, payload) => state.items = state.items.filter(item => item._id !== payload.id),
  [CLEAR_ITEM]: state => state.items = []
}