class Title extends GameObject {
    constructor(context, x, y, t) {
        super(context, x, y);
        this.x = x;
        this.y = y;
        this.ogX = x;
        this.ogY = y;
        this.actionTime = t;
        this.isClicked = 1;
    }

    draw() {
        // Draw
        this.context.font = `30px pixelFont`;
        this.context.fillStyle = '#CCC4D3';
        this.context.fillText('Welcome to', this.x, this.y);
        this.context.fillStyle = 'white';
        this.context.font = `50px pixelFont`;
        this.context.fillText('KEYBOARD', this.x-35, this.y+50);
        this.context.fillText('INVADERS', this.x-35, this.y+100);
        this.context.font = `20px pixelFont`;
        this.context.fillStyle = '#CCC4D3';
        this.context.fillText('IRONHACK', this.x+35, this.y+130);
    }

    update(secondsPassed) {
        this.x += 0;
        if (this.isClicked !== 1) {
            this.y -= this.ogY * secondsPassed * this.actionTime;
            this.isClicked += secondsPassed * this.actionTime;
        } else { this.y += 0 }
    }

    click(secondsPassed) {
        this.isClicked++;
    }
}