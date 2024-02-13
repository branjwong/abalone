import { Container, Sprite } from 'pixi.js';
import { Piece } from './Piece';

export class Slot extends Container {
    private piece: Piece | null = null;

    constructor() {
        super();
        const circle = Sprite.from('black-circle.png');
        this.addChild(circle);
        circle.anchor.set(0.5);
        circle.scale.set(0.1);
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
}
