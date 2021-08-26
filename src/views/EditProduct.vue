<template>
  <div>
    <v-btn
      class="ps-0 page-content"
      color="grey"
      plain
      :to="{ name: 'Product', params: { code: product.productCode } }"
    >
      Cancel
    </v-btn>

    <v-divider class="mt-5 mb-5"></v-divider>
    <h1 class="text-h2 page-title">Edit {{ product.name }}</h1>
    <v-divider class="mt-5 mb-5"></v-divider>

    <div class="page-content">
      <ProductForm
        submitLabel="Update Product"
        :initialProduct="product"
        v-on:valid-product-submitted="updateProductHandler"
        :error="error"
        disableProductCode
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
      productCode: "",
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.productCode = this.product.productCode;
  },
  methods: {
    updateProductHandler(updatedProduct) {
      NProgress.start();
      this.updateProduct({
        code: this.productCode,
        product: updatedProduct,
      })
        .then(() => {
          this.$router.push({
            name: "Product",
            params: { code: this.productCode },
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
    ...mapActions("product", ["updateProduct"]),
  },
  mixins: [animationsMixin],
  components: { ProductForm },
};
</script>

<style></style>
