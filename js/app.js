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
        let t = 5;
        this.gameObjects = [
            // new WordBlock(this.context, 'text', x, y, t),
            new WordBlock(this.context, 'css', 20, -25, t*1.1),
            new WordBlock(this.context, 'html', 120, -30, t*0.9),
            new WordBlock(this.context, 'react', 180, -35, t),
            new WordBlock(this.context, 'javascript', 260, -40, t),
            new WordBlock(this.context, 'firefox', 360, -45, t),
            new WordBlock(this.context, 'ironhack', 290, -20, t),
            new Spaceship(this.context) // SPACESHIP IS ALWAYS LAST
        ];
    }

    gameLoop(timeStamp) {
        // Calculate how much time has passed
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.secondsPassed = Math.min(this.secondsPassed, 0.1); // Move forward with a max amount
        this.oldTimeStamp = timeStamp;

        //The spaceship object
        //console.log(this.gameObjects[this.gameObjects.length-1]);

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

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }

        // Iterate all objects except the last one (spaceship)
        for (let i = 0; i < this.gameObjects.length-1; i++) {
            obj1 = this.gameObjects[i];
            obj2 = this.gameObjects[this.gameObjects.length - 1]; // The spaceship

            if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                obj1.isColliding = true;
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
