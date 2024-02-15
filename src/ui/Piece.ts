import {
  Container,
  FederatedPointerEvent,
  Graphics,
  Sprite,
  Texture,
} from "pixi.js";
import { Board } from "./Board";
import { Position } from "./Utility";

export class Piece extends Container {
  /** The interactive area of the piece */
  private readonly area: Sprite;
  /** The actual image of the piece */
  private readonly image: Graphics;

  public readonly coordinate: Position;

  private board: Board;

  constructor(color: string, coordinate: Position, board: Board) {
    super();
    this.board = board;

    this.image = new Graphics();
    this.image.beginFill(0xffffff);
    this.image.drawCircle(0, 0, 45);
    this.image.endFill();
    this.fillColor(color);
    this.addChild(this.image);

    this.area = Sprite.from(Texture.WHITE);
    this.area.anchor.set(0.5);
    this.area.scale.set(6);
    this.area.alpha = 0;
    this.addChild(this.area);
    this.area.eventMode = "static";

    this.area.on("pointerdown", this.onPointerDown);

    this.coordinate = coordinate;
  }

  private fillColor(color: string) {
    switch (color) {
      case "red":
        this.image.tint = 0xff0000;
        break;
      case "blue":
        this.image.tint = 0x0000ff;
        break;
      default:
        throw new Error("Invalid color");
    }
  }

  /** Interaction mouse/touch down handler */
  private onPointerDown = (e: FederatedPointerEvent) => {
    if (this.isLocked()) return;

    console.log("Piece touched", this.coordinate);
    this.board.selectSlot(this.coordinate);
  };

  /** Check if piece is locked */
  public isLocked() {
    return !this.interactiveChildren;
  }
}
