import { Container } from "pixi.js";
import { Slot } from "./Slot";
import { Piece } from "./Piece";
import {
  Position,
  getBoard,
  getOptions,
  getStorageMap,
  toNotation,
} from "./Utility";

const Y_OFFSET: number = 100;
const X_OFFSET: number = 55;

export class Board extends Container {
  private slots: Slot[] = [];
  private storageMap: Map<string, number> | undefined;

  private slotSelections: Slot[] = [];
  private slotOptions: Slot[] = [];

  constructor() {
    super();
    this.createSlots();
    this.createBoard();
    this.storageMap = getStorageMap();

    this.createPiece("red", { col: 8, row: 4 });
  }

  /**
   * Creates the slots on the board. The slots are stored in a 2D array.
   */
  private createSlots() {
    const positions = getBoard();
    console.log(positions);
    positions.forEach((position) => {
      const slot = new Slot(position.col, position.row);
      this.slots.push(slot);
    });
  }

  /**
   * Creates the game board by positioning the slots on the stage. Slots are positioned in a hexogonal fashion.
   */
  private createBoard() {
    this.slots.forEach((slot) => {
      console.log(slot.col, slot.row);

      slot.x = slot.col * X_OFFSET;
      slot.y = slot.row * Y_OFFSET;
      this.addChild(slot);
    });
  }

  private getSlot(position: Position): Slot {
    if (!this.storageMap) {
      throw new Error("Storage map is not initialized");
    }

    const index = this.storageMap.get(toNotation(position))!;

    return this.slots[index];
  }

  private createPiece(color: string, position: Position) {
    const piece = new Piece(color, position, this);
    this.getSlot(position).insertPiece(piece);
  }

  public selectSlot(position: Position): void {
    if (this.slotSelections.length === 1) {
      // If a slot is already selected, deselect it and remove highlights.
      const positions = this.getSelectedPositions();
      getOptions(positions).forEach((position) =>
        this.removeHighlight(position)
      );

      this.slotSelections.forEach((slot) => slot.deselect());
      this.slotSelections = [];
    } else {
      // If no slot is selected, select the slot and highlight options.
      this.slotSelections = [this.getSlot(position)];

      this.getSlot(position).select();

      const positions = this.getSelectedPositions();
      getOptions(positions).forEach((position) => this.setHighlight(position));
    }
  }

  private setHighlight(position: Position): void {
    this.getSlot(position).setHighlight();
  }

  private removeHighlight(position: Position): void {
    this.getSlot(position).removeHighlight();
  }

  public getSelectedPositions(): Position[] {
    return this.slotSelections.map((slot) => ({
      col: slot.col,
      row: slot.row,
    }));
  }

  public getOptionPosititions(): Position[] {
    return this.slotOptions.map((slot) => ({ col: slot.col, row: slot.col }));
  }
}
