import { Container } from 'pixi.js';
import { Slot } from './Slot';

const INDENT_PER_INDEX = 50;
const SLOT_SIZE = 100;
const SPACING = 10;

export class Board extends Container {
    private slots = [
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
        [new Slot(), new Slot(), new Slot(), new Slot(), new Slot(), new Slot()],
    ];

    constructor() {
        super();
        this.createBoard();
    }

    private createBoard() {
        this.slots.forEach((row, rowIndex) => {
            row.forEach((slot, slotIndex) => {
                const indent = Math.abs(rowIndex - 4) * INDENT_PER_INDEX;

                slot.x = indent + slotIndex * (SLOT_SIZE + SPACING);
                slot.y = rowIndex * (SLOT_SIZE + SPACING);
                this.addChild(slot);
            });
        });
    }
}
