export default {
  getProducts: state => state.items,
  cartTotalPrice: (state, getters) => getters.getProducts.reduce((total, product) => total + parseInt(product.price), 0)
}