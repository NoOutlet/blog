<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      This isn't a page. How did you even get here? Are you trying to hack me?
    </h1>
    <h1 v-else>An error occurred. What did you do?</h1>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
