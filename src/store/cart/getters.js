export default {
  getProducts: state => state.items,
  getTotalItem:  state => state.items.length,
  cartTotalPrice: (state, getters) => getters.getProducts.reduce((total, product) => total + parseInt(product.price), 0)
}