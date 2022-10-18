<template>
  <div class="container">
    <button @click="addNumber" class="button">Add Number</button>
    <button @click="reset" class="button">Reset</button>
    <div class="tile is-ancestor">
      <div
        class="tile is-parent is-vertical is-2"
        v-for="(row, i) in grid"
        :key="i"
      >
        <div
          v-for="(block, j) in row"
          :key="j"
          class="tile is-child box notification"
          @click="selectBlock(i, j)"
          :class="{
            'is-primary': isSelected(i, j),
          }"
        >
          <img v-if="block" :src="getMergeImage(block.toString())" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMerge } from "../composables/merge";
import { getMergeImage } from "../assets/data/mergeImages";

export default defineComponent({
  setup() {
    return {
      ...useMerge(),
      getMergeImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.box {
  min-height: 40%;
}
</style>