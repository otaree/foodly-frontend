export default {
  getProducts: state => state.items,
  cartTotalPrice: (state, getter) => getter.getProducts.reduce((total, product) => total + parseInt(product.price))
}