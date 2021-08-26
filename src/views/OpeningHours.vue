<template>
  <div>
    <BaseTitle>
      <template v-slot:title>Opening Hours</template>
    </BaseTitle>

    <v-list class="page-content">
      <v-list-item two-line v-for="day in days" :key="day">
        <v-list-item-content>
          <v-list-item-title>{{ day }}</v-list-item-title>
          <v-list-item-subtitle>{{
            hours[day.toLowerCase()]
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { animationsMixin } from "@/mixins/Animations";

export default {
  data() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
      hours: {
        monday: "09:00 - 17:00",
        tuesday: "09:00 - 17:00",
        wednesday: "09:00 - 17:00",
        thursday: "09:00 - 17:00",
        friday: "09:00 - 17:00",
        saturday: "09:00 - 17:00",
        sunday: "09:00 - 17:00",
      },
    };
  },
  mixins: [animationsMixin],
};
</script>

<style></style>
