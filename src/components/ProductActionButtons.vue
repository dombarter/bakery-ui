<template>
  <div class="page-content">
    <v-row>
      <v-col class="col-auto mx-0 pe-0">
        <v-btn
          elevation="20"
          class="mr-2"
          large
          color="primary"
          :to="{ name: 'Edit Product', params: { code: productCode } }"
          height="100%"
          >Edit</v-btn
        >
      </v-col>
      <v-col class="col-auto mx-0 pe-0">
        <v-btn
          elevation="20"
          class="mr-2"
          large
          color="error"
          @click="deleteProductHandler"
          height="100%"
          >Delete</v-btn
        >
      </v-col>
      <v-col class="col-auto">
        <v-form ref="form" @submit.prevent="submitStockCheckHandler">
          <v-text-field
            label="Stock take"
            outlined
            hide-details
            height="100%"
            type="number"
            v-model="quantity"
            :rules="quantityRules"
          >
            <template v-slot:append
              ><v-btn
                elevation="10"
                class="pa-1"
                large
                color="success"
                height="100%"
                type="submit"
                >Submit</v-btn
              ></template
            >
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  data() {
    return {
      quantity: undefined,
      quantityRules: [
        (v) => !!v || "Stock level is required",
        (v) => v >= 0 || "Stock level must be greater than or equal to 0",
      ],
    };
  },
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
    submitStockCheckHandler() {
      NProgress.start();
      this.submitStockTake({ code: this.productCode, quantity: this.quantity })
        .then(() => {
          this.$refs.form.reset();
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
          document.activeElement.blur();
          NProgress.done();
        });
    },
    ...mapActions("product", ["deleteProduct", "submitStockTake"]),
  },
};
</script>
