import * as PIXI from 'pixi.js';

import { Board } from './ui/Board';

// Create a PixiJS application of type canvas with specify background color and make it resize to the iframe window
const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

// Adding the application's view to the DOM
document.querySelector<HTMLDivElement>('#app')!.appendChild(app.view)

const board = new Board()

// move the sprite to the center of the screen
board.x = app.screen.width / 2;
board.y = app.screen.height / 2;

// add board
app.stage.addChild(board);
