class GameWorld {

    constructor(canvasId) {
        this.canvas = null;
        this.context = null;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.level = 1;
        this.wordsArray = [];
        this.gameObjects = [];
        this.resetCounter = 0;
        this.init(canvasId);
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        const pixelFont = new FontFace("pixelFont", "url(./font/04b03.ttf)");
        this.wordsArray = this.getLevel(this.level);

        this.createWorld();

        new InputHandler(this.wordsArray);

        // Request an animation frame for the first time
        // The gameLoop() function is called as a callback of this request
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) });
    }

    createWorld() {
        let spaceshipObject = new Spaceship(this.context);

        // Let's build this.gameObjects array
        for (let i = 0; i < this.wordsArray.length; i++) {
            // new WordBlock(this.context, 'text', x, y, t)
            this.gameObjects.push(new WordBlock(this.context, this.wordsArray[i], this.getRandomX(), this.getRandomY(), this.getActionTime(this.level)));
        }

        // Adding the spaceship
        this.gameObjects.push(spaceshipObject);

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
        for (let i = 0; i < this.gameObjects.length - 1; i++) {
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

    getLevel(level) {
        switch (level) {
            case 1:
                return ['css', 'dom', 'github', 'html'];
                break;
            case 2:
                return ['csv', 'boolean', 'express', 'ftp', 'keyboard'];
                break;
            case 3:
                return ['chrome', 'bootstrap', 'javascript', 'xml', 'undefined', 'function'];
                break;
            case 4:
                return ['codewars', 'bug', 'ironhack', 'loop', 'array', 'full stack', 'react'];
                break;
            case 5:
                return ['cloud', 'browser', 'length', 'web', 'update', 'agile', 'responsive', 'syntax'];
                break;
            case 6:
                return ['canvas', 'backend', 'explorer', 'json', 'apple', 'string', 'ruby', 'delete', 'object'];
                break;
            case 7:
                return ['computer', 'back', 'gnu', 'http', 'windows', 'api', 'developement', 'firefox', 'mongoose', 'number'];
                break;
            case 8:
                return ['code', 'edge', 'java', 'list', 'angular', 'stack', 'resolution', 'mongodb', 'null', 'php', 'flexbox'];
                break;
            case 9:
                return ['cache', 'get', 'linux', 'algorithm', 'rest', 'script', 'documentation', 'frontend', 'mysql', 'plugin', 'internet', 'barcelona'];
                break;
            case 10:
                return ['camel case', 'game', 'visual studio code', 'width', 'assessment', 'safari', 'debugging', 'framework', 'microsoft', 'node.js', 'overflow', 'python'];
                break;
            default:
                return ['end'];
        }
    }

    getRandomY() {
        let maxY = -21;
        let minY = -50;
        let blockY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        return blockY;
    }

    getRandomX() {
        let maxX = 480;
        let minX = 0;
        let blockX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        return blockX;
    }

    getActionTime(level) {
        let tMax = 8;
        let tMin = 5;
        let time = Math.floor(Math.random() * (tMax - tMin + 1)) + tMin;
        return time;
    }
}
