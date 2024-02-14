import { Container, Sprite } from 'pixi.js';
import { Piece } from './Piece';

export class Slot extends Container {
    /** The actual image of the piece */
    private readonly image: Sprite;

    private selected: boolean = false;
    private piece: Piece | null = null;

    constructor() {
        super();

        this.image = Sprite.from('black-circle.png');
        this.image.anchor.set(0.5);
        this.image.scale.set(0.1);
        this.addChild(this.image);
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
        this.selected = true;
        this.image.tint = 0x00ff00;
    }

    public deselect() {
        this.selected = true;
    }
}
