import type { Grid } from "@/definitions/merge";
import { ref } from "vue";

const initialGrid: Grid = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

const grid = ref<Grid>(JSON.parse(JSON.stringify(initialGrid)));
// const { get, set } = useStorage();

// const grid = ref<Grid>(get("merge", JSON.stringify(initialGrid)));
// watch(grid, (value) => set("merge", value), { deep: true });

const selectedBlock = ref<[number, number] | null>(null);

const addNumber = () => {
  const nullIndices: number[][] = [];
  grid.value.forEach((row, i) => {
    row.forEach((block, j) => {
      if (block === null) {
        nullIndices.push([i, j]);
      }
    });
  });
  if (!nullIndices.length) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * nullIndices.length);
  const [i, j] = nullIndices[randomIndex];

  grid.value[i][j] = 1;
};

const clearNumber = (i: number, j: number) => {
  grid.value[i][j] = null;
};

const matchesSelected = (i: number, j: number) =>
  selectedBlock.value &&
  grid.value[i][j] ===
    grid.value[selectedBlock.value[0]][selectedBlock.value[1]];

const selectBlock = (i: number, j: number) => {
  if (!grid.value[i][j]) {
    return; // if user clicked null block
  } else if (selectedBlock.value === null) {
    selectedBlock.value = [i, j];
  } else if (isSelected(i, j)) {
    selectedBlock.value = null;
  } else if (matchesSelected(i, j)) {
    grid.value[i][j]! *= 2;
    clearNumber(selectedBlock.value[0], selectedBlock.value[1]);
    selectedBlock.value = [i, j];
  }
};

const isSelected = (i: number, j: number) =>
  selectedBlock.value &&
  i === selectedBlock.value[0] &&
  j === selectedBlock.value[1];

const reset = () => {
  grid.value = JSON.parse(JSON.stringify(initialGrid));
  selectedBlock.value = null;
};

export const useMerge = () => {
  return {
    grid,
    addNumber,
    clearNumber,
    selectBlock,
    selectedBlock,
    isSelected,
    reset,
  };
};
