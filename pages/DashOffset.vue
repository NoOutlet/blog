<template>
  <main>
    <svg viewBox="0 0 360 360">
      <circle cx="170" cy="170" r="159" :stroke-dashoffset="dashOffset" :stroke-dasharray="dashArray"></circle>

      <g class="start-arrow">
        <text x="270" y="167">Start</text>
        <line x1="270" y1="170" x2="315" y2="170" />
        <line x1="315" y1="170" x2="310" y2="165" />
        <line x1="315" y1="170" x2="310" y2="175" />
      </g>
      <g v-if="labels">
        <g v-for="notch in 100" :key="'notch' + notch" :transform="'rotate(' + notch * 3.6 + ', 170, 170)'"
          class="notch">
          <line x1="332" y1="170" x2="337" y2="170"></line>
          <text x="320" y="163">{{ notch - 1 + simulatedDashOffset }}</text>
        </g>
      </g>
    </svg>
    <div>
      Toggle labels: <input type="checkbox" v-model="labels" />
    </div>
    <div>
      Dash Offset: <input type="number" v-model.number="simulatedDashOffset" />
    </div>
    <div>
      Dash Array: <input v-for="(number, i) in simulatedDashArray" :key="i" type="number"
        v-model.number="simulatedDashArray[i]" />
      <button @click="simulatedDashArray.push(0)">+</button>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const simulatedDashOffset = ref(0)
    const simulatedDashArray = ref([4, 6])
    const dashOffset = computed(() => simulatedDashOffset.value * 10)
    const dashArray = computed(() => simulatedDashArray.value.map(num => num * 10).join(', '))
    const labels = ref(true)
    return { simulatedDashOffset, dashOffset, dashArray, simulatedDashArray, labels }
  },
})
</script>

<style lang="scss" scoped>
main {
  width: 40rem;
  padding: 4rem;
  margin: auto;
}

circle {
  fill: none;
  stroke-width: 18;
  stroke: lightgray;
}

line {
  stroke: black;
}

text {
  font-size: 10px;
}

.notch text {
  font-size: 8px;
}

input {
  width: 3rem;
}
</style>