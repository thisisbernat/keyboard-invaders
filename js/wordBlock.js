class WordBlock extends GameObject {
    constructor(context, text, x, y, t) {
        super(context, x, y);
        this.text = text;
        this.ogX = x;
        this.ogY = y;
        this.actionTime = t;
    }

    draw() {
        // Draw a round rectangle
        this.block(this.text, this.x, this.y);
        
    }

    update(secondsPassed) {
        /* Original
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
        */

        // 240, 710 is the static position of the spaceship
        let { vx, vy } = this.getSpeeds(this.ogX, this.ogY, 240, 710);
        this.x += vx * secondsPassed;
        this.y += vy * secondsPassed;

    }

    getSpeeds(ogX, ogY, destX, destY){
        let vx = (destX - ogX) / this.actionTime;
        let vy = (destY - ogY) / this.actionTime;

        return { vx, vy };        
    }

    block(text, x, y) {

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
        this.context.fillStyle = 'rgba(45, 62, 80, 1)';        
        this.context.fill();

        this.context.fillStyle = 'white';
        this.context.fillText(text, x+offsetX, y+offsetY);

        return {blockLength, blockHeight};
    }
}