import * as PIXI from 'pixi.js';

// Create a PixiJS application of type canvas with specify background color and make it resize to the iframe window
const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

// Adding the application's view to the DOM
document.querySelector<HTMLDivElement>('#app')!.appendChild(app.view)

// create a new Sprite from an image path
const circle = PIXI.Sprite.from('black-circle.png');

// add to stage
app.stage.addChild(circle);

// center the sprite's anchor point
circle.anchor.set(0.5);

// move the sprite to the center of the screen
circle.x = app.screen.width / 2;
circle.y = app.screen.height / 2;
