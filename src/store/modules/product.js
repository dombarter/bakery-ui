import ProductService from "@/services/ProductService";

export const namespaced = true;

export const state = {
  products: [],
  product: {},
  reviews: [],
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product);
  },
  UPDATE_PRODUCT(state, newProduct) {
    const index = state.products.indexOf(
      (p) => p.productCode === newProduct.productCode
    );
    state[index] = newProduct;
  },
  REMOVE_PRODUCT(state, productCode) {
    state.products = state.products.filter(
      (p) => p.productCode !== productCode
    );
    state.product = {};
  },
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
};

export const actions = {
  fetchProducts({ commit }) {
    return ProductService.getProducts()
      .then((response) => {
        commit("SET_PRODUCTS", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  fetchProduct({ commit, getters }, code) {
    let product = getters.getProductByCode(code);
    if (product) {
      // If the product is already cached, return it instead
      commit("SET_PRODUCT", product);
      return Promise.resolve(product);
    } else {
      return ProductService.getProduct(code)
        .then((response) => {
          commit("SET_PRODUCT", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    }
  },
  deleteProduct({ commit }, code) {
    return ProductService.deleteProduct(code)
      .then(() => {
        commit("REMOVE_PRODUCT", code);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  createProduct({ commit }, product) {
    return ProductService.createProduct(product)
      .then((response) => {
        commit("ADD_PRODUCT", response.data);
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  updateProduct({ commit }, { code, product }) {
    return ProductService.updateProduct(code, product)
      .then((response) => {
        commit("UPDATE_PRODUCT", response.data);
        return Promise.resolve(response);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  fetchReviews({ commit }, code) {
    console.warn("fetchReviews", code);
    return ProductService.getReviews(code)
      .then((response) => {
        commit("SET_REVIEWS", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
};

export const getters = {
  getProductByCode: (state) => (code) => {
    return state.products.find((p) => p.productCode == code);
  },
};
