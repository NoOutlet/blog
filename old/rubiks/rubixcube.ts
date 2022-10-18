import { computed, ref } from "vue";

const SHUFFLE_SPIN_COUNT = 100;
const cwMap = [6, 3, 0, 7, 4, 1, 8, 5, 2];
const ccwMap = cwMap.slice().reverse();
const neighbors = [
  [2, 4, 5, 1],
  [5, 3, 2, 0],
  [0, 1, 3, 4],
  [4, 2, 1, 5],
  [3, 5, 0, 2],
  [1, 0, 4, 3],
];
const neighborAlgorithm = [
  [2, 1, 0],
  [6, 7, 8],
  [8, 5, 2],
  [0, 3, 6],
];
const solved: Array<number>[] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 5],
];
const spinFace = (cube: Array<number>[], face: number, clockwise: boolean) => {
  const clonedCube = JSON.parse(JSON.stringify(cube));
  let nextIndex: number;
  clonedCube[face] = clockwise
    ? cwMap.map((index) => cube[face][index])
    : ccwMap.map((index) => cube[face][index]);
  neighbors[face].forEach((neighbor, index) => {
    nextIndex = clockwise ? (3 + index) % 4 : (1 + index) % 4;
    neighborAlgorithm[index].forEach((faceIndex, iindex) => {
      clonedCube[neighbor][faceIndex] =
        cube[neighbors[face][nextIndex]][neighborAlgorithm[nextIndex][iindex]];
    });
  });
  return clonedCube;
};

type Face = {
  id: number;
  points: Array<number>[];
};

const count = ref(0);
const reversed = ref(false);
const cube = ref(solved);
const isSolved = ref(false);
const faces = ref<Face[]>([
  {
    id: 0,
    points: [
      [100, 100],
      [187, 50],
      [187, 150],
      [100, 200],
    ],
  },
  {
    id: 1,
    points: [
      [100, 200],
      [13, 150],
      [13, 50],
      [100, 100],
    ],
  },
  {
    id: 2,
    points: [
      [187, 50],
      [100, 100],
      [13, 50],
      [100, 0],
    ],
  },
  {
    id: 3,
    points: [
      [100, 100],
      [100, 0],
      [187, 50],
      [187, 150],
    ],
  },
  {
    id: 4,
    points: [
      [100, 0],
      [100, 100],
      [13, 150],
      [13, 50],
    ],
  },
  {
    id: 5,
    points: [
      [187, 150],
      [100, 200],
      [13, 150],
      [100, 100],
    ],
  },
]);

const startOver = () => {
  let temp = solved;
  for (let i = 0; i < SHUFFLE_SPIN_COUNT; i++) {
    temp = spinFace(temp, Math.floor(6 * Math.random()), true);
  }
  cube.value = temp;
  count.value = 0;
  reversed.value = false;
  isSolved.value = false;
};

const spin = (code: number) => {
  cube.value = spinFace(cube.value, code % 6, code < 6);
  count.value++;
  if (JSON.stringify(cube.value) === JSON.stringify(solved)) {
    isSolved.value = true;
  }
};

const flip = () => {
  reversed.value = !reversed.value;
};

const shownFaces = computed(() => {
  const reverseAdd = reversed.value ? 3 : 0;
  return faces.value
    .slice(0 + reverseAdd, 3 + reverseAdd)
    .map((face) => ({ ...face, squares: cube.value[face.id] }));
});

export const useCube = () => ({
  shownFaces,
  flip,
  spin,
  startOver,
  count,
  reversed,
  cube,
  isSolved,
  faces,
});
