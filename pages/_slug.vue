<template>
  <article class="mx-6 my-6 has-text-left">
    <h1 class="title is-3">{{ article.title }}</h1>
    <h2 class="subtitle is-6 ml-4 is-italic" @click.stop="copyDate">
      by {{ article.author }}
      <Date v-if="article.date" :date="article.date" />
      <Date v-else class="has-text-danger" :date="article.createdAt" />&nbsp;ago
    </h2>
    <nuxt-content :document="article"></nuxt-content>
    <input type="hidden" ref="copyDate" :value="'date: ' + article.createdAt" />
  </article>
</template>

<script>
import Date from "@/components/Date.vue";

export default {
  components: { Date },
  async asyncData({ $content, params }) {
    const article = await $content("posts", params.slug).fetch();
    return { article };
  },
  methods: {
    copyDate() {
      const input = this.$refs.copyDate;
      input.setAttribute("type", "text");
      input.select();
      document.execCommand("copy");
      input.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
};
</script>

<style lang="scss">
.nuxt-content {
  margin: 1rem;
  p {
    margin-top: 1rem;
  }
  a {
    font-weight: 800;
  }
  h2 {
    font-weight: 800;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
}
</style>
