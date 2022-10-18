<template>
  <div class="container pt-3">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { NavigationGuard } from "vue-router";
import { useColoring } from "@/composables/color";

const navigationGuard: NavigationGuard = (to) => {
  const { pictures } = useColoring();
  const validPictures = Object.keys(pictures.value);
  const routeIsInvalid =
    to.params.pageName && !validPictures.includes(to.params.pageName as string);
  const routeIsRoot = to.name === "Color";
  if (routeIsInvalid || routeIsRoot) {
    return { name: "Selection" };
  }
};

export default defineComponent({
  beforeRouteEnter: navigationGuard,
  beforeRouteUpdate: navigationGuard,
});
</script>
