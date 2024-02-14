import { Container, FederatedPointerEvent, Graphics, Sprite, Texture } from 'pixi.js';
import { Board } from './Board';

export class Piece extends Container {
    /** The interactive area of the piece */
    private readonly area: Sprite;
    /** The actual image of the piece */
    private readonly image: Graphics;

    /** The row index of the piece */
    public row = 0;
    /** The column index of the piece */
    public column = 0;

    private board: Board;

    constructor(color: string, board: Board) {
        super();
        this.board = board;

        this.area = Sprite.from(Texture.WHITE);
        this.area.anchor.set(0.5);
        this.area.alpha = 0;
        this.addChild(this.area);
        this.area.eventMode = 'static';

        this.image = new Graphics();
        this.image.beginFill(0xffffff);
        this.image.drawCircle(0, 0, 45);
        this.image.endFill();
        this.fillColor(color);
        this.addChild(this.image);

        this.area.on('pointerdown', this.onPointerDown);
    }

    private fillColor(color: string) {
        switch (color) {
            case 'red':
                this.image.tint = 0xff0000;
                break;
            case 'blue':
                this.image.tint = 0x0000ff;
                break;
            default:
                throw new Error('Invalid color');
        }
    }


    /** Interaction mouse/touch down handler */
    private onPointerDown = (e: FederatedPointerEvent) => {
        this.board.selectPiece(this);
        console.log('Piece selected')
    };



    /** CHeck if piece is locked */
    public isLocked() {
        return !this.interactiveChildren;
    }
}
