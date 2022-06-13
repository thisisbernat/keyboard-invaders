class wordBlock extends GameObject {
    constructor(context, x, y, vx, vy) {
        super(context, x, y, vx, vy);
    }

    draw() {
        //Draw a round rectangle
        this.roundRect('ironhack', this.x, this.y);
    }

    update(secondsPassed) {
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }

    roundRect(text, x, y, width, height) {

        // Set font and measure text with this font
        this.context.font = '14px pixelFont';
        let textLength = this.context.measureText(text).width;

        // Set dimensions relative to the text measure
        let blockPadding = 5;
        let blockLength = textLength + 2*blockPadding;
        let blockHeight = 21;
        let offsetX = blockPadding;
        let offsetY = 14;
        let blockRadius = 5;

        this.context.beginPath();
        this.context.moveTo(x + blockRadius, y);
        this.context.arcTo(x + blockLength, y, x + blockLength, y + blockHeight, blockRadius);
        this.context.arcTo(x + blockLength, y + blockHeight, x, y + blockHeight, blockRadius);
        this.context.arcTo(x, y + blockHeight, x, y, blockRadius);
        this.context.arcTo(x, y, x + blockLength, y, blockRadius);
        this.context.stroke();
        this.context.fillStyle = 'rgba(45, 62, 80, 1)';
        this.context.fill();

        this.context.fillStyle = 'white';
        this.context.fillText(text, x+offsetX, y+offsetY);
    }
}