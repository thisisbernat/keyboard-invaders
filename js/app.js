class GameWorld {

    constructor(canvasId) {
        this.canvas = null;
        this.context = null;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.level = 4;
        this.wordsArray = [];
        this.gameObjects = [];
        this.resetCounter = 0;
        this.prevChar = "";
        this.firstChar = true;
        this.init(canvasId);
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        const pixelFont = new FontFace("pixelFont", "url(./font/04b03.ttf)");
        this.wordsArray = this.getLevel(this.level);

        //INPUT HANDLER
        this.inputHandler();

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function is called as a callback of this request
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) });
    }

    inputHandler() {

        document.addEventListener('keydown', (event) => {
            this.logKeys(event);
        });
    }

    logKeys(event) {
        let selectedWord = "";
        if (this.firstChar) {
            this.prevChar = event.key;
            let selectedIndex = this.choice(event.key);
            if (selectedIndex !== -1) {
                //console.log(this.wordsArray[selectedIndex]);
                //console.log(event.key);
                this.gameObjects[selectedIndex].updatePickedStatus();
                this.firstChar = false;              
            } else {
                console.log('Continua intentant-ho');
            };
            console.log(this.prevChar);
        } else {
            //console.log('paraula ja bloquejada:');
            this.prevChar += event.key;
            
            //spell
            let found = false;
            let selectedIndex = 0;
            for (let i = 0; i < this.wordsArray.length; i++) {
                if (this.wordsArray[i].indexOf(this.prevChar) !== -1) {
                    selectedIndex = i;
                    found = true;
                    if (this.wordsArray[i] === this.prevChar) {
                        //console.log('paraula completa!');
                        //treure la paraula de l'array
                        this.wordsArray.splice(i, 1);
                        // Update completed status
                        this.gameObjects[i].updateCompletedStatus();
                        console.log(this.wordsArray);
                        //buildHTML(this.wordsArray);
                        this.firstChar = true;
                    };
                    if (this.wordsArray.length === 0) {
                        console.log('Win!');
                        //passem de nivell
                    };
                };
            };
            if (found) {
                //console.log(this.wordsArray[selectedIndex]);
            } else {
                console.log(`error corregit!`);
                this.prevChar = this.prevChar.slice(0, -1);
            };
            console.log(this.prevChar);
        };
    };

    choice(key) {
        let found = false;
        let selectedIndex = 0;
        for (let i = 0; i < this.wordsArray.length; i++) {
            if (key === this.wordsArray[i].charAt(0)) {
                selectedIndex = i;
                found = true;
            };
        };
        if (found) {
            return selectedIndex;
        } else {
            return -1;
        };
    };


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

        // Loop over all game objects to update
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(this.secondsPassed);
        }

        this.deleteCompleted();

        this.detectCollisions();

        this.clearCanvas();

        // Loop over all game objects to draw
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    deleteCompleted () {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].isCompleted) {
                this.gameObjects.splice(i, 1);
            }
        }
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
        let tMax = 35; //Bona: 8
        let tMin = 15; //Bona: 5
        let time = Math.floor(Math.random() * (tMax - tMin + 1)) + tMin;
        return time;
    }

}
