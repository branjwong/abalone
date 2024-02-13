import { Graphics } from 'pixi.js';

export class Piece extends Graphics {
    constructor(color: string) {
        super();
        this.beginFill(0xffffff);
        this.drawCircle(0, 0, 45);
        this.endFill();
        this.fillColor(color);
    }

    private fillColor(color: string) {
        switch (color) {
            case 'red':
                this.tint = 0xff0000;
                break;
            case 'blue':
                this.tint = 0x0000ff;
                break;
            default:
                throw new Error('Invalid color');
        }
    }
}
