<template>
  <div class="mt-6" v-if="mode > 0">
    <table class="table is-bordered container">
      <thead>
        <tr>
          <th></th>
          <th v-for="num in 10" :key="'num-' + num">{{ num - 1 }}</th>
        </tr>
        <tr
          v-for="num2 in 10"
          :key="'num2-' + num2"
          :class="{ 'is-selected': mode > 1 && num2 - 1 === number2 }"
        >
          <th>{{ num2 - 1 }}</th>
          <td
            v-for="num in 10"
            :key="'num3-' + num"
            :class="{ 'is-selected': mode > 2 && num - 1 === number1 }"
          >
            {{ equation(num2 - 1, num - 1) }}
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: ["number1", "number2", "mode", "equation"],
});
</script>
