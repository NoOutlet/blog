<template>
  <div>
    <div class="board-grid">
      <template v-for="row in boardSize">
        <div v-for="col in boardSize" :key="`${row}-${col}`" class="square"
          :style="{ gridArea: `${row} / ${col} / span 1 / span 1` }"></div>
      </template>
      <div v-for="(segment, i) of snake" :key="i" :style="{
        gridArea: `${segment.location[0]} / ${segment.location[1]} / span 1 / span 1`,
      }" class="snake" :class="getDirectionClasses(segment)"></div>
      <div v-for="apple of apples" :key="apple[0] + '-' + apple[1]" :style="{
        gridArea: `${apple[0]} / ${apple[1]} / span 1 / span 1`,
      }" class="apple"></div>
    </div>
    <button v-if="!isRunning" @click.prevent="startGame">Start</button>
    <div v-else>
      <button @click.prevent="move('North')">Up</button>
      <button @click.prevent="move('East')">Right</button>
      <button @click.prevent="move('South')">Down</button>
      <button @click.prevent="move('West')">Left</button>
    </div>
  </div>
</template>

<script lang="ts">
import type { SnakeSegment } from "@/definitions/snake"
import { useSnake } from "@/composables/snake";
import { defineComponent, onMounted, onUnmounted } from "vue";

export default defineComponent({
  setup() {
    const { isRunning, startGame, snake, apples, boardSize, move, pause } = useSnake();

    const getDirectionClasses = (segment: SnakeSegment) => {
      const isHead = segment === snake.value[0]
      const isTail = segment === snake.value[snake.value.length - 1]
      return `from${segment.from} to${segment.to} ${isHead ? "head" : ""} ${isTail ? "tail" : ""}`
    }

    const keyMove = (ev: KeyboardEvent) => {
      const lowercase = ev.key.toLowerCase();
      switch (lowercase) {
        case "w":
        case "arrowup":
          move("North");
          break;
        case "d":
        case "arrowright":
          move("East");
          break;
        case "s":
        case "arrowdown":
          move("South");
          break;
        case "a":
        case "arrowleft":
          move("West");
          break;
        case " ":
          pause();
          break;
      }
    };

    onMounted(() => {
      window.onkeyup = keyMove;
    });
    onUnmounted(() => {
      window.onkeyup = null;
    });

    return { isRunning, startGame, snake, apples, boardSize, move, getDirectionClasses };
  },
});
</script>

<style lang="scss" scoped>
.board-grid {
  display: grid;
  grid-template-columns: repeat(20, 2rem);
  grid-template-rows: repeat(20, 2rem);

  .square {
    background: lightgray;
    border: 1px white inset;
  }

  .snake {
    background: green;
    margin: 29%;
    border-radius: 4px;
    position: relative;

    &::before,
    &::after {
      content: "";
      background-color: green;
      position: absolute;
    }

    &.head {
      &::after {
        border-radius: 20%;
      }

      &.toEast::after,
      &.toWest::after {
        top: -15%;
        height: 130%;
        width: 90%;
      }

      &.toEast::after {
        right: -50%;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }

      &.toWest::after {
        left: -50%;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }

      &.toNorth::after,
      &.toSouth::after {
        left: -15%;
        width: 130%;
        height: 90%;
      }

      &.toNorth::after {
        top: -50%;
        border-top-right-radius: 50%;
        border-top-left-radius: 50%;
      }

      &.toSouth::after {
        bottom: -50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    }

    &.tail {

      &::before {
        border-radius: 1rem;
      }

      &.fromEast::before,
      &.fromWest::before {
        top: 10%;
        height: 80%;
        width: 50%;
      }

      &.fromEast::before {
        right: -20%;
      }

      &.fromWest::before {
        left: -20%;
      }

      &.fromNorth::before,
      &.fromSouth::before {
        left: 10%;
        width: 80%;
        height: 50%;
      }

      &.fromNorth::before {
        top: -20%;
      }

      &.fromSouth::before {
        bottom: -20%;
      }
    }

    &.fromWest::before,
    &.toWest::after,
    &.fromEast::before,
    &.toEast::after {
      top: 1px;
      width: 85%;
      height: 100%;
    }

    &.fromWest::before,
    &.toWest::after {
      left: -70%;
    }

    &.fromEast::before,
    &.toEast::after {
      right: -70%;
    }

    &.fromNorth::before,
    &.toNorth::after,
    &.fromSouth::before,
    &.toSouth::after {
      left: 1px;
      height: 85%;
      width: 100%;
    }

    &.fromNorth::before,
    &.toNorth::after {
      top: -70%;
    }

    &.fromSouth::before,
    &.toSouth::after {
      bottom: -70%;
    }
  }

  .apple {
    background: red;
    margin: 34%;
    border-top-left-radius: 20%;
    border-top-right-radius: 20%;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
  }
}
</style>
