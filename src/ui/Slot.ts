import { Container, Graphics, Sprite } from 'pixi.js';
import { Piece } from './Piece';

export class Slot extends Container {
    /** The actual image of the piece */
    private readonly image: Sprite;
    /** The actual image of the piece */
    private readonly selectEffect: Graphics;
    /** The actual image of the piece */
    private readonly optionEffect: Graphics;

    private selected: boolean = false;
    private piece: Piece | null = null;

    constructor() {
        super();

        this.image = Sprite.from('black-circle.png');
        this.image.anchor.set(0.5);
        this.image.scale.set(0.1);
        this.addChild(this.image);

        this.selectEffect = new Graphics();
        this.selectEffect.beginFill(0xfcba03);
        this.selectEffect.drawCircle(0, 0, 50);
        this.selectEffect.endFill();
        this.addChild(this.selectEffect);
        this.selectEffect.visible = false;

        this.optionEffect = new Graphics();
        this.optionEffect.beginFill(0xffffff);
        this.optionEffect.drawCircle(0, 0, 50);
        this.optionEffect.endFill();
        this.addChild(this.optionEffect);
        this.optionEffect.visible = false;
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
        console.log("Slot selected")
        this.selected = true;
        this.selectEffect.visible = true;
    }

    public deselect() {
        console.log("Slot deselected")
        this.selected = true;
        this.image.tint = 0x00ffff;
        this.selectEffect.visible = false;
    }
}
