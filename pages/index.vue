<template>
  <div class="mx-6 has-text-left">
    <div class="mt-5" v-for="blog in blogs" :key="blog.slug">
      <NuxtLink :to="{ name: 'slug', params: { slug: blog.slug } }">
        <span class="is-size-4">{{ blog.title }}</span>
        <span class="has-text-dark is-italic ml-3">
          <Date v-if="blog.date" :date="blog.date" />
          <Date
            v-else
            class="has-text-danger"
            :date="blog.createdAt"
          />&nbsp;ago
        </span>
        <br />
        <div class="is-size-6 has-text-dark">{{ blog.description }}</div>
        <div class="tags">
          <span
            v-for="tag in blog.tags"
            :key="tag"
            class="tag is-warning is-light"
            >{{ tag }}</span
          >
        </div>
      </NuxtLink>
      <hr />
    </div>
  </div>
</template>

<script>
import Date from "@/components/Date.vue";

export default {
  name: "blogs",
  components: {
    Date,
  },
  data() {
    return {
      blogs: [],
    };
  },
  async fetch() {
    this.blogs = await this.$content("posts")
      .only(["title", "slug", "description", "createdAt", "date", "tags"])
      .sortBy("date", "desc")
      .sortBy("createdAt", "desc")
      .fetch();
  },
};
</script>
