import type {
  Bounds,
  CoordinateData,
  DrawableInterface,
} from "@/definitions/balls";
import { ref, type Ref } from "vue";

export const makeBall = (
  ctx: CanvasRenderingContext2D,
  bounds: Bounds,
  gravity: Ref<number>,
  position?: CoordinateData
): DrawableInterface => {
  const radius = ref(10 + Math.random() * 20);

  const x = ref(position ? position[0] : Math.random() * bounds[2] + bounds[0]);
  const y = ref(
    position
      ? position[1] + radius.value / 2
      : Math.random() * bounds[3] + bounds[1]
  );
  const increasing = ref(true);

  const speedX = ref(-5 + Math.random() * 10);
  const speedY = ref(-5 + Math.random() * 10);

  const color = `rgb(${Math.random() * 250}, ${Math.random() * 250}, ${
    Math.random() * 250
  })`;

  const calculateMove = (
    position: CoordinateData,
    speed: CoordinateData
  ): [nextPosition: CoordinateData, nextSpeed: CoordinateData] => {
    const nextPosition = position.slice() as CoordinateData;
    const nextSpeed = speed.slice() as CoordinateData;
    for (let i = 0; i < 2; i++) {
      nextPosition[i] += speed[i];
      if (nextPosition[i] > bounds[i + 2] || nextPosition[i] < bounds[i]) {
        nextPosition[i] = Math.max(
          Math.min(nextPosition[i], bounds[i + 2]),
          bounds[i]
        );
        nextSpeed[i] *= -1 * (0.7 + (0.2 * radius.value) / 30);
      }
    }
    nextSpeed[1] += gravity.value;
    return [nextPosition, nextSpeed];
  };

  const move = () => {
    const [newPosition, newSpeed] = calculateMove(
      [x.value, y.value],
      [speedX.value, speedY.value]
    );
    x.value = newPosition[0];
    y.value = newPosition[1];
    speedX.value = newSpeed[0];
    speedY.value = newSpeed[1];
  };

  const draw = () => {
    ctx.beginPath();
    ctx.arc(x.value, y.value - radius.value, radius.value, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
  };

  const drawPath = () => {
    let position: CoordinateData = [x.value, y.value];
    let speed: CoordinateData = [speedX.value, speedY.value];
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 2; i++) {
        [position, speed] = calculateMove(position, speed);
      }
      ctx.moveTo(position[0], position[1] - radius.value);
      for (let i = 0; i < 2; i++) {
        [position, speed] = calculateMove(position, speed);
      }
      ctx.lineTo(position[0], position[1] - radius.value);
      ctx.stroke();
    }
  };

  const pulsate = () => {
    y.value -= radius.value;
    radius.value += increasing.value ? 0.1 : -0.1;
    increasing.value =
      increasing.value === radius.value < 30 || radius.value <= 10;
    y.value += radius.value;
  };

  const mouseMove = (mousePosition: CoordinateData) => {
    setSpeed([
      Math.max(-15, Math.min(15, (mousePosition[0] - x.value) / 100)),
      Math.max(-50, Math.min(20, (mousePosition[1] - y.value) / 20)),
    ]);
  };

  const setSpeed = (speed: CoordinateData) => {
    speedX.value = speed[0];
    speedY.value = speed[1];
  };

  return { draw, drawPath, move, pulsate, mouseMove, setSpeed };
};
