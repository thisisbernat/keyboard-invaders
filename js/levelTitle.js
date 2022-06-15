class LevelTitle extends GameObject {
    constructor(context, x, y, level) {
        super(context, x, y);
        this.x = x;
        this.y = y;
        this.vx = 1000;
        this.vy = 0; // It does not move
        this.level = level;
    }

    draw() {
        // Draw
        this.context.font = `50px pixelFont`;
        this.context.fillStyle = 'white';
        if (this.level > 10) {
            this.context.fillText(`GAME OVER`, this.x, this.y);
        } else {
            this.context.fillText(`LEVEL ${this.level}`, this.x, this.y);
        }
    }

    update(secondsPassed) {
        //GAME OVER SETTINGS
        if (this.level > 10) {
            this.vx = 500;
            if (this.x > 75 && this.x <= 110) {
                this.x += 50 * secondsPassed;
            } else if(this.x > 110) {
                this.x += 0;
            } else {
                this.x += this.vx * secondsPassed;
            }
            
        }
        else {
            if (this.x > 150 && this.x < 225) {
                this.x += 100 * secondsPassed;
            } else {
                this.x += this.vx * secondsPassed;
            }
        }


        // Only horizontal movement
        this.y += 0;
    }
}