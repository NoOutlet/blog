<template>
  <div
    class="cubelet"
    :style="{
      transform: `
      rotateX(${cubelet.rotation[0]}deg)
      rotateY(${cubelet.rotation[1]}deg)
      rotateZ(${cubelet.rotation[2]}deg)
      translate3d(
        ${position[0] * 100}px,
        ${position[1] * 100}px,
        ${position[2] * 100}px
      )`,
    }"
  >
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face left"></div>
    <div class="face right"></div>
    <div class="face up"></div>
    <div class="face down"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { positions } from "@/composables/rubiks";
import type { Cubelet } from "@/definitions/rubiks";
export default defineComponent({
  props: {
    cubelet: {
      type: Object as PropType<Cubelet>,
      required: true,
    },
  },
  setup(props) {
    return { position: positions[props.cubelet.id] };
  },
});
</script>

<style lang="scss" scoped>
$transparency: 1;
.cubelet {
  height: 100%;
  width: 100%;
  position: absolute;
  transform-style: preserve-3d;
  backface-visibility: inherit;
  .face {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 60px;
    backface-visibility: inherit;
    color: black;
    border: 1px solid black;
    border-radius: 4px;
    &.front {
      background: rgba(255, 0, 0, $transparency);
      transform: translateZ(50px);
    }
    &.back {
      background: rgba(255, 176, 91, $transparency);
      transform: rotateY(180deg) translateZ(50px);
    }
    &.left {
      background: rgba(0, 255, 0, $transparency);
      transform: rotateY(-90deg) translateZ(50px);
    }
    &.right {
      background: rgba(0, 0, 255, $transparency);
      transform: rotateY(90deg) translateZ(50px);
    }
    &.up {
      background: rgba(255, 255, 255, $transparency);
      transform: rotateX(90deg) translateZ(50px);
    }
    &.down {
      background: rgba(247, 255, 97, $transparency);
      transform: rotateX(-90deg) translateZ(50px);
    }
  }
}
</style>