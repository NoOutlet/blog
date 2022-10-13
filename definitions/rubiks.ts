export type Cubelet = {
  id: number;
  rotation: number[];
};
export type Cube = Cubelet[];

export type SpeechSide = [string, Side | Axis];

type Face = "f" | "r" | "l" | "u" | "d" | "b"; // front, right, left, up, down, back
type Middle = "e" | "m" | "s"; // equator, meridian, semi-meridian
export type Axis = "x" | "y" | "z";
export type Side = Face | Middle;
interface SideData {
  axis: Axis;
  clock: boolean;
  indices: number[];
}
export type SideMap = {
  [side in Side]: SideData;
};

type Rotation = [x: number, y: number, z: number];
interface Orientation {
  possibleRotations: string[];
  to: { x: [number, Rotation]; y: [number, Rotation]; z: [number, Rotation] };
}
export interface Orientations {
  [orientationName: string]: Orientation;
}
