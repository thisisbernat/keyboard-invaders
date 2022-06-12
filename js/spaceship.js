class Spaceship extends GameObject {
    constructor(context) {
        super(context);

        //Set default width and height
        this.width = 48;
        this.height = 48;

        //Set default position
        this.x = 224;   // 240px is half of canvas' width
        this.y = 650;

        this.vx = 0;
        this.vy = 0;

    }

    draw() {
        //Draw a simple square
        this.context.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
        const background = this.drawSpaceshipImage();
        this.context.drawImage(background, this.x, this.y);
    }

    update(secondsPassed) {
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }

    drawSpaceshipImage() {
        const background = new Image();
        background.src = "./img/spaceship.png";
        return background;
    }
}