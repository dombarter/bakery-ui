<template>
  <v-container class="page-content">
    <v-row>
      <v-col class="col-md-6 px-0">
        <v-alert dense outlined type="error" v-show="error">
          {{ error }}
        </v-alert>
        <v-form ref="form" @submit.prevent="submitProductHandler">
          <v-text-field
            outlined
            label="Product Code"
            v-model="product.productCode"
            required
            :counter="3"
            :rules="rules.productCodeRules"
            :disabled="disableProductCode"
          ></v-text-field>
          <v-text-field
            outlined
            label="Name"
            v-model="product.name"
            required
            :rules="rules.nameRules"
          ></v-text-field>
          <v-textarea
            outlined
            label="Short Description"
            v-model="product.shortDescription"
            required
            :rules="rules.shortDescriptionRules"
          ></v-textarea>
          <v-text-field
            outlined
            label="Price"
            v-model="product.price"
            required
            :rules="rules.priceRules"
            type="number"
            prepend-inner-icon="mdi-currency-gbp"
          ></v-text-field>
          <v-text-field
            outlined
            label="Quantity"
            v-model="product.quantity"
            required
            :rules="rules.quantityRules"
            type="number"
          ></v-text-field>
          <v-btn elevation="20" large color="primary" type="submit">{{
            submitLabel
          }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      rules: {
        productCodeRules: [
          (v) => !!v || "Product code is required",
          (v) =>
            v.length === 3 || "Product code must be 3 characters in length",
        ],
        nameRules: [(v) => !!v || "Name is required"],
        shortDescriptionRules: [(v) => !!v || "Short description is required"],
        quantityRules: [
          (v) => !!v || "Quantity is required",
          (v) => v >= 0 || "Quantity must be greater than or equal to 0",
        ],
        priceRules: [
          (v) => !!v || "Price is required",
          (v) => v >= 0 || "Price must be greater than or equal to 0",
        ],
      },
    };
  },
  props: {
    submitLabel: {
      type: String,
      required: true,
      default: "Create Product",
    },
    initialProduct: {
      type: Object,
      required: false,
    },
    error: {
      type: String,
      required: false,
      default: undefined,
    },
    disableProductCode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  created() {
    // Map initial product over to internal product
    this.product = this.initialProduct || this.createFreshProduct();
  },
  methods: {
    createFreshProduct() {
      return {
        productCode: "",
        name: "",
        shortDescription: "",
        quantity: undefined,
        price: undefined,
      };
    },
    submitProductHandler() {
      if (this.$refs.form.validate()) {
        this.$emit("valid-product-submitted", this.product);
      }
    },
  },
};
</script>

<style></style>
