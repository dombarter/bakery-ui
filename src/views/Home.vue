<template>
  <div>
    <BaseTitle>
      <template v-slot:title>Welcome!</template>
    </BaseTitle>

    <p class="text-body1 page-content">
      Welcome to the '3Squared Bakery' admin site. Here you can read information
      and reviews about all our products as well as performing vital admin
      activities such as adding new products and submitting stock takes.
    </p>

    <v-divider class="mt-6 mb-8"></v-divider>

    <h1 class="text-h4 page-content">Quick Links</h1>

    <v-container class="px-0 page-content">
      <v-btn
        elevation="20"
        class="mr-2"
        x-large
        :to="{ name: 'Products' }"
        color="primary"
      >
        Products
      </v-btn>
      <v-btn
        elevation="20"
        class="mr-2"
        x-large
        :to="{ name: 'Opening Hours' }"
        color="primary"
        >Opening Hours</v-btn
      >
      <v-btn
        elevation="20"
        class="mr-2"
        x-large
        color="success"
        :to="{ name: 'New Product' }"
        >Create Product</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import { animationsMixin } from "@/mixins/Animations";

export default {
  mixins: [animationsMixin],
};
</script>
