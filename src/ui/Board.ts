import { Container } from 'pixi.js';
import { Slot } from './Slot';
import { Piece } from './Piece';
import { Position, findOptions } from './Utility';

const INDENT_PER_INDEX: number = 50;
const SLOT_SIZE: number = 100;
const SPACING: number = 10;

const boardConfig = {
    longestRowIndex: 4,
    height: 9,
};

export type BoardConfig = typeof boardConfig;

export class Board extends Container {
    private slots: (Slot[])[] = [];

    private slotSelections: Slot[] = [];
    private slotOptions: Slot[] = [];

    constructor() {
        super();
        this.createSlots();
        this.createBoard();

        this.insertPiece({ row: 4, column: 4 }, new Piece('red', this));
        this.insertPiece({ row: 0, column: 0 }, new Piece('red', this));
        this.insertPiece({ row: 0, column: 4 }, new Piece('red', this));
        this.insertPiece({ row: 4, column: 0 }, new Piece('red', this));
        this.insertPiece({ row: 4, column: 8 }, new Piece('red', this));
        this.insertPiece({ row: 8, column: 0 }, new Piece('red', this));
        this.insertPiece({ row: 8, column: 4 }, new Piece('red', this));
    }

    /**
     * Creates the slots on the board. The slots are stored in a 2D array.
     */
    private createSlots() {
        for (let i = 0; i < boardConfig.height; i++) {
            const row: Slot[] = [];
            for (let j = 0; j < -1 * Math.abs(i - boardConfig.longestRowIndex) + boardConfig.height; j++) {
                row.push(new Slot(i, j));
            }
            this.slots.push(row);
        }
    }

    /**
     * Creates the game board by positioning the slots on the stage. Slots are positioned in a hexogonal fashion.
     */
    private createBoard() {
        this.slots.forEach((row, rowIndex) => {
            row.forEach((slot, slotIndex) => {
                const indent = Math.abs(rowIndex - boardConfig.longestRowIndex) * INDENT_PER_INDEX;

                slot.x = indent + slotIndex * (SLOT_SIZE + SPACING);
                slot.y = rowIndex * (SLOT_SIZE + SPACING);
                this.addChild(slot);
            });
        });
    }

    private insertPiece(position: Position, piece: Piece) {
        this.slots[position.row][position.column].insertPiece(piece);
        piece.row = position.row;
        piece.column = position.column;
    }

    public selectSlot(position: Position): void {
        if (this.slotSelections.length === 1) {
            const positions = this.getSelectedPositions();
            findOptions(positions, boardConfig).forEach((position) => this.removeHighlight(position));

            this.slotSelections.forEach((slot) => slot.deselect());
            this.slotSelections = [];
        } else {
            this.slotSelections = [this.slots[position.row][position.column]];
            this.slotSelections.forEach((slot) => slot.select());

            const positions = this.getSelectedPositions();
            findOptions(positions, boardConfig).forEach((position) => this.setHighlight(position));
        }
    }

    private setHighlight(position: Position): void {
        this.slots[position.row][position.column].setHighlight();
    }

    private removeHighlight(position: Position): void {
        this.slots[position.row][position.column].removeHighlight();
    }

    public getSelectedPositions(): Position[] {
        return this.slotSelections.map((slot) => ({ row: slot.row, column: slot.column }));
    }

    public getOptionPosititions(): Position[] {
        return this.slotOptions.map((slot) => ({ row: slot.row, column: slot.column }));
    }
}
