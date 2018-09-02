export default {
  getProducts: state => state.items,
  getTotalItem:  (state, getters) => {
    return getters.getProducts.length
  },
  cartTotalPrice: (state, getters) => getters.getProducts.reduce((total, item) => total + parseInt(item.product.price), 0)
}