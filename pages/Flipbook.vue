<template>
  <div>
    <div class="canvasContainer">
      <canvas
        ref="canvas"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mousemove="draw"
        @mouseout="stopDrawing"
      ></canvas>
    </div>
    <button @click="clearCanvas">Clear</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import useStorage from '../composables/storage';

type Bounds = [left: number, top: number, right: number, bottom: number];
type Point = { x: number; y: number; };
type Line = Point[];
type Page = {
  drawing: Line[];
  duration: number;
}
type Book = {
  name: string;
  pages: Page[];
}

const makeLine = (
  context: CanvasRenderingContext2D,
  line: Line,
) => {
  context.beginPath();
  line.forEach((point, i) => {
    const { x, y } = point
    if (!i) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.fillStyle = "rgb(0, 0, 0)";
  context.stroke();
  context.closePath();
};

export default defineComponent({
  setup() {
    const books = useStorage<Book[]>("flipbook", []);
    const lines = ref<Line[]>([])
    const drawing = ref(false)
    const canvas = ref();
    let context: CanvasRenderingContext2D | undefined;
    const bounds: Bounds = [0, 0, 0, 0];
    const previousPoint = ref<Point | null>(null)

    onMounted(() => {
      context = canvas.value.getContext("2d");
      context?.clearRect(...bounds);
      bounds[2] = canvas.value.parentElement.clientWidth;
      bounds[3] = canvas.value.parentElement.clientHeight;
      canvas.value.width = bounds[2];
      canvas.value.height = bounds[3];
      watch(lines, () => {
        lines.value.forEach(line => makeLine(context!, line))
      }, { deep: true, immediate: true })
    });
    const draw = (event: MouseEvent) => {
      if (drawing.value) {
        const newPoint = { x: event.offsetX, y: event.offsetY }
        previousPoint.value = newPoint;
        lines.value[lines.value.length - 1].push(newPoint)
      }
    };
    const startDrawing = (event: MouseEvent) => {
      drawing.value = true;
      previousPoint.value = { x: event.offsetX, y: event.offsetY };
      lines.value.push([previousPoint.value])
    };
    const stopDrawing = (event: MouseEvent) => {
      if (drawing.value) {
        drawing.value = false;
        previousPoint.value = null
      }
    };
    const clearCanvas = () => {
      context?.clearRect(...bounds);
      lines.value = []
    }

    return { canvas, draw, startDrawing, stopDrawing, clearCanvas };
  },
})
</script>

<style lang="scss" scoped>
.canvasContainer {
  height: 500px;
  width: 500px;
  display: inline-block;
  border: 1px solid;
}
</style>