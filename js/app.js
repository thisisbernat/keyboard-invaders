// Initial variable declaration
let canvas;
let context;
let rectX = 0;
let rectY = 0;
let movingSpeed = 50;
let secondsPassed = 0;
let oldTimeStamp = 0;
let timePassed = 0;

let gameObjects = createWorld();

function createWorld() {
    let gameObjects = [
        new Square(context, 250, 50, 0, 50),
        new Square(context, 250, 300, 0, -50),
        new Square(context, 150, 0, 50, 50),
        new Square(context, 250, 150, 50, 50),
        new Square(context, 350, 75, -50, 50),
        new Square(context, 300, 300, 50, -50)
    ];
    return gameObjects;
}

// Listen to the onLoad event to make sure everything is loaded. Then execute init()
window.onload = init;

// Execute init function when the page has loaded
function init() {
    canvas = document.getElementById('app');
    context = canvas.getContext('2d');

    // Request an animation frame for the first time
    // The gameLoop() function will be called as a callback of this request
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    // Calculate how much time has passed
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Update game objects
    update(secondsPassed);

    // Perform the drawing operation
    draw();

    // The loop function has reached it's end
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function update(secondsPassed) {

    timePassed += secondsPassed

    // Set the speed of the objects
    // Use different easing functions for different effects
    rectX = easeInOutQuint(timePassed, 50, 500, 1.5);
    rectY = easeLinear(timePassed, 50, 250, 1.5);
}

// Example easing functions
function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Fill with red
    context.fillStyle = '#ff8080';

    // Draw a rectangle on the canvas
    context.fillRect(rectX, rectY, 150, 100);
}