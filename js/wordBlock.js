class WordBlock extends GameObject {
    constructor(context, text, x, y, t) {
        super(context, x, y);
        this.text = text;
        this.ogX = x;
        this.ogY = y;
        this.actionTime = t;
        this.isPicked = false;
        this.isCompleted = false;
        this.charCount = 1;

        // Set font and measure text with this font
        this.context.font = '16px pixelFont';
        this.textLength = this.context.measureText(this.text).width;

        // Set block's dimensions
        this.blockRadius = 5;
        this.blockPadding = 8;
        this.height = 25;
        this.offsetY = 17;
        this.width = this.blockPadding + this.textLength + this.blockPadding;

        this.blockColor = 'black';
    }

    draw() {
        // Draw a round rectangle
        let rectangleColor = this.isColliding ? 'darkred' : 'rgba(45, 62, 80, 0.5)';
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


        // Writing the text
        /* ORIGINAL
        let textColor = this.isPicked ? '#ff9c00' : 'white';
        this.context.fillStyle = textColor;
        this.context.fillText(text, x+this.blockPadding, y+this.offsetY);
        */
        this.context.font = '16px pixelFont';
        if (this.isPicked) {
            this.context.fillStyle = '#ff9c00';
            this.context.fillText(text.slice(0,this.charCount), x+this.blockPadding, y+this.offsetY);
            this.context.fillStyle = '#a09aa5';
            this.context.fillText(text.slice(this.charCount), x+this.blockPadding+this.context.measureText(text.slice(0,this.charCount)).width, y+this.offsetY);
        } else {
            this.context.fillStyle = 'white';
            this.context.fillText(text, x+this.blockPadding, y+this.offsetY);
        }
        


    }

    updatePickedStatus() {
        this.isPicked = true;
    }

    updateCompletedStatus() {
        this.isCompleted = true;
    }

    updateCharCount() {
        this.charCount++;
    }

}