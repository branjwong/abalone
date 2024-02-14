import { BoardConfig } from "./Board";

/** Pair of row & column representing grid coordinates */
export type Position = { row: number; column: number };

export function findOptions(selectedPositions: Position[], boardConfig: BoardConfig): Position[] {
    if (selectedPositions.length === 0) {
        return [];
    } else if (selectedPositions.length === 1) {
        const selectedSlot = selectedPositions[0];
        const options = [];

        // // upper left
        // if (selectedSlot.row > 0 && selectedSlot.column > 0) {
        //     const colIndex = selectedSlot.row < boardConfig.longestRowIndex ? selectedSlot.column - 1 : selectedSlot.column;
        //     options.push({ row: selectedSlot.row - 1, column: colIndex });
        // }

        // // upper right
        // if (selectedSlot.row > 0 && selectedSlot.column < Math.abs(selectedSlot.row - boardConfig.longestRowIndex) + boardConfig.height) {
        //     const colIndex = selectedSlot.row < boardConfig.height / 2 ? selectedSlot.column : selectedSlot.column + 1;
        //     options.push({ row: selectedSlot.row - 1, column: colIndex });
        // }

        // // inline left
        // if (selectedSlot.column > 0) {
        //     options.push({ row: selectedSlot.row, column: selectedSlot.column - 1 });
        // }

        // inline right
        if (selectedSlot.column < Math.abs(selectedSlot.row - boardConfig.longestRowIndex) + boardConfig.height) {
            options.push({ row: selectedSlot.row, column: selectedSlot.column + 1 });
        }

        // lower left
        if (selectedSlot.row < boardConfig.height && selectedSlot.column > 0) {
            const colIndex = selectedSlot.row > boardConfig.longestRowIndex ? selectedSlot.column : selectedSlot.column + 1;
            options.push({ row: selectedSlot.row + 1, column: colIndex });
        }

        // lower right
        if (selectedSlot.row < boardConfig.height && Math.abs(selectedSlot.row - boardConfig.longestRowIndex) + boardConfig.height) {
            const colIndex = selectedSlot.row < boardConfig.longestRowIndex ? selectedSlot.column : selectedSlot.column + 1;
            options.push({ row: selectedSlot.row + 1, column: colIndex });
        }

        console.log(options)
        return options;
    } else {
        return [];
    }
}