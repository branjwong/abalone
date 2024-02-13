import { Container } from 'pixi.js';
import { Circle } from './Circle';

export class Board extends Container {
    constructor() {
        super();
        this.addChild(new Circle());
    }
}