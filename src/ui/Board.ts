import { Container } from 'pixi.js';
import { Slot } from './Slot';

const INDENT_PER_INDEX = 50;
const SLOT_SIZE = 100;
const SPACING = 10;

const LONGEST_ROW_INDEX = 4;
const HEIGHT = 9;

export class Board extends Container {
    private slots: (Slot[])[] = [];

    constructor() {
        super();
        this.createSlots();
        this.createBoard();
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
}
