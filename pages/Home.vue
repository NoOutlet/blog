<template>
  <div class="home">Welcome to my website, NoOutlet.net.</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "home",
  head: {
    title: "Home - NoOutlet.net",
    link: [{ rel: "canonical", href: "https://nooutlet.net/" }],
  },
});
</script>
