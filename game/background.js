class Background {
    constructor() {
        this.srcX = 0;
        this.srcY = 0;
        this.srcWidth = 800;
        this.srcHeight = 600;

        this.drawX = 0;
	    this.drawY = 0;
        this.width = 800;
	    this.height = 600;

	    this.tmp = 1;
    }

    getSize() {
        return [this.srcWidth, this.srcHeight]
    }

    update() {
        const speed = 1

        if (this.drawY > 0) {
            this.drawY = -300;
            this.tmp = 0;
        }

        this.drawY += speed;
        this.tmp += speed;
    }
}