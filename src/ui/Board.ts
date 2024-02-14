import { Container } from 'pixi.js';
import { Slot } from './Slot';
import { Piece } from './Piece';
import { Position } from './Utility';

const INDENT_PER_INDEX: number = 50;
const SLOT_SIZE: number = 100;
const SPACING: number = 10;

const LONGEST_ROW_INDEX: number = 4;
const HEIGHT: number = 9;

export class Board extends Container {
    private slots: (Slot[])[] = [];

    private selectedSlot: Slot | null = null;

    constructor() {
        super();
        this.createSlots();
        this.createBoard();

        this.insertPiece({ row: 4, column: 4 }, new Piece('red', this));
    }

    /**
     * Creates the slots on the board. The slots are stored in a 2D array.
     */
    private createSlots() {
        for (let i = 0; i < HEIGHT; i++) {
            const row: Slot[] = [];
            for (let j = 0; j < -1 * Math.abs(i - LONGEST_ROW_INDEX) + HEIGHT; j++) {
                row.push(new Slot());
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
                const indent = Math.abs(rowIndex - LONGEST_ROW_INDEX) * INDENT_PER_INDEX;

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

    public selectSlot(position: Position) {
        if (this.selectedSlot) {
            this.selectedSlot.deselect();
            this.selectedSlot = null;
        } else {
            this.selectedSlot = this.slots[position.row][position.column];
            this.selectedSlot.select();
        }
    }
}
