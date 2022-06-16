class GameWorld {

    constructor(canvasId) {
        this.canvas = null;
        this.context = null;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.level = 0;
        this.lives = 3;
        this.hearts;
        this.wordsArray = [];
        this.gameObjects = [];
        this.introObjects = [];
        this.outroObjects = [];
        this.spaceshipObject;
        this.resetCounter = 0;
        this.prevChar = "";
        this.firstChar = true;
        this.title;
        this.button;
        this.canvasId = canvasId;
        this.levelTitle = "";
        this.impactedBlocks = [];
        this.dead = false;
        this.initIntro();
    }

    init() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext('2d');
        const pixelFont = new FontFace("pixelFont", "url(./font/04b03.ttf)");


        //INPUT HANDLER
        this.inputHandler();

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function is called as a callback of this request
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) });
    }

    initIntro() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext('2d');
        const pixelFont = new FontFace("pixelFont", "url(./font/04b03.ttf)");

        //INPUT HANDLER
        this.inputClick();
        this.inputEnter();

        this.createIntro();

        window.requestAnimationFrame((timeStamp) => { this.gameIntro(timeStamp) });
    }

    initOutro() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext('2d');
        const pixelFont = new FontFace("pixelFont", "url(./font/04b03.ttf)");

        this.createOutro();

        window.requestAnimationFrame((timeStamp) => { this.gameOutro(timeStamp) });
    }

    inputClick() {

        document.addEventListener('click', (event) => {
            this.detectClick(event.offsetX, event.offsetY);
        });
    }

    inputEnter() {

        document.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                this.detectEnter(event.offsetX, event.offsetY);
            }
        });
    }

    inputClickOutro() {

        document.addEventListener('click', (event) => {
            this.detectClickOutro(event.offsetX, event.offsetY);
        });
    }

    createIntro() {

        this.button = new Button(this.context, '< NEW GAME >', 135, 450);
        this.title = new Title(this.context, 160, 200, 3);
        this.introObjects.push(this.button);
        this.introObjects.push(this.title);

    }

    createOutro() {
        this.spaceshipObject = {};
        this.title = new GameOverTitle(this.context, -200, 360, this.level);
        this.spaceshipObject = new Spaceship(this.context);
        this.spaceshipObject.vy = -300;
        this.outroObjects.push(this.title);
        this.outroObjects.push(this.spaceshipObject);
    }

    gameIntro(timeStamp) {
        // Calculate how much time has passed
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.secondsPassed = Math.min(this.secondsPassed, 0.1); // Move forward with a max amount
        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for (let i = 0; i < this.introObjects.length; i++) {
            this.introObjects[i].update(this.secondsPassed);
        }



        this.clearCanvas();

        // Loop over all game objects to draw
        for (let i = 0; i < this.introObjects.length; i++) {
            this.introObjects[i].draw();
        }

        // If is clicked, start the game
        //console.log(this.title.isClicked);
        if (this.title.isClicked > 5) {
            this.init();
            return;
        }
        //console.log(this.title.isEnterPressed);
        if (this.title.isEnterPressed > 1) {
            this.init();
            return;
        }

        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameIntro(timeStamp));
    }

    gameOutro(timeStamp) {
        console.log('OUTRO')
        // Calculate how much time has passed
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.secondsPassed = Math.min(this.secondsPassed, 0.1); // Move forward with a max amount
        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for (let i = 0; i < this.outroObjects.length; i++) {
            this.outroObjects[i].update(this.secondsPassed);
        }



        this.clearCanvas();

        // Loop over all game objects to draw
        for (let i = 0; i < this.outroObjects.length; i++) {
            this.outroObjects[i].draw();
        }

        let btn = new Button(this.context, '< AGAIN! >', 155, 450)
        btn.draw();
        this.inputClickOutro();

        /*
        // If is clicked, start the game
        //console.log(this.title.isClicked);
        if (this.title.isClicked > 5) {
            this.init();
            return;
        }
        */

        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameOutro(timeStamp));
    }

    detectClick(offsetX, offsetY) {
        if (this.rectIntersect(this.button.x, this.button.y, this.button.width, this.button.height, offsetX, offsetY, 1, 1)) {
            this.title.click(this.secondsPassed);
            this.introObjects.shift();
        }
    }

    detectEnter(offsetX, offsetY) {
        if (this.rectIntersect(this.button.x, this.button.y, this.button.width, this.button.height, offsetX, offsetY, 1, 1)) {
            this.title.enter(this.secondsPassed);
            this.introObjects.shift();
        }
    }

    detectClickOutro(offsetX, offsetY) {
        if (this.rectIntersect(this.button.x, this.button.y, this.button.width, this.button.height, offsetX, offsetY, 1, 1)) {
            document.location.reload();
        }
    }

    inputHandler() {
        document.addEventListener('keypress', (event) => {
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
                    this.gameObjects[i].updateCharCount();
                    found = true;
                    if (this.wordsArray[i] === this.prevChar) {
                        //console.log('paraula completa!');
                        //treure la paraula de l'array
                        this.wordsArray.splice(i, 1);
                        // Update completed status

                        this.gameObjects[i].updateCompletedStatus();
                        this.deleteCompleted();
                        console.log(this.wordsArray);
                        this.firstChar = true;
                    };
                    if (this.wordsArray.length === 0) {
                        // NEXT LEVEL!
                        this.prevChar = "";
                        this.firstChar = true;
                        this.wordsArray = [];
                        this.gameObjects = [];
                        this.spaceshipObject = {};
                        this.createWorld();
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
        this.level++;
        this.wordsArray = this.getLevel(this.level);
        this.levelTitle = new LevelTitle(this.context, -200, 360, this.level);
        this.hearts = new Hearts(this.context, this.level);
        this.spaceshipObject = new Spaceship(this.context);
        if (this.level > 10) {
            this.spaceshipObject.vy = -300;
        }

        // Let's build this.gameObjects array

        if (this.level <= 11) {
            for (let i = 0; i < this.wordsArray.length; i++) {
                // new WordBlock(this.context, 'text', x, y, t)
                this.gameObjects.push(new WordBlock(this.context, this.wordsArray[i], this.getRandomX(), this.getRandomY(), this.getActionTime(this.level)));
            }
        }

        // Adding the spaceship
        this.gameObjects.push(this.spaceshipObject);

        // Adding the hearts
        this.gameObjects.push(this.hearts);

        // Adding the level title
        this.gameObjects.push(this.levelTitle);
    }

    gameLoop(timeStamp) {
        // Calculate how much time has passed
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.secondsPassed = Math.min(this.secondsPassed, 0.1); // Move forward with a max amount
        this.oldTimeStamp = timeStamp;

        this.deleteCompleted();

        // Loop over all game objects to update
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(this.secondsPassed);
        }



        let impacted;
        impacted = this.deleteImpacted();

        if (impacted.length > 0) {
            this.impactedBlocks.push(this.deleteImpacted());
        }

        if (this.gameObjects.length <= 3) {
            // NEXT LEVEL!
            this.prevChar = "";
            this.firstChar = true;
            this.wordsArray = [];
            this.gameObjects = [];
            this.spaceshipObject = {};
            this.createWorld();
        }

        console.log(`Vides: ${this.lives - this.impactedBlocks.length}`)
        //console.log(this.gameObjects[this.gameObjects.length - 2]);
        this.gameObjects[this.gameObjects.length - 2].update(this.lives - this.impactedBlocks.length);

        if (this.lives - this.impactedBlocks.length <= 0) {
            console.log('mort!');

            this.dead = true;
            this.initOutro();
            return;

            /*
            this.prevChar = "";
            this.firstChar = true;
            this.wordsArray = [];
            this.gameObjects = [];
            this.spaceshipObject = {};
            this.level=10;
            this.createWorld();
            */

        };

        this.detectCollisions();



        this.clearCanvas();


        // Loop over all game objects to draw
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        if (this.level > 10) {
            let btn = new Button(this.context, '< AGAIN! >', 155, 450)
            btn.draw();
            this.inputClickOutro();
        }


        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));




    }

    deleteCompleted() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].isCompleted) {
                this.gameObjects.splice(i, 1);
            }
        }
    }

    deleteImpacted() {
        let impactedBlocks = [];
        for (let i = 0; i < this.gameObjects.length - 3; i++) {
            if (this.gameObjects[i].y + this.gameObjects[i].height > 660) {
                impactedBlocks = this.gameObjects.splice(i, 1);
                this.wordsArray.splice(i, 1);
            }
        }
        return impactedBlocks;
    }

    //this.gameObjects[i].height > 650

    detectCollisions() {
        let obj1;
        let obj2;

        /*
        // Reset colliding state for all objects
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }
        */


        // Iterate all objects except the last two (spaceship and level title)
        for (let i = 0; i < this.gameObjects.length - 3; i++) {
            obj1 = this.gameObjects[i];
            obj2 = this.spaceshipObject; // The spaceship

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
        //const background = this.drawBackground();
        //this.context.drawImage(background, 0, 0)
    }

    /*
    drawBackground() {
        const background = new Image();
        background.src = "./img/stars-background.png";
        return background;
    }
    */

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
                return ['codewars', 'bug', 'ironhack', 'loop', 'array', 'fullstack', 'react'];
                break;
            case 5:
                return ['cloud', 'browser', 'length', 'web', 'update', 'agile', 'responsive', 'syntax'];
                break;
            case 6:
                return ['canvas', 'backend', 'explorer', 'json', 'apple', 'string', 'ruby', 'delete', 'object'];
                break;
            case 7:
                return ['computer', 'kata', 'gnu', 'http', 'windows', 'api', 'developement', 'firefox', 'mongoose', 'number'];
                break;
            case 8:
                return ['code', 'edge', 'java', 'list', 'angular', 'stack', 'resolution', 'mongodb', 'null', 'php', 'flexbox'];
                break;
            case 9:
                return ['cache', 'get', 'linux', 'algorithm', 'rest', 'script', 'documentation', 'frontend', 'mysql', 'plugin', 'internet', 'barcelona'];
                break;
            case 10:
                return ['camelcase', 'game', 'vscode', 'width', 'assessment', 'safari', 'debugging', 'framework', 'microsoft', 'nodejs', 'overflow', 'python'];
                break;
            default:
                return ['gameover'];
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
        let tMax = 18; //Bona: 18
        let tMin = 10; //Bona: 10
        let time = Math.floor(Math.random() * (tMax - tMin + 1)) + tMin;
        return time;
    }

}
