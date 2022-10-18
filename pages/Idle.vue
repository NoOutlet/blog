<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4-tablet is-3-widescreen is-2-fullhd">
        <SideMenu />
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { NavigationGuard } from "vue-router";
import { gameData } from "@/assets/data/idleGame";
import SideMenu from "@/components/idle/SideMenu.vue";

const navigationGuard: NavigationGuard = (to) => {
  const validSkills = Object.keys(gameData.skills);
  const routeIsInvalid =
    to.name === "Skill" && !validSkills.includes(to.params.skill as string);
  const routeIsRoot = to.name === "Idle";
  if (routeIsInvalid || routeIsRoot) {
    return { name: "Explanation" };
  }
};

export default defineComponent({
  components: { SideMenu },
  beforeRouteEnter: navigationGuard,
  beforeRouteUpdate: navigationGuard,
});
</script>