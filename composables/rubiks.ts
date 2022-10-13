import { computed } from "vue";
import orientations from "@/assets/data/orientations";
import useStorage from "./storage";
import type { Axis, Cube, Cubelet, Side, SideMap } from "@/definitions/rubiks";

/*
[
  left-top-far, left-top-middle, left-top-near,
  left-half-far, left-half-middle, left-half-near,
  left-bottom-far, left-bottom-middle, left-bottom-near,
  center-top-far, center-top-middle, center-top-near,
  center-half-far, center-half-middle, center-half-near,
  center-bottom-far, center-bottom-middle, center-bottom-near,
  right-top-far, right-top-middle, right-top-near,
  right-half-far, right-half-middle, right-half-near,
  right-bottom-far, right-bottom-middle, right-bottom-near,
]
*/
const sideMap: SideMap = {
  f: { axis: "z", clock: false, indices: [2, 5, 8, 11, 14, 17, 20, 23, 26] },
  r: { axis: "x", clock: false, indices: [18, 19, 20, 21, 22, 23, 24, 25, 26] },
  l: { axis: "x", clock: true, indices: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  u: { axis: "y", clock: false, indices: [0, 1, 2, 9, 10, 11, 18, 19, 20] },
  d: { axis: "y", clock: true, indices: [6, 7, 8, 15, 16, 17, 24, 25, 26] },
  b: { axis: "z", clock: true, indices: [0, 3, 6, 9, 12, 15, 18, 21, 24] },
  e: { axis: "y", clock: false, indices: [3, 4, 5, 12, 13, 14, 21, 22, 23] },
  m: { axis: "x", clock: true, indices: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
  s: { axis: "z", clock: false, indices: [1, 4, 7, 10, 13, 16, 19, 22, 25] },
};

const middleCubelets = [4, 10, 12, 13, 14, 16, 22];

const initialCube: Cube = [];
export const positions: number[][] = [];

for (let id = 0; id < 27; id++) {
  const x = Math.floor(id / 9) - 1;
  const y = (Math.floor(id / 3) % 3) - 1;
  const z = (id % 3) - 1;
  positions.push([x, y, z]);
  initialCube.push({ id, rotation: [0, 0, 0] });
}

const cube = useStorage("cube", initialCube);

const getRotationString = (rotation: number[]): string =>
  rotation.map((ro) => (((ro % 360) + 360) % 360).toString()).join(", ");

const getOrientation = (cubelet: Cubelet) => {
  const rotationString = getRotationString(cubelet.rotation);
  return Object.values(orientations).find((o: any) =>
    o.possibleRotations.includes(rotationString)
  );
};

const getStartRotation = (orientation: any, axis: Axis) => {
  const startIndex = orientation!.to[axis][0];
  return orientation!.possibleRotations[startIndex]
    .split(", ")
    .map((num: string) => parseInt(num));
};

const getRotation = (orientation: any, axis: Axis, clockModifier: number) => {
  const startRotation = getStartRotation(orientation, axis);
  return [
    startRotation[0] + orientation!.to[axis][1][0] * clockModifier,
    startRotation[1] + orientation!.to[axis][1][1] * clockModifier,
    startRotation[2] + orientation!.to[axis][1][2] * clockModifier,
  ];
};

const cwMap = [6, 3, 0, 7, 4, 1, 8, 5, 2]; // What happens to cube face when rotated clockwise
const ccwMap = cwMap.slice().reverse(); // ... and counter-clockwise

const turn = (side: Side, clockwise: boolean = true) => {
  const { axis, clock, indices } = sideMap[side];
  const clockModifier = clockwise === clock ? 1 : -1;
  const blocks = indices.map((index) => cube.value[index]);
  blocks.forEach((block) => {
    const orientation = getOrientation(block);
    block.rotation = getRotation(orientation, axis, clockModifier);
  });
  const blockMap = clockwise === clock ? cwMap : ccwMap;
  indices.forEach((i, index) => {
    cube.value[i] = blocks[blockMap[index]];
  });
};

const spin = (axis: Axis, clockwise: boolean = true) => {
  if (axis === "x") {
    turn("r", clockwise);
    turn("m", !clockwise);
    turn("l", !clockwise);
  } else if (axis === "y") {
    turn("u", clockwise);
    turn("e", clockwise);
    turn("d", !clockwise);
  } else if (axis === "z") {
    turn("f", clockwise);
    turn("s", clockwise);
    turn("b", !clockwise);
  }
};

const reset = () => {
  cube.value = JSON.parse(JSON.stringify(initialCube));
};

const isSolved = computed(() => {
  return cube.value.every((cubelet) => {
    return (
      middleCubelets.includes(cubelet.id) ||
      cubelet.rotation.every((r) => ((r % 360) + 360) % 360 === 0) ||
      cubelet.rotation.every((r) => ((r % 360) + 360) % 360 === 180)
    );
  });
});

export const useCube = () => {
  return { cube, turn, spin, reset, isSolved };
};
