<template>
  <div>
    <div class="row">
      <div class="col col-auto mr-auto">
        <h1 class="text-h2 page-title">Our Products</h1>
      </div>
      <div class="col col-auto page-content">
        <v-btn
          elevation="20"
          large
          color="primary"
          :to="{ name: 'New Product' }"
          >Create New Product</v-btn
        >
      </div>
    </div>

    <v-divider class="mt-6 mb-8"></v-divider>

    <v-card
      elevation="2"
      v-for="product in products"
      :key="product.productCode"
      :to="{ name: 'Product', params: { code: product.productCode } }"
      class="mb-6 product-card"
    >
      <v-row>
        <v-col class="py-1 col-auto d-flex pr-0 ml-5">
          <v-icon x-large class="align-self-center">mdi-baguette</v-icon>
        </v-col>
        <v-col class="py-1 col-auto mr-auto">
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>{{ product.shortDescription }}</v-card-subtitle>
        </v-col>
        <v-col class="py-1 col-auto">
          <v-chip class="my-2 mr-2 font-weight-black">
            {{ product.productCode }}
          </v-chip>
          <v-chip
            class="my-2 mr-2"
            :color="product.quantity > 0 ? 'success' : 'error'"
          >
            {{ product.quantity }} in stock
          </v-chip>
          <v-chip class="my-2 mr-2" color="primary">
            £{{ product.price }} / unit
          </v-chip>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { animationsMixin } from "@/mixins/Animations";

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  mixins: [animationsMixin],
};
</script>
