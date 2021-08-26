<template>
  <div>
    <BaseTitle>
      <template v-slot:title>Our Products</template>
      <template v-slot:right-content>
        <v-btn
          elevation="20"
          large
          color="primary"
          :to="{ name: 'New Product' }"
          >Create New Product</v-btn
        >
      </template>
    </BaseTitle>

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
          <BaseProductChips :product="product" />
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
