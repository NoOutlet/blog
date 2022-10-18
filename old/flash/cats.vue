<template>
  <div class="columns is-multiline is-centered is-mobile">
    <div v-for="cat in cats" :key="cat.id" class="column is-narrow">
      <CatCard :cat="cat" :now="now" />
    </div>
    <div class="container mt-4" v-if="!cats.length">
      <article class="message is-info">
        <div class="message-header">
          <p>You don't have any cats</p>
        </div>
        <div class="message-body">
          You don't currently own any cats. To buy a cat, visit the
          <nuxt-link :to="{ name: 'flash-store' }">Store</nuxt-link>&nbsp;and
          click the button to buy a cat.
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CatCard from "@/components/flash/CatCard.vue";

export default {
  data() {
    return {
      now: Date.now(),
      interval: null,
    };
  },
  components: { CatCard },
  computed: mapState("flash", ["cats"]),
  methods: {
    updateTime() {
      this.now = Date.now();
    },
  },
  mounted() {
    this.interval = setInterval(this.updateTime, 10 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 256px;
}
</style>
