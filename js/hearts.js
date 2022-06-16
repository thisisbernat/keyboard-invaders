class Hearts extends GameObject {
    constructor(context, level) {
        super(context);

        //Set default width and height
        this.width = 25;
        this.height = 20;

        //Set fixed position
        this.x = 5;
        this.y = 695;

        this.vx = 0; // It does not move
        this.vy = 0; // It does not move

        this.level = level;
        
    }

    draw() {
        if (this.level < 11) {
            const heartImage = this.drawHeartImage();
            if (this.lives === 3) {
                this.context.drawImage(heartImage, this.x, this.y);
                this.context.drawImage(heartImage, this.x + 30, this.y);
                this.context.drawImage(heartImage, this.x + 60, this.y);
            } else if (this.lives === 2) {
                this.context.drawImage(heartImage, this.x, this.y);
                this.context.drawImage(heartImage, this.x + 30, this.y);
            } else if (this.lives === 1) {
                this.context.drawImage(heartImage, this.x, this.y);
            }
        }


    }

    update(lives) {
        this.lives = lives;
    }

    drawHeartImage() {
        const heartImage = new Image();
        heartImage.src = "./img/heart.png";
        return heartImage;
    }
}