class GameWorld {

    constructor(canvasId) {
        this.canvas = null;
        this.context = null;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;

        this.init(canvasId);
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        const pixelFont = new FontFace("pixelFont", "url(./font/04b03.ttf)");

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function is called as a callback of this request
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) });
    }

    createWorld() {
        this.gameObjects = [
            new wordBlock(this.context, 250, 50, 0, 50, 1),
            new wordBlock(this.context, 250, 300, 0, -50, 200),
            new wordBlock(this.context, 200, 0, 50, 50, 1),
            new wordBlock(this.context, 250, 150, 50, 50, 1),
            new wordBlock(this.context, 300, 75, -50, 50, 1),
            new wordBlock(this.context, 300, 300, 50, -50, 1),
            new Spaceship(this.context)
        ];
    }

    gameLoop(timeStamp) {
        // Calculate how much time has passed
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(this.secondsPassed);
        }

        this.detectCollisions();

        this.clearCanvas();

        // Loop over all game objects to draw
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    detectCollisions() {
        let obj1;
        let obj2;

        // Reset collision state of all objects
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }

        // Start checking for collisions
        for (let i = 0; i < this.gameObjects.length; i++) {
            obj1 = this.gameObjects[i];
            for (let j = i + 1; j < this.gameObjects.length; j++) {
                obj2 = this.gameObjects[j];

               // Compare object1 with object2
                if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
                }
            }
        }
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }

        return true;
    }

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const background = this.drawBackground();
        this.context.drawImage(background, 0, 0)
    }

    drawBackground() {
        const background = new Image();
        background.src = "./img/stars-background.png";
        return background;
    }

    
}
