<template>
  <div>
    <BaseBackButton label="Back to products" :route="{ name: 'Products' }" />

    <BaseTitle>
      <template v-slot:title>{{ product.name }}</template>
      <template v-slot:subtitle>{{ product.shortDescription }}</template>
      <template v-slot:bottom-content>
        <BaseProductChips :product="product" />
      </template>
    </BaseTitle>

    <ProductActionButtons :productCode="product.productCode" />

    <v-divider class="mt-5 mb-5"></v-divider>

    <ProductReviews :reviews="reviews" :productCode="product.productCode" />
  </div>
</template>

<script>
import ProductActionButtons from "@/components/ProductActionButtons";
import ProductReviews from "@/components/ProductReviews";
import { animationsMixin } from "@/mixins/Animations";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
  },
  mixins: [animationsMixin],
  components: { ProductActionButtons, ProductReviews },
};
</script>
