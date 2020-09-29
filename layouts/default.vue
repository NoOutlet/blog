<template>
  <div id="app">
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "NoOutlet",
  components: { NavBar },
};
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

html {
  overflow: hidden;
}
#app {
  height: calc(100vh - #{$navbar-height});
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
}
</style>
