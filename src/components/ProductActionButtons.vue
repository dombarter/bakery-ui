<template>
  <div class="page-content d-flex flex-row">
    <v-btn
      elevation="20"
      class="mr-2"
      large
      color="primary"
      :to="{ name: 'Edit Product', params: { code: productCode } }"
      >Edit</v-btn
    >
    <v-btn
      elevation="20"
      class="mr-2"
      large
      color="error"
      @click="deleteProductHandler"
      >Delete</v-btn
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  props: {
    productCode: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteProductHandler() {
      NProgress.start();
      this.deleteProduct(this.productCode)
        .then(() => {
          this.$router.push({ name: "Products" });
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status == 404) {
            this.$router.push({ name: "404", params: { resource: "product" } });
          } else {
            this.$router.push({ name: "Network Issue" });
          }
        })
        .finally(() => {
          NProgress.done();
        });
    },
    ...mapActions("product", ["deleteProduct"]),
  },
};
</script>
