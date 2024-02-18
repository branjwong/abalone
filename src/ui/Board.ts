import { Container } from "pixi.js";
import { Slot } from "./Slot";
import { Piece } from "./Piece";
import {
  Coordinate,
  getBoard,
  getOptions,
  getStorageMap,
  toNotation,
} from "./Utility";

const Y_OFFSET: number = 40;
const X_OFFSET: number = 18;

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
    const coordinates = getBoard();
    console.log(coordinates);
    coordinates.forEach((coordinate) => {
      const slot = new Slot(coordinate);
      this.slots.push(slot);
    });
  }

  /**
   * Creates the game board by positioning the slots on the stage. Slots are positioned in a hexogonal fashion.
   */
  private createBoard() {
    this.slots.forEach((slot) => {
      slot.x = slot.coordinate.col * X_OFFSET;
      slot.y = slot.coordinate.row * Y_OFFSET;
      this.addChild(slot);
    });
  }

  private getSlot(coordinate: Coordinate): Slot {
    if (!this.storageMap) {
      throw new Error("Storage map is not initialized");
    }

    const index = this.storageMap.get(toNotation(coordinate))!;

    return this.slots[index];
  }

  private createPiece(color: string, coordinate: Coordinate) {
    const piece = new Piece(color, coordinate, this);
    this.getSlot(coordinate).insertPiece(piece);
  }

  public selectSlot(coordinate: Coordinate): void {
    if (this.slotSelections.length === 1) {
      // If a slot is already selected, deselect it and remove highlights.
      const coordinates = this.getSelectedCoordinates();
      getOptions(coordinates).forEach((coordinate) =>
        this.removeHighlight(coordinate)
      );

      this.slotSelections.forEach((slot) => slot.deselect());
      this.slotSelections = [];
    } else {
      // If no slot is selected, select the slot and highlight options.
      this.slotSelections = [this.getSlot(coordinate)];

      this.getSlot(coordinate).select();

      const coordinates = this.getSelectedCoordinates();
      getOptions(coordinates).forEach((coordinate) =>
        this.setHighlight(coordinate)
      );
    }
  }

  private setHighlight(coordinate: Coordinate): void {
    this.getSlot(coordinate).setHighlight();
  }

  private removeHighlight(coordinate: Coordinate): void {
    this.getSlot(coordinate).removeHighlight();
  }

  public getSelectedCoordinates(): Coordinate[] {
    return this.slotSelections.map((slot) => slot.coordinate);
  }

  public getOptionPosititions(): Coordinate[] {
    return this.slotOptions.map((slot) => slot.coordinate);
  }
}
