<template>
  <div>
    <div class="d-flex flex-row page-title">
      <v-icon x-large color="primary" class="mr-4">mdi-help</v-icon>
      <h1 class="text-h2">Oops!</h1>
    </div>

    <v-divider class="mt-6 mb-8"></v-divider>

    <p class="text-body1 page-content">
      The {{ resource }} you're looking for is not here!
    </p>

    <v-btn
      elevation="20"
      class="mr-2"
      x-large
      :to="{ name: 'Home' }"
      color="primary"
    >
      Back to the home page
    </v-btn>
  </div>
</template>

<script>
import { animationsMixin } from "@/mixins/Animations";

export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
  mixins: [animationsMixin],
};
</script>
