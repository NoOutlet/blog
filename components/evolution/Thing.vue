<template>
  <g
    :transform="
      'translate(' + (thing.x * 10 + 5) + ', ' + (thing.y * 10 + 5) + ')'
    "
  >
    <circle
      :class="{ newborn: thing.newborn }"
      :fill="
        'rgb(' +
        thing.color[0] +
        ', ' +
        thing.color[1] +
        ', ' +
        thing.color[2] +
        ')'
      "
      r="5"
    >
      <title>{{ JSON.stringify(thing) }}</title>
    </circle>
  </g>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Thing",
  props: ["thing"],
});
</script>

<style scoped>
g {
  transition: transform 0.6s;
}
.newborn {
  animation: newborn 1s infinite;
}

@keyframes newborn {
  from {
    transform: scale(2);
  }
  to {
    transform: scale(0.2);
  }
}
</style>
