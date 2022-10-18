<template>
  <div>
    <button
      class="button is-large is-rounded"
      :disabled="cost > wealth"
      @click="getCat"
      :style="getBGGradient(cost)"
    >
      <FAIcon icon="cat" size="medium" class="mr-1" />
      ${{ (cost / 100).toFixed(2) }}
    </button>
    <button
      class="button is-large is-rounded"
      :disabled="foodCost > wealth"
      @click="buyFood"
      :style="getBGGradient(foodCost)"
    >
      <FAIcon icon="pizza-slice" size="medium" class="mr-1" />
      ${{ (foodCost / 100).toFixed(2) }}
    </button>
    <button
      class="button is-large is-rounded"
      :disabled="toyCost > wealth"
      @click="buyToy"
      :style="getBGGradient(toyCost)"
    >
      <FAIcon icon="futbol" size="medium" class="mr-1" />
      ${{ (toyCost / 100).toFixed(2) }}
    </button>
    <form
      v-if="number !== null"
      class="modal is-active"
      @submit.prevent="addCat"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">You bought a cat!</p>
        </header>
        <section class="modal-card-body">
          <div>Now they need a name.</div>
          <figure class="image is-256x256 container">
            <img :src="`/images/cats/${number}.jpg`" />
          </figure>
          <input type="text" minlength="3" v-model="catName" v-autofocus />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" type="submit">Take it Home</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import names from "@/assets/data/cats.js";
import { FOOD_COST, TOY_COST } from "@/pages/flash/constants.js";

export default {
  data() {
    return {
      number: null,
      catName: "",
      nameTooShort: false,
      foodCost: FOOD_COST,
      toyCost: TOY_COST,
    };
  },
  computed: {
    ...mapGetters("flash", ["cost"]),
    ...mapState("flash", ["wealth"]),
  },
  methods: {
    getBGGradient(price) {
      if (price > this.wealth) {
        const percent = Math.floor((this.wealth / price) * 100);
        return {
          background: `linear-gradient(90deg, #f7cf00 ${percent}%, #ffffff ${
            percent + 1
          }%)`,
        };
      }
    },
    getCat() {
      this.number = Math.floor(Math.random() * 500);
      this.catName = names[Math.floor(this.number / 5)];
    },
    addCat() {
      this.nameTooShort = this.catName.length < 3;
      if (!this.nameTooShort) {
        this.$store.dispatch("flash/buyCat", {
          id: this.number,
          name: this.catName,
        });
        this.number = null;
        this.catName = "";
      }
    },
    ...mapMutations("flash", ["buyFood", "buyToy"]),
  },
};
</script>
