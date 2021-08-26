<template>
  <span>
    <v-chip medium class="my-2 mr-2 font-weight-black">
      {{ product.productCode }}
    </v-chip>
    <v-chip
      medium
      class="my-2 mr-2"
      :color="product.quantity > 0 ? 'success' : 'error'"
    >
      {{ product.quantity }} in stock
    </v-chip>
    <v-chip medium class="my-2 mr-2" color="primary">
      £{{ product.price }} / unit
    </v-chip>
  </span>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
