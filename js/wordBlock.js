class WordBlock extends GameObject {
    constructor(context, text, x, y, t) {
        super(context, x, y);
        this.text = text;
        this.ogX = x;
        this.ogY = y;
        this.actionTime = t;
        this.isPicked = false;
        this.isCompleted = false;

        // Set font and measure text with this font
        this.context.font = '14px pixelFont';
        this.textLength = this.context.measureText(this.text).width;

        // Set block's dimensions
        this.blockRadius = 5;
        this.blockPadding = 5;
        this.height = 21;
        this.offsetY = 14;
        this.height = 21;
        this.width = this.textLength + 10;

        this.blockColor = 'black';
    }

    draw() {
        // Draw a round rectangle
        let rectangleColor = this.isColliding ? 'darkred' : 'rgba(45, 62, 80, 1)';
        this.block(this.text, this.x, this.y, rectangleColor);
        
    }

    update(secondsPassed) {
        // 240, 710 is the static position of the spaceship
        let { vx, vy } = this.getSpeeds(this.ogX, this.ogY, 240, 710);
        this.x += vx * secondsPassed;
        this.y += vy * secondsPassed;
    }

    updateSpeed(newTime) {
        this.actionTime = newTime;
    }

    getSpeeds(ogX, ogY, destX, destY){
        let vx = (destX - ogX) / this.actionTime;
        let vy = (destY - ogY) / this.actionTime;

        return { vx, vy };        
    }

    block(text, x, y, color) {
        // Block drawing
        this.context.beginPath();
        this.context.moveTo(x + this.blockRadius, y);
        this.context.arcTo(x + this.width, y, x + this.width, y + this.height, this.blockRadius);
        this.context.arcTo(x + this.width, y + this.height, x, y + this.height, this.blockRadius);
        this.context.arcTo(x, y + this.height, x, y, this.blockRadius);
        this.context.arcTo(x, y, x + this.width, y, this.blockRadius);
        this.context.fillStyle = color;        
        this.context.fill();

        // Centered text
        let textColor = this.isPicked ? '#ff9c00' : 'white';
        this.context.fillStyle = textColor;
        this.context.fillText(text, x+this.blockPadding, y+this.offsetY);

    }

    updatePickedStatus() {
        this.isPicked = true;
    }

    updateCompletedStatus() {
        this.isCompleted = true;
    }

}