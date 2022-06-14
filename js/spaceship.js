class Spaceship extends GameObject {
    constructor(context) {
        super(context);

        //Set default width and height
        this.width = 48;
        this.height = 48;

        //Set default position
        this.x = 224;   // 240px is half of canvas' width
        this.y = 650;

        this.vx = 0; // It does not move
        this.vy = 0; // It does not move
    }

    draw() {
        const background = this.drawSpaceshipImage();
        this.context.drawImage(background, this.x, this.y);
    }

    update(secondsPassed) {
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }

    updateSpeed(newTime) {
        return
    }

    drawSpaceshipImage() {
        const background = new Image();
        background.src = "./img/spaceship.png";
        return background;
    }
}