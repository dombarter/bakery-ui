<template>
  <div>
    <BaseBackButton label="Back to products" :route="{ name: 'Products' }" />

    <h1 class="text-h2 page-title">Create New Product</h1>
    <v-divider class="mt-5 mb-5"></v-divider>

    <div class="page-content">
      <ProductForm
        submitLabel="Create Product"
        v-on:valid-product-submitted="createProductHandler"
        :error="error"
      />
    </div>
  </div>
</template>

<script>
import { animationsMixin } from "@/mixins/Animations";
import ProductForm from "@/components/ProductForm";
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  data() {
    return {
      error: undefined,
    };
  },
  methods: {
    createProductHandler(product) {
      NProgress.start();
      this.createProduct(product)
        .then(() => {
          this.$router.push({
            name: "Product",
            params: { code: product.productCode },
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status == 400) {
            this.error = error.response.data.message;
          } else {
            this.$router.push({ name: "Network Issue" });
          }
        })
        .finally(() => {
          NProgress.done();
        });
    },
    ...mapActions("product", ["createProduct"]),
  },
  mixins: [animationsMixin],
  components: { ProductForm },
};
</script>

<style></style>
