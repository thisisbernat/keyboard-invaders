class wordBlock extends GameObject {
    constructor(context, x, y, vx, vy) {
        super(context, x, y, vx, vy);

        //Set default width and height
        this.width = 100;
        this.height = 25;
    }

    draw() {
        //Draw a simple square
        this.context.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height, 5);
        
    }

    update(secondsPassed) {
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}