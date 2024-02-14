import { findOptions, Position } from './Utility';

const boardConfig = {
    longestRowIndex: 4,
    height: 9,
};

describe('findOptions', () => {
    it('should return an empty array when selectedPositions is empty', () => {
        const selectedPositions: Position[] = [];
        const options = findOptions(selectedPositions, boardConfig);
        expect(options).toEqual([]);
    });

    it('should return an empty array when selectedPositions has only one element', () => {
        const selectedPositions: Position[] = [{ row: 0, column: 0 }];
        const options = findOptions(selectedPositions, boardConfig);
        expect(options).toEqual([
            { row: 0, column: 1 },
            { row: 1, column: 0 },
            { row: 1, column: 1 }
        ]);
    });

    // it('should return the correct options when selectedPositions has multiple elements', () => {
    //     const selectedPositions: Position[] = [
    //         { row: 0, column: 0 },
    //         { row: 1, column: 1 },
    //         { row: 2, column: 2 },
    //     ];
    //     const options = findOptions(selectedPositions, boardConfig);
    //     // Add your assertions here to check the expected options
    // });
});
