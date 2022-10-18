<template>
  <svg class="world" height="900" width="1800">
    <template v-for="thing in things">
      <Thing :key="thing.i" :thing="thing" v-if="!thing.dead" />
    </template>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Thing from "./Thing.vue";

export default defineComponent({
  name: "World",
  components: { Thing },
  props: ["things"],
});
</script>

<style scoped>
.world {
  border: 1px solid grey;
  text-align: center;
}
</style>
