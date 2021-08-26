import Vue from "vue";
import Vuex from "vuex";

import * as product from "@/store/modules/product";
import * as bakery from "@/store/modules/bakery";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    bakery,
  },
});
