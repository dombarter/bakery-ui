<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            The 3Squared Bakery
          </v-list-item-title>
          <v-list-item-subtitle>
            A local bakery for developers
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-container class="text-center">
          <small>© 2021 | The 3Squared Bakery</small>
        </v-container>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container class="mt-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    navItems: [
      {
        title: "Home",
        icon: "mdi-home",
        route: { name: "Home" },
      },
      {
        title: "Products",
        icon: "mdi-format-list-bulleted",
        route: { name: "Products" },
      },
      {
        title: "Opening Hours",
        icon: "mdi-clock",
        route: { name: "Opening Hours" },
      },
    ],
  }),
};
</script>
