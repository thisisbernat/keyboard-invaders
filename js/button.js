class Button extends GameObject {
    constructor(context, text, x, y) {
        super(context, x, y);
        this.text = text;
        this.ogX = x;
        this.ogY = y;
        this.isClicked = 0;

        // Set font and measure text with this font
        this.context.font = '28px pixelFont';
        this.textLength = this.context.measureText(this.text).width;

        // Set block's dimensions
        this.blockRadius = 5;
        this.blockPadding = 12;
        this.height = 35;
        this.offsetY = 26;
        this.width = this.textLength + 21;
    }

    draw() {
        // Draw a round rectangle
        let rectangleColor = 'rgba(45, 62, 80, 1)';
        this.block(this.text, this.x, this.y, rectangleColor);

    }

    update(secondsPassed) {
        this.x += 0;
        this.y += 0;

        /*
        if (this.isClicked !== 0) {
            this.y -= this.ogY * secondsPassed;
        } else { this.y += 0 }
        */
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

        // Text
        this.context.font = '28px pixelFont';
        this.context.fillStyle = '#ff9c00';
        this.context.fillText(text.slice(2, text.length - 2), x + this.blockPadding + this.context.measureText(text.slice(0, 2)).width, y + this.offsetY);
        this.context.fillStyle = 'white';
        this.context.fillText(text.slice(0, 2), x + this.blockPadding, y + this.offsetY);
        this.context.fillText(text.slice(text.length - 2, text.length), x + this.blockPadding + this.context.measureText(text.slice(0, text.length - 2)).width, y + this.offsetY);
    }
}