<template>
  <div>
    <v-btn
      class="ps-0 page-content"
      color="grey"
      plain
      :to="{ name: 'Products' }"
    >
      Back to products
    </v-btn>

    <v-divider class="mt-5 mb-5"></v-divider>

    <h1 class="text-h2 page-title">{{ product.name }}</h1>
    <p class="text-body1 page-title">
      {{ product.shortDescription }}
    </p>

    <div class="page-title">
      <BaseProductChips :product="product" />
    </div>

    <v-divider class="mt-5 mb-5"></v-divider>

    <ProductActionButtons :productCode="product.productCode" />

    <v-divider class="mt-5 mb-5"></v-divider>

    <h4 class="text-h6 mb-5 page-content">Reviews</h4>

    <v-expansion-panels class="mb-7 page-content" v-model="reviewPanel">
      <v-expansion-panel>
        <v-expansion-panel-header color="secondary" class="rounded-b mb-n1">
          Add a new review
        </v-expansion-panel-header>
        <v-expansion-panel-content color="secondary" class="rounded-b">
          <v-form ref="form" @submit.prevent="submitReviewHandler">
            <v-row>
              <v-col class="ma-0 pb-0">
                <v-text-field
                  outlined
                  label="Reviewer Name"
                  v-model="review.reviewer"
                  required
                  :rules="rules.reviewerRules"
                ></v-text-field>
                <v-select
                  :items="[1, 2, 3, 4, 5]"
                  label="Star Rating"
                  outlined
                  v-model="review.starRating"
                  required
                  :rules="rules.starRatingRules"
                ></v-select>
              </v-col>
              <v-col>
                <v-textarea
                  outlined
                  label="Message"
                  height="140"
                  v-model="review.message"
                  required
                  :rules="rules.messageRules"
                ></v-textarea>
                <v-btn color="primary" class="float-end" type="submit">
                  Submit Review
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <p class="text-body1 page-content" v-if="reviews.length === 0">
      There are no reviews for this product.
    </p>

    <v-card
      elevation="2"
      v-for="review in reviews"
      :key="review.message"
      class="mb-5 page-content"
    >
      <v-row>
        <v-col class="col-auto mr-auto py-0">
          <v-card-title class="pb-0">{{ review.reviewer }}</v-card-title>
          <v-card-text>{{ review.message }}</v-card-text>
        </v-col>
        <v-col
          class="col-auto py-0 justify-content-center align-center d-flex pe-10"
        >
          <div class="d-flex flex-row">
            <v-icon color="warning" medium>mdi-star</v-icon>
            <p class="text-h6 ma-0 warning--text">{{ review.starRating }}</p>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ProductActionButtons from "@/components/ProductActionButtons";
import { animationsMixin } from "@/mixins/Animations";
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  data() {
    return {
      reviewPanel: null,
      review: this.createFreshReview(),
      rules: {
        reviewerRules: [(v) => !!v || "Reviewer name is required"],
        messageRules: [(v) => !!v || "Message is required"],
        starRatingRules: [
          (v) => !!v || "Star rating is required",
          (v) => (v >= 1 && v <= 5) || "Star rating must be between 1 and 5",
        ],
      },
    };
  },
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
  methods: {
    ...mapActions("product", ["addReview"]),
    createFreshReview() {
      return {
        reviewer: "",
        message: "",
        starRating: undefined,
      };
    },
    submitReviewHandler() {
      if (this.$refs.form.validate()) {
        NProgress.start();
        this.addReview({
          code: this.product.productCode,
          review: this.review,
        })
          .then(() => {})
          .catch((error) => {
            console.error(error);
            if (error.response.status == 404) {
              this.$router.push({
                name: "404",
                params: { resource: "product" },
              });
            } else {
              this.$router.push({ name: "Network Issue" });
            }
          })
          .finally(() => {
            NProgress.done();
            this.reviewPanel = null;
            this.$refs.form.reset();
            this.review = this.createFreshReview();
          });
      }
    },
  },
  mixins: [animationsMixin],
  components: { ProductActionButtons },
};
</script>
