import _uniq from 'lodash/uniq';

// https://www.redblobgames.com/grids/hexagons/

/** Pair of row & column representing grid coordinates */
export type Position = { row: number, col: number };

/** Board configuration */
export const HEXAGON_RANGE = 5;

export function getBoard(): Position[] {
    let outerRing: Position[] = [{ col: 8, row: 4 }];
    const board: Position[] = outerRing;

    // for (let i = 0; i < HEXAGON_RANGE; i++) {
    outerRing = getNeighborsForRange(outerRing);
    board.push(...outerRing)
    // }

    return board;
}

export function getStorageMap(): Map<Position, number> {
    const storageMap = new Map<Position, number>();
    let index = 0;
    for (let row = 0; row < HEXAGON_RANGE * 2; row++) {
        for (let col = 0; col < HEXAGON_RANGE * 2; col++) {
            const position = { row: row, col: col };
            if (isPositionValid(position)) {
                storageMap.set(position, index);
                index++;
            }
        }
    }
    return storageMap;
}

export function getOptions(selection: Position[]): Position[] {
    if (selection.length === 0) {
        return [];
    } else if (selection.length === 1) {
        const position = selection[0];

        return getNeighbors(position);
    } else {
        return [];
    }
}

// function toStorage(position: Position): StorageCoordinate {
//     const q = position.col;
//     const r = position.row;
//     return { r: r, q: q - Math.max(0, HEXAGON_RANGE - r) };
// }

function isPositionWithinBounds(position: Position): boolean {
    return getDistance({ col: 8, row: 4 }, position) < HEXAGON_RANGE;
}

function isPositionDoubledCoordinate(position: Position): boolean {
    const sum = position.col + position.row;
    return sum % 2 === 0;
}

function isPositionPositiveCoordinate(position: Position): boolean {
    return position.col >= 0 && position.row >= 0;
}

function isPositionValid(position: Position): boolean {
    return isPositionWithinBounds(position) && isPositionDoubledCoordinate(position) && isPositionPositiveCoordinate(position);
}

export function getNeighbors(position: Position): Position[] {
    return [
        { col: position.col - 1, row: position.row - 1 },
        { col: position.col + 1, row: position.row - 1 },
        { col: position.col - 2, row: position.row },
        { col: position.col + 2, row: position.row },
        { col: position.col - 1, row: position.row + 1 },
        { col: position.col + 1, row: position.row + 1 },
    ].filter((position) => isPositionValid(position));
}

function getNeighborsForRange(positions: Position[]): Position[] {
    const neighbors: Position[] = _uniq(positions.flatMap((position) => getNeighbors(position)));

    return neighbors.filter((position) => isPositionValid(position));
}

function getDistance(a: Position, b: Position): number {
    var dcol = Math.abs(a.col - b.col)
    var drow = Math.abs(a.row - b.row)
    return drow + Math.max(0, (dcol - drow) / 2)
}

// function isNeighbour(position: Position, target: Position): boolean {
//     return getDistance(position, target) === 1;
// }