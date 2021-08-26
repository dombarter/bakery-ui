import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Products from "@/views/Products";
import Product from "@/views/Product";
import NewProduct from "@/views/NewProduct";
import EditProduct from "@/views/EditProduct";
import OpeningHours from "@/views/OpeningHours";
import NotFound from "@/views/NotFound";
import NetworkIssue from "@/views/NetworkIssue";
import store from "@/store/index";
import NProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    props: true,
    beforeEnter: (routeTo, routeFrom, next) => {
      store
        .dispatch("product/fetchProducts")
        .then((products) => {
          routeTo.params.products = products;
          next();
        })
        .catch((error) => {
          console.log(error);
          next({ name: "Network Issue" });
        });
    },
  },
  {
    path: "/products/new",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/products/:code",
    name: "Product",
    component: Product,
    props: true,
    beforeEnter: (routeTo, routeFrom, next) => {
      store
        .dispatch("product/fetchProduct", routeTo.params.code)
        .then((product) => {
          routeTo.params.product = product;
        })
        .then(() => store.dispatch("product/fetchReviews", routeTo.params.code))
        .then((reviews) => {
          routeTo.params.reviews = reviews;
        })
        .then(() => next())
        .catch((error) => {
          console.error(error);
          if (error.response.status == 404) {
            next({ name: "404", params: { resource: "product" } });
          } else {
            next({ name: "Network Issue" });
          }
        });
    },
  },
  {
    path: "/products/:code/edit",
    name: "Edit Product",
    component: EditProduct,
    props: true,
    beforeEnter: (routeTo, routeFrom, next) => {
      store
        .dispatch("product/fetchProduct", routeTo.params.code)
        .then((product) => {
          routeTo.params.product = product;
        })
        .then(() => next())
        .catch((error) => {
          console.error(error);
          if (error.response.status == 404) {
            next({ name: "404", params: { resource: "product" } });
          } else {
            next({ name: "Network Issue" });
          }
        });
    },
  },
  {
    path: "/hours",
    name: "Opening Hours",
    component: OpeningHours,
    props: true,
    beforeEnter: (routeTo, routeFrom, next) => {
      store
        .dispatch("bakery/fetchHours")
        .then((hours) => {
          routeTo.params.hours = hours;
        })
        .then(() => next())
        .catch((error) => {
          console.error(error);
          if (error.response.status == 404) {
            next({ name: "404", params: { resource: "page" } });
          } else {
            next({ name: "Network Issue" });
          }
        });
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-issue",
    name: "Network Issue",
    component: NetworkIssue,
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
