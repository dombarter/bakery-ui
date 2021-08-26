<template>
  <div>
    <div class="d-flex flex-row page-title">
      <v-icon x-large color="primary" class="mr-4"
        >mdi-access-point-network-off</v-icon
      >
      <h1 class="text-h2">Oh no!</h1>
    </div>

    <v-divider class="mt-6 mb-8"></v-divider>

    <p class="text-body1 page-content">
      It looks like we're having some connection issues, check your internet
      connection and try again!
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
  mixins: [animationsMixin],
};
</script>
