class fireEffect {
	constructor(context, x, y) {
        this.x = x
        this.y = y

        this.timeout = 10

        this.context = context

        this.sprite = {
            img : new Image(),
            srcX : 0,
            srcY : 0,
            srcWidth : 36,
            srcHeight : 59            
        }
        
        this.sprite.img.src = "game/res/fireEffect.png";
    }

    draw() {
        if (this.canDraw()) {
            this.context.drawImage(this.sprite.img,
                this.sprite.srcX, this.sprite.srcY, this.sprite.srcWidth, this.sprite.srcHeight,
                this.x, this.y, this.sprite.srcWidth / 2, this.sprite.srcHeight / 2
            );
            this.timeout -= 1
        }    
    }

    canDraw() {
        return this.isInvalidContext() == false && this.timeout > 0
    }

    isInvalidContext() {
        return this.context == null || this.context == undefined
    }
}