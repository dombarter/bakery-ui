<template>
  <span>
    <v-btn class="ps-0 page-content" color="grey" plain :to="route">
      {{ label }}
    </v-btn>
    <v-divider class="mt-5 mb-5"></v-divider>
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    route: {
      type: [Object, String],
      required: true,
    },
  },
};
</script>

<style></style>
