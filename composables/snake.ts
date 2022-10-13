import type {
  BoardLocation,
  Direction,
  SnakeSegment,
} from "@/definitions/snake";
import { ref } from "vue";

const directions: Direction[] = ["North", "South", "East", "West"];
const getOppositeDirection = (current: Direction) => {
  const index = directions.indexOf(current);
  return directions[index + (1 - 2 * (index % 2))];
};
const BOARD_SIZE = 20;
const getRandomWithLimits = (min: number, max: number) =>
  Math.round(Math.floor(Math.random() * (max - min)) + min);
const locationMatch = (a: BoardLocation, b: BoardLocation) =>
  a[0] === b[0] && a[1] === b[1];

export const useSnake = () => {
  const isRunning = ref(false);
  const apples = ref<BoardLocation[]>([]);
  const snake = ref<SnakeSegment[]>([]);
  const pauseRef = ref<any>();

  const gameLoop = () => {
    const head = snake.value[0];

    const newY = ["West", "East"].includes(head.to)
      ? head.location[0]
      : head.location[0] + (head.to === "South" ? 1 : -1);
    const newX = ["West", "East"].includes(head.to)
      ? head.location[1] + (head.to === "East" ? 1 : -1)
      : head.location[1];
    if (
      newY < 1 ||
      newX < 1 ||
      newY > BOARD_SIZE ||
      newX > BOARD_SIZE ||
      snake.value.some(({ location }) => locationMatch(location, [newY, newX]))
    ) {
      isRunning.value = false;
      pauseRef.value = undefined;
      return;
    }
    snake.value.unshift({
      from: getOppositeDirection(head.to),
      to: head.to,
      location: [newY, newX],
    });

    const appleIndex = apples.value.findIndex((apple) =>
      locationMatch(apple, [newY, newX])
    );
    if (appleIndex > -1) {
      apples.value.splice(appleIndex, 1);
    } else {
      snake.value.pop();
    }
    if (Math.random() * apples.value.length < snake.value.length / 5) {
      const newApple: BoardLocation = [
        getRandomWithLimits(1, BOARD_SIZE + 1),
        getRandomWithLimits(1, BOARD_SIZE + 1),
      ];
      if (
        !snake.value.some(({ location }) =>
          locationMatch(location, newApple)
        ) &&
        !apples.value.some((apple) => locationMatch(apple, newApple))
      ) {
        apples.value.push(newApple);
      }
    }

    pauseRef.value = setTimeout(
      gameLoop,
      Math.max(100, 500 - snake.value.length * 10)
    );
  };

  const startGame = () => {
    isRunning.value = true;
    const startLocation: BoardLocation = [
      getRandomWithLimits(BOARD_SIZE / 4, (BOARD_SIZE * 3) / 4),
      getRandomWithLimits(BOARD_SIZE / 4, (BOARD_SIZE * 3) / 4),
    ];

    snake.value = [
      {
        from: "West",
        to: "East",
        location: startLocation,
      },
    ];

    apples.value = [
      [
        getRandomWithLimits(1, BOARD_SIZE + 1),
        getRandomWithLimits(1, BOARD_SIZE + 1),
      ],
    ];

    setTimeout(gameLoop, 500);
  };

  const move = (direction: Direction) => {
    if (isRunning.value) {
      snake.value[0].to = direction;
    }
  };

  const pause = () => {
    clearTimeout(pauseRef.value);
    if (!isRunning.value) {
      gameLoop();
    }
    isRunning.value = !isRunning.value;
  };

  return {
    isRunning,
    boardSize: BOARD_SIZE,
    apples,
    snake,
    startGame,
    move,
    pause,
  };
};
