import { Container, Sprite } from 'pixi.js';

export class Circle extends Container {
    constructor() {
        super();
        const circle = Sprite.from('black-circle.png');
        this.addChild(circle);
        circle.anchor.set(0.5);
        circle.scale.set(0.1);
    }
}