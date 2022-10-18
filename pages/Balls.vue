<template>
  <div class="balls">
    <canvas ref="canvas" @mousedown="createBall" @mouseup="addBall" @mousemove="mouseMove"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
// import { useVoiceCommands } from "@/composables/voice";
import { makeBall } from "@/composables/ball";
import type { Bounds, CoordinateData, DrawableInterface } from "@/definitions/balls";

export default defineComponent({
  setup() {
    const gravity = ref(1);

    const canvas = ref();
    const newBall = ref<DrawableInterface | null>(null);

    let canvasContext: CanvasRenderingContext2D | undefined;
    const bounds: Bounds = [0, 0, 0, 0];
    const things: DrawableInterface[] = [];

    let requestId: number = 0;
    const loop = () => {
      canvasContext?.clearRect(...bounds);
      things.forEach(({ move, draw }) => {
        move();
        draw();
      });
      newBall.value?.draw();
      newBall.value?.drawPath();
      newBall.value?.pulsate();
      requestId = requestAnimationFrame(loop);
    };

    const createBall = (ev: MouseEvent) => {
      const position = [ev.offsetX, ev.offsetY] as CoordinateData;
      newBall.value = makeBall(canvasContext!, bounds, gravity, position);
      newBall.value.mouseMove(position);
    };

    const addBall = () => {
      if (newBall.value) {
        things.push(newBall.value!);
        newBall.value = null;
      }
    };

    const mouseMove = (ev: MouseEvent) => {
      const position = [ev.offsetX, ev.offsetY] as CoordinateData;
      newBall.value?.mouseMove(position);
    };
    /*
        useVoiceCommands([
          [
            "create ball",
            (command) => {
              const xMatch = /x\s?(-?\d+)/i.exec(command);
              const yMatch = /y\s?(-?\d+)/i.exec(command);
              const offsetX = xMatch
                ? parseInt(xMatch[1])
                : Math.floor(Math.random() * bounds[2]);
              const offsetY = yMatch
                ? parseInt(yMatch[1])
                : Math.floor(Math.random() * bounds[3]);
              const fakeMouseEvent = { offsetX, offsetY } as MouseEvent;
              createBall(fakeMouseEvent);
              const triggerWords: string[] = [];
              if (xMatch) {
                triggerWords.push(xMatch[0]);
              }
              if (yMatch) {
                triggerWords.push(yMatch[0]);
              }
              return triggerWords;
            },
          ],
          [
            "set speed",
            (command) => {
              const xMatch = /x\s?(-?\d+)/i.exec(command);
              const yMatch = /y\s?(-?\d+)/i.exec(command);
              const speedX = xMatch
                ? parseInt(xMatch[1])
                : Math.floor(Math.random() * 30) - 15;
              const speedY = yMatch
                ? parseInt(yMatch[1])
                : Math.floor(Math.random() * 30) - 15;
              newBall.value?.setSpeed([speedX, speedY]);
              const triggerWords: string[] = [];
              if (xMatch) {
                triggerWords.push(xMatch[0]);
              }
              if (yMatch) {
                triggerWords.push(yMatch[0]);
              }
              return triggerWords;
            },
          ],
          ["add ball", addBall],
          [
            "bounce everything",
            () => {
              things.forEach(({ setSpeed }) => {
                const speedX = Math.floor(Math.random() * 30) - 15;
                const speedY = Math.floor(Math.random() * 30) - 15;
                setSpeed([speedX, speedY]);
              });
            },
          ],
          [
            "oops there goes gravity",
            () => {
              gravity.value = 0;
            },
          ],
          [
            "set gravity",
            (command) => {
              const newGravity = /gravity\s([\.\d]+)/i.exec(command);
              gravity.value = newGravity ? parseFloat(newGravity[1]) : 1;
              if (newGravity) {
                return [newGravity[0]];
              }
            },
          ],
        ]);
    */
    onMounted(() => {
      canvasContext = canvas.value.getContext("2d");
      canvasContext?.clearRect(...bounds);
      bounds[2] = canvas.value.parentElement.clientWidth;
      bounds[3] = canvas.value.parentElement.clientHeight;
      for (let i = 0; i < 100; i++) {
        things.push(makeBall(canvasContext!, bounds, gravity));
      }
      canvas.value.width = bounds[2];
      canvas.value.height = bounds[3];
      loop();
    });
    onUnmounted(() => {
      cancelAnimationFrame(requestId);
    });
    return { canvas, createBall, addBall, mouseMove };
  },
});
</script>

<style lang="scss" scoped>
.balls {
  height: 100%;
}
</style>