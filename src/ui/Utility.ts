import _uniq from "lodash/uniq";

// https://www.redblobgames.com/grids/hexagons/

/** Pair of row & column representing grid coordinates */
export type Coordinate = { row: number; col: number };

/** Board configuration */
export const HEXAGON_RANGE = 5;

export function getBoard(): Coordinate[] {
  let outerRing: Coordinate[] = [{ col: 8, row: 4 }];
  let boardNotation: string[] = outerRing.map(toNotation);

  for (let i = 0; i < HEXAGON_RANGE; i++) {
    outerRing = getNeighborsForRange(outerRing);
    const outerRingNotation = outerRing.map(toNotation);
    boardNotation.push(...outerRingNotation);

    boardNotation = _uniq(boardNotation);
  }

  return boardNotation.map(fromNotation);
}

export function toNotation(coordinate: Coordinate): string {
  return `${coordinate.col},${coordinate.row}`;
}

export function fromNotation(notation: string): Coordinate {
  const [col, row] = notation.split(",");
  return { col: parseInt(col), row: parseInt(row) };
}

export function getStorageMap(): Map<string, number> {
  const board = getBoard();
  const storageMap = new Map<string, number>();

  board.forEach((coordinate, index) => {
    storageMap.set(toNotation(coordinate), index);
  });

  return storageMap;
}

export function getOptions(selection: Coordinate[]): Coordinate[] {
  if (selection.length === 0) {
    return [];
  } else if (selection.length === 1) {
    const coordinate = selection[0];

    return getNeighbors(coordinate);
  } else {
    return [];
  }
}

// function toStorage(position: Position): StorageCoordinate {
//     const q = position.col;
//     const r = position.row;
//     return { r: r, q: q - Math.max(0, HEXAGON_RANGE - r) };
// }

function isWithinBounds(coordinate: Coordinate): boolean {
  return getDistance({ col: 8, row: 4 }, coordinate) < HEXAGON_RANGE;
}

function isDoubledCoordinate(coordinate: Coordinate): boolean {
  const sum = coordinate.col + coordinate.row;
  return sum % 2 === 0;
}

function isPositiveCoordinate(coordinate: Coordinate): boolean {
  return coordinate.col >= 0 && coordinate.row >= 0;
}

function isCoordinateValid(coordinate: Coordinate): boolean {
  return (
    isWithinBounds(coordinate) &&
    isDoubledCoordinate(coordinate) &&
    isPositiveCoordinate(coordinate)
  );
}

export function getNeighbors(coordinate: Coordinate): Coordinate[] {
  const neighbors = [
    { col: coordinate.col - 1, row: coordinate.row - 1 },
    { col: coordinate.col + 1, row: coordinate.row - 1 },
    { col: coordinate.col - 2, row: coordinate.row },
    { col: coordinate.col + 2, row: coordinate.row },
    { col: coordinate.col - 1, row: coordinate.row + 1 },
    { col: coordinate.col + 1, row: coordinate.row + 1 },
  ].filter((coordinate) => isCoordinateValid(coordinate));

  //   console.log("position", position);
  //   console.log("neighbors", neighbors);

  return neighbors;
}

function getNeighborsForRange(coordinates: Coordinate[]): Coordinate[] {
  const neighbors: Coordinate[] = _uniq(
    coordinates.flatMap((coordinate) => getNeighbors(coordinate))
  );

  return neighbors.filter((coordinate) => isCoordinateValid(coordinate));
}

function getDistance(a: Coordinate, b: Coordinate): number {
  var dcol = Math.abs(a.col - b.col);
  var drow = Math.abs(a.row - b.row);
  return drow + Math.max(0, (dcol - drow) / 2);
}

// function isNeighbour(position: Position, target: Position): boolean {
//     return getDistance(position, target) === 1;
// }
