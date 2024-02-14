import { Container, Graphics, Sprite } from 'pixi.js';
import { Piece } from './Piece';

const EFFECT_SIZE = 49;
const SELECT_COLOR = 0xfcba03;
const OPTION_COLOR = 0xb5b2aa;

export class Slot extends Container {
    /** The actual image of the piece */
    private readonly image: Sprite;
    /** The actual image of the piece */
    private readonly selectEffect: Graphics;
    /** The actual image of the piece */
    private readonly optionEffect: Graphics;

    /** The row index of the piece */
    public col: number = 0;
    /** The column index of the piece */
    public row: number = 0;

    private piece: Piece | null = null;

    constructor(row: number, column: number) {
        super();

        this.image = Sprite.from('black-circle.png');
        this.image.anchor.set(0.5);
        this.image.scale.set(0.1);
        this.addChild(this.image);

        this.selectEffect = new Graphics();
        this.selectEffect.beginFill(SELECT_COLOR);
        this.selectEffect.drawCircle(0, 0, EFFECT_SIZE);
        this.selectEffect.endFill();
        this.addChild(this.selectEffect);
        this.selectEffect.visible = false;

        this.optionEffect = new Graphics();
        this.optionEffect.beginFill(OPTION_COLOR);
        this.optionEffect.drawCircle(0, 0, EFFECT_SIZE);
        this.optionEffect.endFill();
        this.addChild(this.optionEffect);
        this.optionEffect.visible = false;

        this.col = row;
        this.row = column;
    }

    public insertPiece(piece: Piece) {
        this.removePiece();
        this.piece = piece;
        this.addChild(piece);
    }

    public removePiece() {
        if (this.piece) {
            this.removeChild(this.piece);
        }
        this.piece = null;
    }

    public movePieceTo(slot: Slot) {
        if (this.piece) {
            slot.insertPiece(this.piece);
            this.removePiece();
        }
    }

    public select() {
        console.log("Slot selected", this.col, this.row)
        this.selectEffect.visible = true;
    }

    public deselect() {
        console.log("Slot deselected", this.col, this.row)
        this.selectEffect.visible = false;
    }

    public setHighlight() {
        console.log("Slot highlighted", this.col, this.row)
        this.optionEffect.visible = true;
    }

    public removeHighlight() {
        console.log("Slot dehighlighted", this.col, this.row)
        this.optionEffect.visible = false;
    }
}
