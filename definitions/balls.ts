export type Bounds = [left: number, top: number, right: number, bottom: number];
export type CoordinateData = [x: number, y: number];
export interface DrawableInterface {
  draw: () => void;
  drawPath: () => void;
  move: () => void;
  pulsate: () => void;
  mouseMove: (mousePosition: CoordinateData) => void;
  setSpeed: (speed: CoordinateData) => void;
}
