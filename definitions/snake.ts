export type Direction = "North" | "East" | "South" | "West";
export type BoardLocation = [number, number];

export type SnakeSegment = {
  location: BoardLocation;
  to: Direction;
  from: Direction;
};
